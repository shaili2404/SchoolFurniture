import React, { useEffect, useState, useLayoutEffect } from "react";
import constants from "../../../locales/constants";
import styles from "./style";
import { SafeAreaView, View, Text, ScrollView, FlatList } from "react-native";
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
  const [taskName, setTaskName] = useState("");
  const [taskNameButoon, setTaskNameButton] = useState(false);
  const [taskNameButoonValue, setTaskNameButtonValue] = useState("");
  const [taskListButtonValue, setTaskListButtonValue] = useState("");
  const [taskListButoon, setTaskListButoon] = useState(false);
  const [schoolvalue, setschoolvalue] = useState("");
  const [loader, setLoader] = useState(true);
  const [emisvalue, setemisvalue] = useState("");
  const [stockcollectionName, setStockcollectioName] = useState("");
  const [stockcount, setStockCount] = useState("");
  const [flatListData, setFlatListData] = useState([]);
  const [saveButton, setSaveButton] = useState(true);
  const [submitButton, setSubmitButton] = useState(true);
  const [totalFurCount, setTotalFurCOunt] = useState(0);
  const [alert, setAlert] = useState(false);
  const [mainMsg, setMainMsg] = useState("");
  const [subMsg, setSubMsg] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);
  const [erroralert, seterrorAlert] = useState(false);
  const [CancelProcessalert, setCancelProcessalert] = useState(false);
  const [PhotoSection, setPhotoSection] = useState(false);

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

  const onSchool = () => {
    setCreateRequestIcon(constants.inprogress);
    setTaskName(constants.createRequest);
    setschoolvalue(schooldetails?.name);
    setemisvalue(schooldetails?.username);
    setStockcollectioName(constants.schoolFullFur);
    setFlatListData(route?.params);
    setPermissionId({
      userCreate: true,
      userDelete: true,
      userEdit: true,
    });
    setLoader(false);
  };
  const onrequestList = () => {
    const { school_name, emis, total_broken_items, broken_items } =
      route?.params;
    setCollectFurItem(constants.inprogress);
    setTaskName(constants.collectFurnitureRequest);
    setTaskNameButton(true);
    setTaskNameButtonValue(constants.Accept);
    setschoolvalue(school_name);
    setemisvalue(emis);
    setStockcollectioName(constants.schoolFurCount);
    setStockCount(total_broken_items);
    setFlatListData(broken_items);
    setLoader(false);
  };
  const onCollectionAccepted = () => {
    const { school_name, emis, total_broken_items, broken_items } =
      route?.params;
    setCollectFurItem(constants.inprogress);
    setTaskName(constants.collectFurnitureRequest);
    setschoolvalue(school_name);
    setemisvalue(emis);
    setStockcollectioName(constants.schoolFurCount);
    setStockCount(total_broken_items);
    setFlatListData(broken_items);
    setLoader(false);
  };
  const onPendingRepair = () => {
    const { school_name, emis, total_broken_items, broken_items } =
      route?.params;
    setCollectFurItem(constants.inprogress);
    setTaskName(constants.collectFurnitureRequest);
    setschoolvalue(school_name);
    setemisvalue(emis);
    setStockcollectioName(constants.schoolFurCount);
    setStockCount(total_broken_items);
    setFlatListData(broken_items);
    setLoader(false);
  };

  useEffect(() => {
    const task = route?.params?.status;
    if (organization == "School") {
      onSchool();
    } else if (task == "Pending Collection") {
      onrequestList();
    }
    else if (task == 'Collection Accepted'){
      onCollectionAccepted();
    }
    else if (task == 'Pending Repair'){
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
    //   let data = {item,task}
    //  navigation.navigate('AddRequestFur',(data))
  };

  const onDeleteFurItem = (item) => {
    var newArrayList = [];
    newArrayList = flatListData.filter((e) => e.item_id != item.item_id);
    setFlatListData(newArrayList);
  };

  const HeaderComponent = () => {
    return <ListHeaderComman tableHeader={tableHeader} />;
  };
  const onCancel = () => {
    setCancelProcessalert(true);
    setMainMsg(AlertText.cancelProcessMessgae);
    setSubMsg(AlertText.UndoMessgae);
  };
  const onSave = () => {
    setSubmitButton(false);
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
          taskName={taskName}
          taskNameButoon={taskNameButoon}
          taskNameButoonValue={taskNameButoonValue}
          acceptRequest={() => acceptRequestList()}
        />
        <InputForm
          schoolname={constants.schoolName}
          schoolvalue={schoolvalue}
          emisnumber={constants.emisNumber}
          emisvalue={emisvalue}
          org={organization}
          stockcollectionName={stockcollectionName}
          stockcount={stockcount}
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
          taskListButoon={taskListButoon}
          taskNameButoonValue={taskListButtonValue}
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
