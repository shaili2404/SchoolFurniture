import React, { useEffect, useState } from "react";
import constants from "../../../locales/constants";
import styles from "./style";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  FlatList,
} from "react-native";
import { IconBar } from "./iconbar";
import { TaskSection } from "./TaskSection/taskSection";
import { FooterFur } from "./Footer/footer";
import { InputForm } from "./InputForm/InputForm";
import { useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DataDisplayList } from "../../../component/manufacturer/displayListComman";
import { ListHeaderComman } from "../../../component/manufacturer/ListHeaderComman";
import axios from "axios";
import endUrl from "../../../redux/configration/endUrl";
import { AlertMessage } from "../../../Alert/alert";
import AlertText from "../../../Alert/AlertText";
import Loader from "../../../component/loader";

export const FurnitureReplacmentProcess = () => {
  const navigation = useNavigation();
  const [createRequestIcon, setCreateRequestIcon] = useState("");
  const [collectFurItem, setCollectFurItem] = useState("");
  const [repairIcon, setRepairIcon] = useState("");
  const [dilverFurIcon, setDilverFurIcon] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskNameButoon, setTaskNameButton] = useState(false);
  const [taskNameButoonValue, setTaskNameButtonValue] = useState("");
  const [taskListName, setTaskListName] = useState("");
  const [taskListButtonValue, setTaskListButtonValue] = useState("");
  const [taskListButoon, setTaskListButoon] = useState(false);
  const [schoolname, setschoolname] = useState("");
  const [schoolvalue, setschoolvalue] = useState("");
  const [emisnumber, setemisnumber] = useState("");
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
  const [erroralert, seterrorAlert] = useState(false);
  const [Cancelalert, setCancelAlert] = useState(false);

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
    setTaskListName(constants.BrokenFurnitureItem);
    setschoolname(constants.schoolName);
    setschoolvalue(schooldetails?.name);
    setemisnumber(constants.emisNumber);
    setemisvalue(schooldetails?.username);
    setStockcollectioName(constants.schoolFullFur);
    setFlatListData(route?.params);
    setPermissionId({
      userCreate: true,
      userDelete: true,
      userEdit: true,
    });
    setLoader(false)
  };
  const onrequestList = () => {
    setCollectFurItem(constants.inprogress);
    setTaskName(constants.collectFurnitureRequest);
    setTaskNameButton(true);
    setTaskNameButtonValue(constants.Accept);
    setTaskListName(constants.BrokenFurnitureItem);
    setschoolname(constants.schoolName);
    setschoolvalue(route?.params?.school_name);
    setemisnumber(constants.emisNumber);
    setemisvalue(route?.params?.emis);
    setStockcollectioName(constants.schoolFurCount);
    setStockCount(route?.params?.total_broken_items);
    setFlatListData(route?.params?.broken_items);
    setLoader(false)
  };

  useEffect(() => {
    if (organization == "School") {
      onSchool();
    } else {
      onrequestList();
    }
  }, []);

  const tableKey = ["category_name", "item_name", "count"];
  const tableHeader =
    organization == "School"
      ? [
          constants.FurCategory,
          constants.furItem,
          constants.collectioncount,
          constants.manage,
        ]
      : [constants.FurCategory, constants.furItem, constants.collectioncount];
  const renderComponent = ({ item }) => {
    return (
      <DataDisplayList
        item={item}
        tableKey={tableKey}
        permissionId={permissionId}
        organization={organization}
        onDeleteFurItem={(item) => onDeleteFurItem(item)}
      />
    );
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
    setCancelAlert(true)
    setMainMsg(AlertText.cancelProcessMessgae)
    setSubMsg(AlertText.UndoMessgae)
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
    axios.defaults.headers.common["Content-Type"] = "application/json";
    const data = {
      total_furniture: totalFurCount,
      broken_items: flatListData,
    };
    axios
      .post(`${endUrl.addFurRequest}`, data)
      .then((res) => {
        seterrorAlert(true);
        setMainMsg(res?.data?.message)
      })
      .catch((e) => console.log("apicall", e));
  };
  const onPressokay = () => {
    navigation.navigate('Furniture Replacment');
  };
 const  onPressYesCancel=()=>{
   setCancelAlert(false)
   navigation.navigate('Furniture Replacment');
  }

  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={styles.mainView}>
      <ScrollView >
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
      />
      <TaskSection
        taskName={taskName}
        taskNameButoon={taskNameButoon}
        taskNameButoonValue={taskNameButoonValue}
      />
      <InputForm
        schoolname={schoolname}
        schoolvalue={schoolvalue}
        emisnumber={emisnumber}
        emisvalue={emisvalue}
        org={organization}
        stockcollectionName={stockcollectionName}
        stockcount={stockcount}
        onvalueEdit={(val) => onvalueEdit(val)}
      />

      <TaskSection
        taskName={taskListName}
        taskListButoon={taskListButoon}
        taskNameButoonValue={taskListButtonValue}
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
       {Cancelalert ? (
        <AlertMessage
          visible={Cancelalert}
          setmodalVisible={(val) => setCancelAlert(val)}
          mainMessage={mainMsg}
          subMessage={subMsg}
          type="question"
          onConfirm={() => onPressYesCancel()}
        />
      ) : null}
      {erroralert ? (
        <AlertMessage
          visible={erroralert}
          setmodalVisible={(val) => seterrorAlert(val)}
          mainMessage={mainMsg}
          onConfirm={() => onPressokay()}
        />
      ) : null}
    </SafeAreaView>
  );
};
