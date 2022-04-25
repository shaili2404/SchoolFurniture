import React, { useEffect, useState, useLayoutEffect } from "react";
import constants from "../../../locales/constants";
import styles from "./style";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
  PermissionsAndroid,
} from "react-native";
import { IconBar } from "./iconbar";
import { TaskSection } from "./TaskSection/taskSection";
import { FooterFur } from "./Footer/footer";
import { InputForm } from "./InputForm/InputForm";
import { useSelector } from "react-redux";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { ListHeaderComman } from "../../../component/manufacturer/ListHeaderComman";
import axios from "axios";
import endUrl from "../../../redux/configration/endUrl";
import { AlertMessage } from "../../../Alert/alert";
import AlertText from "../../../Alert/AlertText";
import Loader from "../../../component/loader";
import { DisplayList } from "./ListDisplay/displayList";
import ImagePickerModal from "../../../component/imagePickerModal";
import Images from "../../../asset/images";
import reactNativeHtmlToPdf from "react-native-html-to-pdf";
import ShowImages from "../../../component/showImages";
import { Baseurl } from "../../../redux/configration/baseurl";
import FileViewer from "react-native-file-viewer";
import { DisposalCertificateButton } from "./certificateButton/disposalcertificateButton";
import { DisposalDIlveryButton } from "./certificateButton/disposalDilveryButton";
import DocumentPicker from "react-native-document-picker";

export const FurnitureReplacmentProcess = () => {
  const isFocused = useIsFocused();
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
  const [lenofContent, setlenofContent] = useState("");
  const [imageModal, setImageModal] = useState(false);
  const [taskofPage, settaskOfPage] = useState("");
  const [imgData, setImgData] = useState([]);
  const [imgLen, setImgLen] = useState("");
  const [viewImage, setViewImage] = useState(false);
  const [checkboxStatusreplanish, setcheckboxStatusreplanish] = useState(false);
  const [confirmCollectedCount, setConfirmCollectedCount] = useState([]);
  const [printdilverystatus, setprintdilverystatus] = useState(false);
  const [dileveryNote, setdileveryNote] = useState([]);
  const [brokenItemsList, setBrokenItemsList] = useState([]);
  const [totalFur,setTotalFur] = useState('')
  const [uploadPrintDilveryStatus, setuploadPrintDilveryStatus] =
    useState(false);
  const [checkoboxofDilveryitem, setcheckoboxofDilveryitem] = useState(false);
  const [selected, setselected] = useState([]);
  const [replanishCertificateStatus, setreplanishcertificateStatus] =
    useState(false);
  const [EmailreplanishCertificateStatus, setEmailreplanishcertificateStatus] =
    useState(false);
  const [
    statusOFreplanishCertificateStatus,
    setStatusOFEmailreplanishcertificateStatus,
  ] = useState(false);

  const route = useRoute();

  const schooldetails = useSelector(
    (state) => state?.loginData?.user?.data?.data?.user
  );

  const token = useSelector(
    (state) => state?.loginData?.user?.data?.access_token
  );

  const [permissionId, setPermissionId] = useState({
    userCreate: false,
    userEdit: false,
    userDelete: false,
  });
  const {
    school_name,
    emis,
    total_furniture,
    broken_items,
    id,
    ref_number,
    replenishment_status,
  } = schooldetails?.organization == constants.school ? "" : route?.params;

  const onSchool = () => {
    setCreateRequestIcon(constants.inprogress);
    setPermissionId({
      userCreate: true,
      userDelete: true,
      userEdit: true,
    });
    if (route?.params?.task == constants.ManageReqText){
      setFlatListData(route?.params?.items?.broken_items);
      setTotalFur(route?.params?.items?.total_furniture)
      setSaveButton(false)
    }
    else setFlatListData(route?.params?.finalList);

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
    setTableHeader((oldData) => [
      ...oldData,
      constants.collectedcount,
      constants.ReparableItem,
      constants.ReplanishmentItems,
    ]);
    setTableKey((oldData) => [...oldData, "confirmed_count"]);
    setTableKey((oldData) =>
      replenishment_status == null
        ? [...oldData, "reparableitem"]
        : [...oldData, "repaired_count"]
    );
    setTableKey((oldData) =>
      replenishment_status == null
        ? [...oldData, "replanishitem"]
        : [...oldData, "replenished_count"]
    );
    setlenofContent("More");
    setFlatListData(broken_items);
    setLoader(false);
  };
  const onRepairCompleted = () => {
    setCollectFurItem(constants.success);
    setRepairIcon(constants.success);
    setDilverFurIcon(constants.inprogress);
    setTableHeader((oldData) => [
      ...oldData,
      constants.collectedcount,
      constants.ReparableItem,
      constants.ReplanishmentItems,
      constants.Dilvery_headerDil,
    ]);

    setTableKey((oldData) => [
      ...oldData,
      "confirmed_count",
      "repaired_count",
      "replenished_count",
    ]);
    setTableKey((oldData) => [...oldData, "deliveritem"]);
    setlenofContent("More");
    setFlatListData(broken_items);
    setLoader(false);
  };

  const onpendingDeliver = () => {
    setCollectFurItem(constants.success);
    setRepairIcon(constants.success);
    setDilverFurIcon(constants.inprogress);
    setTableHeader((oldData) => [
      ...oldData,
      constants.collectedcount,
      constants.ReparableItem,
      constants.ReplanishmentItems,
      constants.Dilvery_headerDil,
    ]);

    setTableKey((oldData) => [
      ...oldData,
      "confirmed_count",
      "repaired_count",
      "replenished_count",
    ]);

    setTableKey((oldData) => [...oldData, "delivered_count"]);

    setlenofContent("More");
    setFlatListData(broken_items);
    setLoader(false);
  };

  useEffect(() => {
    const task = route?.params?.status;
    settaskOfPage(task);
    if (schooldetails?.organization == constants.school) onSchool();
    else if (task == constants.Status_PendingCollection) onrequestList();
    else if (task == constants.Status_CollectionAccepted)
      onCollectionAccepted();
    else if (task == constants.Status_pendingRepair) onPendingRepair();
    else if (task == constants.Status_RepairCompleted) onRepairCompleted();
    else if (task == constants.Status_pendingDilver) onpendingDeliver();
    else if (task == constants.Status_DeliveryConfirmed) {
      setCreateRequestIcon(constants.success);
      setCollectFurItem(constants.success);
      setRepairIcon(constants.success);
      setDilverFurIcon(constants.success);
      setSuccessAlert(true);
      setMainMsg("Delivery Is Already Done");
      setLoader(false);
    }
  }, [tableHeader, isFocused]);

  const [tableKey, setTableKey] = useState([
    "category_name",
    "item_name",
    "count",
  ]);

  const [tableHeader, setTableHeader] =
    schooldetails?.organization == constants.school
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
        organization={schooldetails?.organization}
        onDeleteFurItem={(item) => onDeleteFurItem(item)}
        onEdit={(item, task) => onEdit(item, task)}
        flatListData={flatListData}
        onSubmitDetails={(data) => setConfirmCollection(data)}
        pageStatus={taskofPage}
        onSubmitreparableDetails={(data) => setreparableCollection(data)}
        onsubmitDilverdetails={(data) => onsubmitDilverdetails(data)}
      />
    );
  };

  const setConfirmCollection = (data) => {
    if (imgData.length != 0) {
      let a 
      a = data.length 
     data?.filter((ele) => ele?.confirm_count == false)
     let b 
     b = data .length 

      console.log('283',a,b)
      // data?.filter((ele) => {
      //   if (ele?.confirm_count == "" || ele?.confirm_count == 0)
      //     setSaveButton(true);
      //   else setSaveButton(false);
      // });
    } else setSaveButton(true);

    setConfirmCollectedCount(data);
  };

  const setreparableCollection = (data) => {
    data?.filter((ele) => {
      if (
        ele?.replenish_count == "" ||
        ele?.replenish_count == 0 ||
        ele?.replenish_count < 0
      ) {
        setreplanishcertificateStatus(false);
        setcheckboxStatusreplanish(true);
      } else {
        setreplanishcertificateStatus(true);
        setcheckboxStatusreplanish(false);
      }
    });
    setConfirmCollectedCount(data);
  };
  const onsubmitDilverdetails = (data) => {
    setConfirmCollectedCount(data);
    setcheckoboxofDilveryitem(true);
  };

  const onEdit = (item, task) => {
    navigation.navigate("AddRequestFur", {
      item: item,
      task: task,
      flatListData: flatListData,
      screen:
        route?.params?.screen == constants.ManageReqText ||
        route?.params?.task == constants.ManageReqText
          ? constants.ManageReqText
          : null,
      id:
        route?.params?.screen == constants.ManageReqText
          ? route?.params?.id
          : route?.params?.items?.id,
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
    return (
      <ListHeaderComman tableHeader={tableHeader} lenofContent={lenofContent} />
    );
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

  const onPressYes = () => {
    setAlert(false);
    if (schooldetails?.organization == constants.school) onschoolreqSubmit();
    else if (
      taskofPage == constants.Status_PendingCollection ||
      taskofPage == constants.Status_CollectionAccepted
    )
      onSubmitcollectionRequest();
    else if (taskofPage == constants.Status_pendingRepair)
      onsubmitRepairDetails();
    else if (
      taskofPage == constants.Status_RepairCompleted ||
      taskofPage == constants.Status_pendingDilver
    )
      onSubmitDelivery();
  };

  const onSubmitDelivery = async () => {
    setLoader(true);

    const url = `${Baseurl}${endUrl.finalDelivery}`;

    let body = new FormData();

    dileveryNote.forEach((data) => {
      const name =
        Platform.OS == "ios"
          ? data.name
          : data.uri.substring(data.uri.lastIndexOf("/") + 1);
      body.append("upload_file", {
        uri: Platform.OS == "ios" ? data.uri : data.uri,
        type: data.type,
        name: name,
        filename: name,
      });
    });
    body.append("ref_number", ref_number);
    const uploadImg = async () => {
      try {
        let response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer${token}`,
          },
          body: body,
        });
        let res = await response.json();
        if (response.ok) SuccessUploadImage(res);
        else ErrorApi(res, "collection");
      } catch (err) {}
    };
    uploadImg();
  };
 
   
  const SuccessUploadImage = (res) => {
    setSuccessAlert(true);
    setLoader(false);
    setMainMsg(res?.message);
  };
  const successApi = (res) => {
    setSuccessAlert(true);
    setLoader(false);
    setMainMsg(res?.data?.message);
  };

  const onsubmitRepairDetails = () => {
    setLoader(true)
      if (replenishment_status == null){
        confirmCollectedCount.map((ele) => {
          ele.replenish_count = ele?.replenish_count;
          ele.repair_count = ele?.repair_count;
        });
           }
      else{
      flatListData.map((ele) => {
        ele.replenish_count = ele.replenished_count;
        ele.repair_count = ele.repaired_count;
      });
    }
      let data = {
        ref_number: ref_number,
        items:
          replenishment_status == 1 || replenishment_status == 2 || replenishment_status == 3
            ? flatListData
            : confirmCollectedCount,
      };
     axios
      .post(`${endUrl.submitRepair}`, data)
      .then((res) => successApi(res))
      .catch((e) => ErrorApi(e));
  };

  const onSubmitcollectionRequest = async () => {
    setLoader(true);

    let obj = {};
    confirmCollectedCount.map((ele) => {
      obj[ele?.id] = Number(ele?.confirm_count);
    });

    const url = `${Baseurl}${endUrl.acceptCollectionReuest}`;

    let body = new FormData();

    imgData.forEach((img) => {
      const name =
        Platform.OS == "ios"
          ? img.filename
          : img.path.substring(img.path.lastIndexOf("/") + 1);
      body.append("images[]", {
        uri: Platform.OS == "ios" ? img.sourceURL : img.path,
        type: img.mime,
        name: name,
        filename: name,
      });
    });
    for (const [key, value] of Object.entries(obj)) {
      body.append(`confirm_count[${key}]`, `${value}`);
    }
    body.append("ref_number", ref_number);

    const uploadImg = async () => {
      try {
        let response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer${token}`,
          },
          body: body,
        });
        let res = await response.json();
        if (response.ok) SuccessUploadImage(res);
        else ErrorApi(res, "collection");
      } catch (err) {}
    };

    uploadImg();
  };

  const onschoolreqSubmit = async () => {
    setLoader(true);
    const data = {
      total_furniture: totalFurCount,
      broken_items: flatListData,
    };
    if (
      route?.params?.screen == constants.ManageReqText ||
      route?.params?.task == constants.ManageReqText
    ) {
      axios
        .put(
          `${endUrl.delManageRequest}/${
            route?.params?.screen == constants.ManageReqText
              ? route?.params?.id
              : route?.params?.items?.id
          }`,
          data
        )
        .then((res) => successApi(res))
        .catch((e) => ErrorApi(e));
    } else {
      axios
        .post(`${endUrl.addFurRequest}`, data)
        .then((res) => successApi(res))
        .catch((e) => ErrorApi(e));
    }
  };

  const ErrorApi = (e, arg) => {
    let res = arg != "collection" ? e?.response?.data : e;
    let { message, data, status } = res || {};
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
  };

  const onConfirm = (imgData) => {
    let len;
    setImgData(imgData);
    len = imgData.length > 10 ? "10+" : imgData.length;
    if (len == 0) setPhotoSection(true);
    else {
      setImgLen(len);
      setPhotoSection(false);
    }
    setImageModal(false);
    setViewImage(false);
  };

  const onPressDone = () => {
    seterrorAlert(false);
  };

  const onSuccessPressDone = () => {
    if (
      route?.params?.screen == constants.ManageReqText ||
      route?.params?.task == constants.ManageReqText
    ) {
      seterrorAlert(false);
      navigation.navigate("ManageRequests");
    } else {
      seterrorAlert(false);
      navigation.navigate("Furniture Replacment");
    }
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
    setTaskListButtonValue(constants.printPickupSLip);
    setTableHeader((oldData) => [...oldData, constants.collectedcount]);
    setTableKey((oldData) => [...oldData, "collectionCount"]);
    axios
      .get(`${endUrl.acceptCollectionReuest}/${id}/edit`)
      .then((res) => {})
      .catch((e) => ErrorApi(e));
  };

  const isPermitted = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "External Storage Write Permission",
            message: "App needs access to Storage data",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        alert("Write permission err", err);
        return false;
      }
    } else return true;
  };

  const createPDF = async (data) => {
    if (await isPermitted()) {
      const test = data;
      let options = {
        html: test,

        fileName: "test",
        directory: "docs",
      };
      let file = await reactNativeHtmlToPdf.convert(options);
      Alert.alert(
        "Successfully Exported",
        "Path:" + file.filePath,
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open", onPress: () => openFile(file.filePath) },
        ],
        { cancelable: true }
      );
    }
  };
  const openFile = async (filepath) => {
    const path = filepath;
    await FileViewer.open(path)
      .then(() => {})
      .catch((error) => {});
  };

  const ondisposalcertPress = () => {
    // setLoader(true);
    let data = {
      ref_number: ref_number,
      items: confirmCollectedCount,
    };
    getpdfApi(endUrl?.annexureB, data);
    setEmailreplanishcertificateStatus(true);
  };
  const onreplanishemailcer = () => {
    // setLoader(true);
    let data = {
      ref_number: ref_number,
      items: confirmCollectedCount,
    };
    getpdfApi(endUrl?.annexureC, data);
    setStatusOFEmailreplanishcertificateStatus(true);
  };

  const uploadSignedreplanishment = async (result) => {
    // setLoader(true)
    const url = `${Baseurl}${endUrl.uploadProofReplanishment}`;

    let body = new FormData();

    result.forEach((data) => {
      const name =
        Platform.OS == "ios"
          ? data.name
          : data.uri.substring(data.uri.lastIndexOf("/") + 1);
      body.append("upload_proof", {
        uri: Platform.OS == "ios" ? data.uri : data.uri,
        type: data.type,
        name: name,
        filename: name,
      });
    });
    body.append("ref_number", ref_number);
    body.append("replenishment_status", selected?.id);
    const uploadImg = async () => {
      try {
        let response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer${token}`,
          },
          body: body,
        });
        let res = await response.json();
        if (response.ok) {
          seterrorAlert(true);
          setLoader(false);
          setMainMsg(res?.message);
          setcheckboxStatusreplanish(true);
        } else ErrorApi(res, "collection");
      } catch (err) {}
    };

    uploadImg();
  };

  const onUploadreplanisNote = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setdileveryNote(result);
      if (taskofPage == constants.Status_pendingRepair)
        uploadSignedreplanishment(result);
      else setcheckboxStatusreplanish(true);
    } catch (err) {}
  };

  const onPressDeliveryNote = () => {
    let data = {
      ref_number: ref_number,
      items: confirmCollectedCount,
    };

    getpdfApi(endUrl?.annexureD, data);
    setuploadPrintDilveryStatus(true);
  };

  const printPickupbutpress = () => {
    setLoader(true);
    setPhotoSection(true);
    let data = {
      ref_number: ref_number,
    };
    getpdfApi(endUrl?.annexure, data);
  };
  const askPermission = (data) => {
    async function requestExternalWritePermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Pdf creator needs External Storage Write Permission",
            message: "Pdf creator needs access to Storage data in your SD Card",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) createPDF(data);
        else alert("WRITE_EXTERNAL_STORAGE permission denied");
      } catch (err) {
        alert("Write permission err", err);
      }
    }
    if (Platform.OS === "android") requestExternalWritePermission();
    else createPDF(data);
  };

  const getpdfApi = (annexure, data) => {
    axios
      .post(annexure, data)
      .then((res) => {
        askPermission(res?.data);
        setLoader(false);
      })
      .catch((e) => {
        ErrorApi(e);
      });
  };

  const viewAllImg = () => {
    setViewImage(true);
  };

  useLayoutEffect(() => {
    const title = "Furniture Replacement Process";
    navigation.setOptions({ title });
  }, []);

  const onBack = () => {
    setViewImage(false);
  };
  const setvaluesavebutton = (value) => {
    value == true ? setSaveButton(true) : setSaveButton(false);
  };

  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={styles.mainView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "position" : null}
          keyboardVerticalOffset={0}
        >
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
              schooldetails?.organization == constants.school
                ? constants.createRequest
                : constants.collectFurnitureRequest
            }
            taskNameButoonValue={taskNameButoonValue}
            acceptRequest={() => acceptRequestList()}
          />
          <View style={styles.responsiveHiegth}>
            <InputForm
              schoolname={constants.schoolName}
              schoolvalue={
                schooldetails?.organization == constants.school
                  ? schooldetails?.name
                  : school_name
              }
              emisnumber={constants.emisNumber}
              emisvalue={
                schooldetails?.organization == constants.school
                  ? schooldetails?.username
                  : emis
              }
              org={schooldetails?.organization}
              stockcollectionName={constants.schoolFurCount}
              stockcount={total_furniture}
              onvalueEdit={(val) => onvalueEdit(val)}
              totalFur={totalFur}
              task={constants.ManageReqText}
            />
            {schooldetails?.organization == constants.school ? (
              <View style={styles.addplusView}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("AddRequestFur", {
                      flatListData: flatListData,
                      screen:
                        route?.params?.screen == constants.ManageReqText ||
                        route?.params?.task == constants.ManageReqText
                          ? constants.ManageReqText
                          : null,
                      id:
                        route?.params?.screen == constants.ManageReqText
                          ? route?.params?.id
                          : route?.params?.items?.id,
                    })
                  }
                >
                  <Image source={Images.addCricleIcon} />
                </TouchableOpacity>
              </View>
            ) : (
              <>
                {PhotoSection ? (
                  <View style={styles.photoView}>
                    <TouchableOpacity onPress={() => setImageModal(true)}>
                      <Text style={styles.photoText}>{constants.AddPhoto}</Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </>
            )}

            {imgData && imgData.length ? (
              <View style={styles.uploadedView}>
                <View style={styles.noOfPhoto}>
                  <Text style={styles.uploadedText}>{constants.uploaded}</Text>
                  <Text
                    style={styles.uploadedText}
                  >{`${imgLen} ${constants.Photos}`}</Text>
                </View>
                <TouchableOpacity onPress={viewAllImg}>
                  <Text style={styles.viewAllText}>{constants.ViewAll}</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>

          <TaskSection
            taskName={constants.BrokenFurnitureItem}
            taskNamePrintButoonValue={taskListButtonValue}
            printPickupPress={() => printPickupbutpress()}
          />

          {/* {filePath ? <Text style={styles.textStyle}>{filePath}</Text> : null} */}

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <FlatList
              ListHeaderComponent={HeaderComponent}
              data={flatListData}
              keyExtractor={(item) => item?.id}
              renderItem={renderComponent}
              showsVerticalScrollIndicator={false}
            />
          </ScrollView>
          {taskofPage == constants.Status_pendingRepair ? (
            <DisposalCertificateButton
              ondisposalcertPress={() => ondisposalcertPress()}
              onreplanishemailcer={() => onreplanishemailcer()}
              EmailreplanishCertificateStatus={
                replenishment_status == null
                  ? EmailreplanishCertificateStatus
                  : true
              }
              replanishCertificateStatus={
                replenishment_status == null ? replanishCertificateStatus : true
              }
              statusOFreplanishCertificateStatus={
                replenishment_status == null
                  ? statusOFreplanishCertificateStatus
                  : true
              }
              onUploadreplanisNote={() => onUploadreplanisNote()}
              setSelected={setselected}
              checkboxStatusreplanish={
                replenishment_status == 2 || replenishment_status == 3
                  ? true
                  : checkboxStatusreplanish
              }
              oncheckboxvalue={(value) => setvaluesavebutton(value)}
              replenishment_status={replenishment_status}
            />
          ) : null}

          {taskofPage == constants.Status_RepairCompleted ||
          taskofPage == constants.Status_pendingDilver ? (
            <DisposalDIlveryButton
              onPressDeliveryNote={() => onPressDeliveryNote()}
              ondilverycheckboxone={(value) =>
                setprintdilverystatus(value == true ? false : true)
              }
              printdilverystatus={
                taskofPage == constants.Status_pendingDilver
                  ? true
                  : printdilverystatus
              }
              uploadPrintDilveryStatus={
                taskofPage == constants.Status_pendingDilver
                  ? true
                  : uploadPrintDilveryStatus
              }
              uploadDilveryNote={() => onUploadreplanisNote()}
              checkboxStatusreplanish={checkboxStatusreplanish}
              oncheckboxvalue={(value) => setvaluesavebutton(value)}
              taskofPage={taskofPage}
              checkoboxofDilveryitem={
                taskofPage == constants.Status_pendingDilver
                  ? true
                  : checkoboxofDilveryitem
              }
            />
          ) : null}
          <View style={{ height: 60 }} />
        </KeyboardAvoidingView>
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
          type={constants.dropdown_Type}
          onConfirm={() => onPressYes()}
        />
      ) : null}

      {delteItemAlert ? (
        <AlertMessage
          visible={delteItemAlert}
          setmodalVisible={(val) => setdelteItemAlert(val)}
          mainMessage={mainMsg}
          subMessage={subMsg ? subMsg : ""}
          type={constants.dropdown_Type}
          onConfirm={() => onDeleteItemYes()}
        />
      ) : null}
      {CancelProcessalert ? (
        <AlertMessage
          visible={CancelProcessalert}
          setmodalVisible={(val) => setCancelProcessalert(val)}
          mainMessage={mainMsg}
          subMessage={subMsg ? subMsg : ""}
          type={constants.dropdown_Type}
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
      {imageModal ? (
        <ImagePickerModal
          imageModal={imageModal}
          setmodalVisible={(val) => setImageModal(val)}
          onConfirm={(data) => {
            onConfirm(data);
          }}
        />
      ) : null}
      {viewImage ? (
        <ShowImages
          imageModal={viewImage}
          setmodalVisible={(val) => setViewImage(val)}
          selectedImg={imgData}
          onConfirm={(data) => {
            onConfirm(data);
          }}
          onBack={() => onBack()}
        />
      ) : null}
    </SafeAreaView>
  );
};
