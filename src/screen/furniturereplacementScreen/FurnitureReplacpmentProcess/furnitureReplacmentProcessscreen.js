import React, { useEffect, useState, useLayoutEffect } from "react";
import constants from "../../../locales/constants";
import styles from "./style";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import { IconBar } from "./iconbar";
import { TaskSection } from "./TaskSection/taskSection";
import { FooterFur } from "./Footer/footer";
import { InputForm } from "./InputForm/InputForm";
import { useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ListHeaderComman } from "../../../component/manufacturer/ListHeaderComman";
import axios from "axios";
import endUrl from "../../../redux/configration/endUrl";
import { AlertMessage } from "../../../Alert/alert";
import AlertText from "../../../Alert/AlertText";
import Loader from "../../../component/loader";
import { DisplayList } from "./ListDisplay/displayList";
import { TouchableOpacity } from "react-native-gesture-handler";

export const FurnitureReplacmentProcess = () => {
  const navigation = useNavigation();
  const [createRequestIcon, setCreateRequestIcon] = useState("");
  const [collectFurItem, setCollectFurItem] = useState("");
  const [repairIcon, setRepairIcon] = useState("");
  const [dilverFurIcon, setDilverFurIcon] = useState("");
  const [taskNameButoonValue, setTaskNameButtonValue] = useState("");
  const [taskListButtonValue, setTaskListButtonValue] = useState("");
  const [loader, setLoader] = useState(true);
  const [flatListData, setFlatListData] = useState([]);
  const [saveButton, setSaveButton] = useState(true);
  const [submitButton, setSubmitButton] = useState(true);
  const [totalFurCount, setTotalFurCOunt] = useState(0);
  const [alert, setAlert] = useState(false);
  const [delteItemAlert, setdelteItemAlert] = useState(false);
  const [mainMsg, setMainMsg] = useState("");
  const [subMsg, setSubMsg] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);
  const [erroralert, seterrorAlert] = useState(false);
  const [CancelProcessalert, setCancelProcessalert] = useState(false);
  const [PhotoSection, setPhotoSection] = useState(false);
  const [delItem, setDelItem] = useState({});
  const [lenofContent,setlenofContent] = useState('')
  const [listwtCounted,setListwtCounted] = useState([])
  const route = useRoute();
  const organization = useSelector(
    (state) => state?.loginData?.user?.data?.data?.user?.organization
  );
  const schooldetails = useSelector(
    (state) => state?.loginData?.user?.data?.data?.user
  );

  const [permissionId, setPermissionId] = useState({
    userCreate: false,
    userEdit: false,
    userDelete: false,
  });
  const { school_name, emis, total_broken_items, broken_items, id } =
    route?.params;

  const onSchool = () => {
    setCreateRequestIcon(constants.inprogress);
    setFlatListData(route?.params);
    setPermissionId({
      userCreate: true,
      userDelete: true,
      userEdit: true,
    });
    setLoader(false);
  };
  const onrequestList = () => {
    setCollectFurItem(constants.inprogress);
    setTaskNameButtonValue(constants.Accept);
    setFlatListData(broken_items);
    setLoader(false);
  };
  const onCollectionAccepted = () => {
    setCollectFurItem(constants.inprogress);
    setTaskNameButtonValue(constants.Accepted);
    setTaskListButtonValue(constants.printPickupSLip);
    setTableHeader((oldData) => [...oldData, constants.collectedcount]);
    setTableKey((oldData) => [...oldData, "collectionCount"]);
    setFlatListData(broken_items);
    setLoader(false);
  };
  const onPendingRepair = () => {
    setCollectFurItem(constants.success);
    setRepairIcon(constants.inprogress);
    setFlatListData(broken_items);
    setTableHeader([
      constants.FurCategory,
      constants.furItem,
      constants.collectioncount,
      constants.collectedcount,
      constants.ReparableItem,
      constants.ReplanishmentItems,
    ]);
    setlenofContent('More')
    setLoader(false);
  };

  useEffect(() => {
    const task = route?.params?.status;
    if (organization == "School") {
      onSchool();
    } else if (task == "Pending Collection") {
      onrequestList();
    } else if (task == "Collection Accepted") {
      onCollectionAccepted();
    } else if (task == "Pending Repair") {
      onPendingRepair();
    }
  }, [tableHeader]);

  const [tableKey, setTableKey] = useState([
    "category_name",
    "item_name",
    "count",
  ]);
  const [tableHeader, setTableHeader] =
    organization == "School"
      ? useState([
          constants.FurCategory,
          constants.furItem,
          constants.collectioncount,
          constants.manage,
        ])
      : useState([
          constants.FurCategory,
          constants.furItem,
          constants.collectioncount,
        ]);
  const renderComponent = ({ item }) => {
    return (
      <DisplayList
        item={item}
        tableKey={tableKey}
        permissionId={permissionId}
        organization={organization}
        onDeleteFurItem={(item) => onDeleteFurItem(item)}
        onEdit={(item, task) => onEdit(item, task)}
        flatListData={flatListData}
      />
    );
  };

 

  const onEdit = (item, task) => {
    navigation.navigate("AddRequestFur", {
      item: item,
      task: task,
      flatListData: flatListData,
    });
  };

  const onDeleteItemYes = () => {
    setdelteItemAlert(false);
    var newArrayList = [];
    newArrayList = flatListData.filter((e) => e.item_id != delItem.item_id);
    setFlatListData(newArrayList);
  };

  const onDeleteFurItem = (item) => {
    setdelteItemAlert(true);
    setMainMsg(AlertText.deleteStock);
    setDelItem(item);
  };

  const HeaderComponent = () => {
    return <ListHeaderComman tableHeader={tableHeader} lenofContent={lenofContent}/>;
  };
  const onCancel = () => {
    setCancelProcessalert(true);
    setMainMsg(AlertText.cancelProcessMessgae);
    setSubMsg(AlertText.UndoMessgae);
  };
  const onSave = () => {
    setSubmitButton(false);
    seterrorAlert(true);
    setMainMsg(AlertText.saveMsgIntransc);
  };
  const onSubmit = () => {
    setAlert(true);
    setMainMsg(AlertText.submitMessage);
    setSubMsg(AlertText.canNotUndo);
  };
  const onvalueEdit = (val) => {
    setTotalFurCOunt(val);
    val == "" ? setSaveButton(true) : setSaveButton(false);
    val == "" ? setSubmitButton(true) : null;
  };
  const onPressYes = async () => {
    setAlert(false);
    setLoader(true);
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common["Accept"] = "application/json";
    const data = {
      total_furniture: totalFurCount,
      broken_items: flatListData,
    };
    axios
      .post(`${endUrl.addFurRequest}`, data)
      .then((res) => {
        setSuccessAlert(true);
        setLoader(false);
        setMainMsg(res?.data?.message);
      })
      .catch((e) => {
        let { message, data, status } = e?.response?.data || {};
        setLoader(false);
        seterrorAlert(true);
        {
          let str = "";
          status == 422
            ? Object.values(data).forEach((value) => {
                str += `  ${value}`;
                setMainMsg(str);
              })
            : setMainMsg(message);
        }
      });
  };
  const onPressDone = () => {
    seterrorAlert(false);
  };
  const onSuccessPressDone = () => {
    seterrorAlert(false);
    navigation.navigate("Furniture Replacment");
  };
  const onPressYesCancel = () => {
    setCancelProcessalert(false);
    navigation.navigate("Furniture Replacment");
  };
  const onTransactionList = () => {
    setCancelProcessalert(true);
    setMainMsg(AlertText.GoToTransactionList);
  };
  const acceptRequestList = () => {
    setTaskNameButtonValue(constants.Accepted);
    setTaskListButoon(true);
    setTaskListButtonValue(constants.printPickupSLip);
    setTableHeader((oldData) => [...oldData, constants.collectedcount]);
    setTableKey((oldData) => [...oldData, "collectionCount"]);
    axios
      .get(`${endUrl.acceptCollectionReuest}${id}/edit`)
      .then((res) => {})
      .catch((e) => {
        console.log(e);
      });
  };

  const printPickupbutpress = () => {
    setPhotoSection(true);
  };

  useLayoutEffect(() => {
    const title = "Furniture Replacement";
    navigation.setOptions({ title });
  }, []);

  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={styles.mainView}>
      <ScrollView>
        <View style={styles.furView}>
          <Text style={styles.furText}>
            {constants.FurnitureReplacmnetProcess}
          </Text>
        </View>
        <IconBar
          createRequestIcon={createRequestIcon}
          collectFurItem={collectFurItem}
          repairIcon={repairIcon}
          dilverFurIcon={dilverFurIcon}
          onTransactionListPress={() => onTransactionList()}
        />
        <TaskSection
          taskName={
            organization == "School"
              ? constants.createRequest
              : constants.collectFurnitureRequest
          }
          taskNameButoonValue={taskNameButoonValue}
          acceptRequest={() => acceptRequestList()}
        />
        <InputForm
          schoolname={constants.schoolName}
          schoolvalue={
            organization == "School" ? schooldetails?.name : school_name
          }
          emisnumber={constants.emisNumber}
          emisvalue={organization == "School" ? schooldetails?.username : emis}
          org={organization}
          stockcollectionName={
            organization == "School"
              ? constants.schoolFullFur
              : constants.schoolFurCount
          }
          stockcount={total_broken_items}
          onvalueEdit={(val) => onvalueEdit(val)}
        />
        {PhotoSection ? (
          <View style={styles.photoView}>
            <TouchableOpacity>
              <Text style={styles.photoText}>{constants.AddPhoto}</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <TaskSection
          taskName={constants.BrokenFurnitureItem}
          taskNamePrintButoonValue={taskListButtonValue}
          printPickupPress={() => printPickupbutpress()}
        />
        <ScrollView horizontal={true}>
          <FlatList
            ListHeaderComponent={HeaderComponent}
            data={flatListData}
            keyExtractor={(item) => item.id}
            renderItem={renderComponent}
            showsVerticalScrollIndicator={false}
          />
        </ScrollView>
      </ScrollView>
      <View style={styles.bottomView}>
        <FooterFur
          saveButton={saveButton}
          submitButton={submitButton}
          onCancel={onCancel}
          onSave={onSave}
          onSubmit={onSubmit}
        />
      </View>

      {alert ? (
        <AlertMessage
          visible={alert}
          setmodalVisible={(val) => setAlert(val)}
          mainMessage={mainMsg}
          subMessage={subMsg}
          type="question"
          onConfirm={() => onPressYes()}
        />
      ) : null}
      {delteItemAlert ? (
        <AlertMessage
          visible={delteItemAlert}
          setmodalVisible={(val) => setdelteItemAlert(val)}
          mainMessage={mainMsg}
          subMessage={subMsg ? subMsg : ""}
          type="question"
          onConfirm={() => onDeleteItemYes()}
        />
      ) : null}
      {CancelProcessalert ? (
        <AlertMessage
          visible={CancelProcessalert}
          setmodalVisible={(val) => setCancelProcessalert(val)}
          mainMessage={mainMsg}
          subMessage={subMsg ? subMsg : ""}
          type="question"
          onConfirm={() => onPressYesCancel()}
        />
      ) : null}
      {successAlert ? (
        <AlertMessage
          visible={successAlert}
          setmodalVisible={(val) => setSuccessAlert(val)}
          mainMessage={mainMsg}
          onPressDone={() => onSuccessPressDone()}
          innerRoute={true}
        />
      ) : null}
      {erroralert ? (
        <AlertMessage
          visible={erroralert}
          setmodalVisible={(val) => seterrorAlert(val)}
          mainMessage={mainMsg}
          onPressDone={() => onPressDone()}
          innerRoute={true}
        />
      ) : null}
    </SafeAreaView>
  );
};
