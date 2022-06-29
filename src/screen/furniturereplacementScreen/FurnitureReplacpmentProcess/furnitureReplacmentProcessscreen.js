import React, { useEffect, useState, useLayoutEffect } from "react";
import constants from "../../../locales/constants";
import styles from "./style";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  FlatList,
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
import axios from "axios";
import endUrl from "../../../redux/configration/endUrl";
import { AlertMessage } from "../../../Alert/alert";
import AlertText from "../../../Alert/AlertText";
import Loader from "../../../component/loader";
import { DisplayList } from "./ListDisplay/displayList";
import ImagePickerModal from "../../../component/imagePickerModal";
import reactNativeHtmlToPdf from "react-native-html-to-pdf";
import ShowImages from "../../../component/showImages";
import { Baseurl } from "../../../redux/configration/baseurl";
import FileViewer from "react-native-file-viewer";
import { DisposalCertificateButton } from "./certificateButton/disposalcertificateButton";
import { DisposalDIlveryButton } from "./certificateButton/disposalDilveryButton";
import DocumentPicker from "react-native-document-picker";
import ModalLoader from "../../../component/ModalLoader";
import ConstKey from "../../../locales/ApikeyConst";
import Screen from "../../../locales/navigationConst";
import ScreenTitle from "../../../locales/ScreenTitle";
import { ListHeader } from "./ListDisplay/HeaderList";
import CommonService from "../../../locales/service";

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
  const [totalFur, setTotalFur] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [disableUploadcpy, setDisableUploadcpy] = useState(false);
  const [uploadPrintDilveryStatus, setuploadPrintDilveryStatus] =
    useState(false);
  const [checkoboxofDilveryitem, setcheckoboxofDilveryitem] = useState(false);
  const [selected, setselected] = useState([]);
  const [replanishCertificateStatus, setreplanishcertificateStatus] =
    useState(false);
  const [EmailreplanishCertificateStatus, setEmailreplanishcertificateStatus] =
    useState(false);
  const [onetaskSection, setOnetasksection] = useState("");
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
    acceptButton: false,
    repair_furniture_create: false,
    deliver_furniture_create: false,
  });
  const [plusSign, setPlusSign] = useState(false);
  const [footerSign, setfooterSign] = useState(false);
  const [modalloader, setmodalloader] = useState(false);

  const {
    school_name,
    emis,
    total_furniture,
    broken_items,
    id,
    ref_number,
    replenishment_status,
  } = schooldetails?.organization == constants.school ? "" : route?.params;

  schooldetails?.organization == constants.school
    ? constants.createRequest
    : constants.collectFurnitureRequest;
  const loginData = useSelector((state) => state?.loginData);

  useEffect(() => {
    const arr = loginData?.user?.data?.data?.permissions;
    const [acptButton, rpc, dfc] = CommonService.getPermission(
      arr,
      [26, 27, 28]
    );
    setPermissionId({
      acceptButton: acptButton,
      repair_furniture_create: rpc,
      deliver_furniture_create: dfc,
    });
  }, []);
  console.log("145", permissionId);
  const onSchool = () => {
    let task = route?.params?.status;
    if (route?.params?.task == constants.ManageReqText) {
      setPlusSign(false);
      setfooterSign(false);
      setCreateRequestIcon(constants.inprogress);
      setOnetasksection(constants.createRequest);
      setPermissionId({
        userCreate: true,
        userDelete: true,
        userEdit: true,
      });
      setFlatListData(route?.params?.items?.broken_items);
      setTotalFur(route?.params?.items?.total_furniture);
      setSaveButton(false);
    } else if (task == constants.Status_PendingCollection) {
      setTotalFur(route?.params?.total_furniture);
      setPlusSign(true);
      setfooterSign(true);
      setCollectFurItem(constants.inprogress);
      setOnetasksection(constants.collectFurnitureRequest);
      setFlatListData(route?.params?.broken_items);
      setTableHeader([
        constants.FurCategory,
        constants.furItem,
        constants.furniture_full_count,
        constants.collectioncount,
      ]);
      setLoader(false);
    } else if (task == constants.Status_CollectionAccepted) {
      setTotalFur(route?.params?.total_furniture);
      setPlusSign(true);
      setfooterSign(true);
      setCollectFurItem(constants.inprogress);
      setOnetasksection(constants.collectFurnitureRequest);
      setTableHeader([
        constants.FurCategory,
        constants.furItem,
        constants.furniture_full_count,
        constants.collectioncount,
      ]);
      setFlatListData(route?.params?.broken_items);
      setLoader(false);
    } else if (task == constants.Status_pendingRepair) {
      setTotalFur(route?.params?.total_furniture);
      setPlusSign(true);
      setfooterSign(true);
      setCollectFurItem(constants.success);
      setRepairIcon(constants.inprogress);
      setOnetasksection(constants.RepairReplnish);
      setTableHeader((oldData) => [
        constants.FurCategory,
        constants.furItem,
        constants.furniture_full_count,
        constants.collectioncount,
        constants.collectedcount,
      ]);
      setTableKey((oldData) => [...oldData, ConstKey.confirmed_count]);
      setFlatListData(route?.params?.broken_items);
      setLoader(false);
    } else if (task == constants.Status_RepairCompleted) {
      setTotalFur(route?.params?.total_furniture);
      setPlusSign(true);
      setfooterSign(true);
      setCollectFurItem(constants.success);
      setRepairIcon(constants.success);
      setOnetasksection(constants.DeliverFurItem);
      setDilverFurIcon(constants.inprogress);
      setTableHeader((oldData) => [
        constants.FurCategory,
        constants.furItem,
        constants.furniture_full_count,
        constants.collectioncount,
        constants.collectedcount,
        constants.ReparableItem,
        constants.ReplanishmentItems,
        constants.Replenishment_Approved_item,
        constants.Replenishment_Reject_item,
      ]);

      setTableKey((oldData) => [
        ...oldData,
        ConstKey.confirmed_count,
        ConstKey.repaired_count,
        ConstKey.replenished_count,
        ConstKey.approved_replenished_count,
        ConstKey.rejected_replenished_count,
      ]);
      setlenofContent("More");
      setFlatListData(route?.params?.broken_items);
      setLoader(false);
    } else if (
      task == constants.Status_pendingDilver ||
      task == constants.Status_DeliveryConfirmed
    ) {
      setTotalFur(route?.params?.total_furniture);
      setPlusSign(true);
      setfooterSign(true);
      setCollectFurItem(constants.success);
      setRepairIcon(constants.success);
      setOnetasksection(constants.DeliverFurItem);
      task == constants.Status_DeliveryConfirmed
        ? setDilverFurIcon(constants.success)
        : setDilverFurIcon(constants.inprogress);
      setTableHeader((oldData) => [
        constants.FurCategory,
        constants.furItem,
        constants.furniture_full_count,
        constants.collectioncount,
        constants.collectedcount,
        constants.ReparableItem,
        constants.ReplanishmentItems,
        constants.Replenishment_Approved_item,
        constants.Replenishment_Reject_item,
        constants.Dilvery_headerDil,
      ]);

      setTableKey((oldData) => [
        ...oldData,
        ConstKey.confirmed_count,
        ConstKey.repaired_count,
        ConstKey.replenished_count,
        ConstKey.approved_replenished_count,
        ConstKey.rejected_replenished_count,
      ]);

      setTableKey((oldData) => [...oldData, ConstKey.delivered_count]);

      setlenofContent("More");
      setFlatListData(route?.params?.broken_items);
      setLoader(false);
    } else {
      setFlatListData(route?.params?.finalList);
      setCreateRequestIcon(constants.inprogress);
      setOnetasksection(constants.createRequest);
      setPermissionId({
        userCreate: true,
        userDelete: true,
        userEdit: true,
      });
      setPlusSign(false);
      setfooterSign(false);
    }
    setlenofContent("More");
    setLoader(false);
  };
  const onrequestList = () => {
    setPlusSign(true);
    setfooterSign(false);
    setCollectFurItem(constants.inprogress);
    setOnetasksection(constants.collectFurnitureRequest);
    setTaskNameButtonValue(constants.Accept);
    setFlatListData(broken_items);
    setLoader(false);
  };
  const onCollectionAccepted = () => {
    setPlusSign(true);
    setfooterSign(false);
    setCollectFurItem(constants.inprogress);
    setTaskNameButtonValue(constants.Accepted);
    setOnetasksection(constants.collectFurnitureRequest);
    setTaskListButtonValue(constants.printPickupSLip);
    setTableHeader((oldData) => [...oldData, constants.collectedcount]);
    setTableKey((oldData) => [...oldData, ConstKey.collectionCount]);
    setFlatListData(broken_items);
    setLoader(false);
  };
  const onPendingRepair = () => {
    const arr = loginData?.user?.data?.data?.permissions;
    const [rpc] = CommonService.getPermission(arr, [27]);
    if (rpc == true) {
      setPlusSign(true);
      setfooterSign(false);
      setCollectFurItem(constants.success);
      setRepairIcon(constants.inprogress);
      setOnetasksection(constants.RepairReplnish);
      setTableHeader((oldData) => [
        ...oldData,
        constants.collectedcount,
        constants.ReparableItem,
        constants.ReplanishmentItems,
      ]);
      setTableKey((oldData) => [...oldData, ConstKey.confirmed_count]);
      setTableKey((oldData) =>
        replenishment_status == null
          ? [...oldData, ConstKey.reparableitem]
          : [...oldData, ConstKey.repaired_count]
      );
      setTableKey((oldData) =>
        replenishment_status == null
          ? [...oldData, ConstKey.replanishitem]
          : [...oldData, ConstKey.replenished_count]
      );
      if (replenishment_status == 1) {
        setTableKey((oldData) => [
          ...oldData,
          ConstKey.Approved_Items,
          ConstKey.Rejected_Items,
        ]);
        setTableHeader((oldData) => [
          ...oldData,
          constants.Replenishment_Approved_item,
          constants.Replenishment_Reject_item,
        ]);
      } else if (replenishment_status == 2 || replenishment_status == 3) {
        setTableKey((oldData) => [
          ...oldData,
          ConstKey.approved_replenished_count,
          ConstKey.rejected_replenished_count,
        ]);
        setTableHeader((oldData) => [
          ...oldData,
          constants.Replenishment_Approved_item,
          constants.Replenishment_Reject_item,
        ]);
      }
      setlenofContent("More");
      setFlatListData(broken_items);
      setLoader(false);
    } else onDisapprovePendingRepair();
  };
  const onDisapprovePendingRepair = () => {
    setPlusSign(true);
    setfooterSign(false);
    setCollectFurItem(constants.success);
    setRepairIcon(constants.inprogress);
    setOnetasksection(constants.RepairReplnish);
    setTableHeader((oldData) => [...oldData, constants.collectedcount]);
    setTableKey((oldData) => [...oldData, ConstKey.confirmed_count]);
    setlenofContent("More");
    setFlatListData(broken_items);
    setLoader(false);
  };
  const onRepairCompleted = () => {
    const arr = loginData?.user?.data?.data?.permissions;
    const [rpc] = CommonService.getPermission(arr, [28]);
    if (rpc == true) {
      setPlusSign(true);
      setfooterSign(false);
      setCollectFurItem(constants.success);
      setRepairIcon(constants.success);
      setOnetasksection(constants.DeliverFurItem);
      setDilverFurIcon(constants.inprogress);
      setTableHeader((oldData) => [
        ...oldData,
        constants.collectedcount,
        constants.ReparableItem,
        constants.ReplanishmentItems,
        constants.Replenishment_Approved_item,
        constants.Replenishment_Reject_item,
        constants.Dilvery_headerDil,
      ]);

      setTableKey((oldData) => [
        ...oldData,
        ConstKey.confirmed_count,
        ConstKey.repaired_count,
        ConstKey.replenished_count,
        ConstKey.approved_replenished_count,
        ConstKey.rejected_replenished_count,
      ]);
      setTableKey((oldData) => [...oldData, ConstKey.deliveritem]);
      setlenofContent("More");
      setFlatListData(broken_items);
      setLoader(false);
    } else ondisaproveRepairCompleted();
  };
  const ondisaproveRepairCompleted = () => {
    setPlusSign(true);
    setfooterSign(false);
    setCollectFurItem(constants.success);
    setRepairIcon(constants.success);
    setOnetasksection(constants.DeliverFurItem);
    setDilverFurIcon(constants.inprogress);
    setTableHeader((oldData) => [
      ...oldData,
      constants.collectedcount,
      constants.ReparableItem,
      constants.ReplanishmentItems,
      constants.Replenishment_Approved_item,
      constants.Replenishment_Reject_item,
    ]);

    setTableKey((oldData) => [
      ...oldData,
      ConstKey.confirmed_count,
      ConstKey.repaired_count,
      ConstKey.replenished_count,
      ConstKey.approved_replenished_count,
      ConstKey.rejected_replenished_count,
    ]);
    setlenofContent("More");
    setFlatListData(broken_items);
    setLoader(false);
  };

  const onpendingDeliver = () => {
    setPlusSign(true);
    setfooterSign(false);
    setCollectFurItem(constants.success);
    setRepairIcon(constants.success);
    setOnetasksection(constants.DeliverFurItem);
    setDilverFurIcon(constants.inprogress);
    setTableHeader((oldData) => [
      ...oldData,
      constants.collectedcount,
      constants.ReparableItem,
      constants.ReplanishmentItems,
      constants.Replenishment_Approved_item,
      constants.Replenishment_Reject_item,
      constants.Dilvery_headerDil,
    ]);

    setTableKey((oldData) => [
      ...oldData,
      ConstKey.confirmed_count,
      ConstKey.repaired_count,
      ConstKey.replenished_count,
      ConstKey.approved_replenished_count,
      ConstKey.rejected_replenished_count,
    ]);

    setTableKey((oldData) => [...oldData, ConstKey.delivered_count]);
    setlenofContent("More");
    setFlatListData(broken_items);
    setLoader(false);
  };
  const ondeliverydone = () => {
    setPlusSign(true);
    setfooterSign(false);
    setCreateRequestIcon(constants.success);
    setCollectFurItem(constants.success);
    setOnetasksection(constants.DeliverFurItem);
    setRepairIcon(constants.success);
    setDilverFurIcon(constants.success);
    setTableHeader((oldData) => [
      ...oldData,
      constants.collectedcount,
      constants.ReparableItem,
      constants.ReplanishmentItems,
      constants.Replenishment_Approved_item,
      constants.Replenishment_Reject_item,
      constants.Dilvery_headerDil,
    ]);

    setTableKey((oldData) => [
      ...oldData,
      ConstKey.confirmed_count,
      ConstKey.repaired_count,
      ConstKey.replenished_count,
      ConstKey.approved_replenished_count,
      ConstKey.rejected_replenished_count,
      ConstKey.delivered_count,
    ]);
    setlenofContent("More");
    setFlatListData(broken_items);

    setLoader(false);
  };

  useEffect(() => {
    const task = route?.params?.status;
    console.log(route?.params?.status);
    settaskOfPage(task);
    if (schooldetails?.organization == constants.school) onSchool();
    else if (task == constants.Status_PendingCollection) onrequestList();
    else if (task == constants.Status_CollectionAccepted)
      onCollectionAccepted();
    else if (task == constants.Status_pendingRepair) onPendingRepair();
    else if (task == constants.Status_RepairCompleted) onRepairCompleted();
    else if (task == constants.Status_pendingDilver) onpendingDeliver();
    else if (task == constants.Status_DeliveryConfirmed) ondeliverydone();
  }, [tableHeader, isFocused]);

  const [tableKey, setTableKey] = useState([
    ConstKey.category_name,
    ConstKey.item_name,
    ConstKey.item_full_count,
    ConstKey.count,
  ]);

  const [tableHeader, setTableHeader] =
    schooldetails?.organization == constants.school
      ? useState([
          constants.FurCategory,
          constants.furItem,
          constants.furniture_full_count,
          constants.collectioncount,
          constants.manage,
        ])
      : useState([
          constants.FurCategory,
          constants.furItem,
          constants.furniture_full_count,
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
        replenishment_status={replenishment_status}
        onsubmitApproved={(data) => onsubmitApproved(data)}
      />
    );
  };

  const onsubmitApproved = (data) => {
    setDisableUploadcpy(false);
    setConfirmCollectedCount(data);
  };

  const setConfirmCollection = (data) => {
    if (imgData.length != 0) {
      const isGreaterThanZero = data?.every((ele) => ele?.confirm_count > 0);
      isGreaterThanZero ? setSaveButton(false) : setSaveButton(true);
    } else setSaveButton(true);

    setConfirmCollectedCount(data);
  };

  const setreparableCollection = (data) => {
    const isGreaterThanZero = data?.every((ele) => ele?.replenish_count == 0);

    if (isGreaterThanZero) {
      setreplanishcertificateStatus(false);
      setcheckboxStatusreplanish(true);
    } else {
      setreplanishcertificateStatus(true);
      setcheckboxStatusreplanish(false);
    }

    setConfirmCollectedCount(data);
  };
  const onsubmitDilverdetails = (data) => {
    const arr = loginData?.user?.data?.data?.permissions;
    const [rpc] = CommonService.getPermission(arr, [28]);
    if (rpc == true) setcheckoboxofDilveryitem(true);
    else setcheckoboxofDilveryitem(false);
    setErrorMessage("");
    setConfirmCollectedCount(data);
  };

  const onEdit = (item, task) => {
    navigation.navigate(Screen.Add_Request_Fur, {
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
    return <ListHeader tableHeader={tableHeader} lenofContent={"more"} />;
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
    body.append(ConstKey.ref_number, ref_number);
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
    setLoader(true);
    if (replenishment_status == null) {
      confirmCollectedCount.map((ele) => {
        ele.replenish_count = ele?.replenish_count;
        ele.repair_count = ele?.repair_count;
      });
    } else {
      flatListData.map((ele) => {
        ele.replenish_count = ele.replenished_count;
        ele.repair_count = ele.repaired_count;
      });
    }
    let data = {
      ref_number: ref_number,
      items:
        replenishment_status == 1 ||
        replenishment_status == 2 ||
        replenishment_status == 3
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
    body.append(ConstKey.ref_number, ref_number);

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
      total_furniture: totalFurCount ? totalFurCount : totalFur,
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
      navigation.navigate(Screen.Manage_Requests);
    } else {
      seterrorAlert(false);
      navigation.navigate(Screen.Furniture_Replacment);
    }
  };

  const onPressYesCancel = () => {
    setCancelProcessalert(false);
    navigation.navigate(Screen.Furniture_Replacment);
  };

  const onTransactionList = () => {
    setCancelProcessalert(true);
    setMainMsg(AlertText.GoToTransactionList);
  };

  const acceptRequestList = () => {
    setTaskNameButtonValue(constants.Accepted);
    setTaskListButtonValue(constants.printPickupSLip);
    setTableHeader((oldData) => [...oldData, constants.collectedcount]);
    setTableKey((oldData) => [...oldData, ConstKey.collectionCount]);
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

  const createPDF = async (data, buttonname) => {
    if (await isPermitted()) {
      const test = data;
      const annexurename = `${ref_number}`;
      let options = {
        html: test,

        fileName: annexurename + "-" + buttonname,
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
    if (replenishment_status !== null) {
      flatListData.map((ele) => {
        ele.replenish_count = ele.replenished_count;
      });
    }
    let data = {
      ref_number: ref_number,
      items:
        replenishment_status == null ? confirmCollectedCount : flatListData,
    };
    getpdfApi(endUrl?.annexureB, data, "Disposal Certificate");
    setEmailreplanishcertificateStatus(true);
  };
  const onreplanishemailcer = () => {
    setTableHeader((oldData) => [
      ...oldData,
      constants.Replenishment_Approved_item,
      constants.Replenishment_Reject_item,
    ]);

    setTableKey((oldData) => [
      ...oldData,
      ConstKey.Approved_Items,
      ConstKey.Rejected_Items,
    ]);
    if (replenishment_status !== null) {
      flatListData.map((ele) => {
        ele.replenish_count = ele.replenished_count;
        ele.repair_count = ele.repaired_count;
      });
    }
    let data = {
      ref_number: ref_number,
      items:
        replenishment_status == null ? confirmCollectedCount : flatListData,
    };
    getpdfApi(endUrl?.annexureC, data, "Replenishment Request Form");
    setStatusOFEmailreplanishcertificateStatus(true);
  };

  const uploadSignedreplanishment = async (result) => {
    setmodalloader(true);
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
    body.append(ConstKey.ref_number, ref_number);

    body.append(
      "accept_array",
      JSON.stringify(
        confirmCollectedCount == [] ? flatListData : confirmCollectedCount
      )
    );

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
          setmodalloader(false);
          setMainMsg(res?.message);
          setcheckboxStatusreplanish(true);
        } else {
          setmodalloader(false);
          ErrorApi(res, "collection");
        }
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
    if (taskofPage == constants.Status_pendingDilver) {
      flatListData.map((ele) => {
        ele.deliver_count = ele.delivered_count;
      });
    }

    let data = {
      ref_number: ref_number,
      items:
        taskofPage == constants.Status_pendingDilver
          ? flatListData
          : confirmCollectedCount,
    };

    getpdfApi(endUrl?.annexureD, data, "Delivery Note");
    setuploadPrintDilveryStatus(true);
  };

  const printPickupbutpress = () => {
    setLoader(true);
    setPhotoSection(true);
    let data = {
      ref_number: ref_number,
    };
    getpdfApi(endUrl?.annexure, data, "Pickup Slip");
  };
  const askPermission = (data, buttonname) => {
    async function requestExternalWritePermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Pdf creator needs External Storage Write Permission",
            message: "Pdf creator needs access to Storage data in your SD Card",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED)
          createPDF(data, buttonname);
        else alert("WRITE_EXTERNAL_STORAGE permission denied");
      } catch (err) {
        alert("Write permission err", err);
      }
    }
    if (Platform.OS === "android") requestExternalWritePermission();
    else createPDF(data, buttonname);
  };

  const getpdfApi = (annexure, data, buttonname) => {
    axios
      .post(annexure, data)
      .then((res) => {
        askPermission(res?.data, buttonname);
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
    const title = ScreenTitle.Furniture_Replacement_Process;
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
            taskName={onetaskSection}
            taskNameButoonValue={
              permissionId.acceptButton ? taskNameButoonValue : null
            }
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
              org={plusSign == true ? "" : schooldetails?.organization}
              stockcollectionName={constants.schoolFurCount}
              stockcount={
                schooldetails?.organization == constants.school
                  ? totalFur
                  : total_furniture
              }
              onvalueEdit={(val) => onvalueEdit(val)}
              totalFur={totalFur}
              task={constants.ManageReqText}
            />
            {plusSign == false ? (
              <View style={styles.addplusView}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(Screen.Add_Request_Fur, {
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
                  style={styles.buttonStyle}
                >
                  <Text style={styles.buttonText}>
                    {constants.addbrokenfuritem}
                  </Text>
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

          {flatListData == undefined ? (
            <>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <ListHeader
                  tableHeader={tableHeader}
                  lenofContent={lenofContent}
                />
              </ScrollView>
              <View style={styles.noDataView}>
                <Text style={styles.noDataText}>
                  {constants.Broken_Item_Not_Added}
                </Text>
              </View>
            </>
          ) : (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <FlatList
                ListHeaderComponent={HeaderComponent}
                data={flatListData}
                keyExtractor={(item) => item?.id}
                renderItem={renderComponent}
                showsVerticalScrollIndicator={false}
              />
            </ScrollView>
          )}
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
              disableUpload={
                replenishment_status == 2 || replenishment_status == 3
                  ? false
                  : disableUploadcpy
              }
            />
          ) : null}
          {errorMessage ? (
            <Text style={styles.errorStyle}>
              {errorMessage ? errorMessage : ""}
            </Text>
          ) : (
            <>
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
                  onifSchool={
                    schooldetails?.organization == constants.school
                      ? false
                      : true
                  }
                />
              ) : null}
            </>
          )}
          <View style={{ height: 60 }} />
        </KeyboardAvoidingView>
      </ScrollView>

      <View style={styles.bottomView}>
        {footerSign == false ? (
          <FooterFur
            saveButton={saveButton}
            submitButton={submitButton}
            onCancel={onCancel}
            onSave={onSave}
            onSubmit={onSubmit}
          />
        ) : null}
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
      {modalloader ? <ModalLoader visible={modalloader} /> : null}
    </SafeAreaView>
  );
};
