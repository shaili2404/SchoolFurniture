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
  TouchableOpacity
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
  const [filePath, setFilePath] = useState("");
  const [annexure, setAnnexure] = useState(``);
  const [taskofPage, settaskOfPage] = useState("");
  const [imgData, setImgData] = useState([]);
  const [imgLen, setImgLen] = useState("");
  const [viewImage, setViewImage] = useState(false);
  const [confirmCollectedCount, setConfirmCollectedCount] = useState([]);

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
  const {
    school_name,
    emis,
    total_broken_items,
    broken_items,
    id,
    ref_number,
  } = organization == "School" ? "" : route?.params;

  const onSchool = () => {
    setCreateRequestIcon(constants.inprogress);
    setPermissionId({
      userCreate: true,
      userDelete: true,
      userEdit: true,
    });
    if (route?.params?.task == "MangeRequest") {
      setFlatListData(route?.params?.items?.broken_items);
    } else {
      setFlatListData(route?.params?.finalList);
    }
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
    console.log('119',tableKey,tableHeader)
    setLoader(false);
  };
  const onPendingRepair = () => {
    setCollectFurItem(constants.success);
    setRepairIcon(constants.inprogress);
    setTableHeader((oldData) => [...oldData, constants.collectedcount]);
    setTableHeader((oldData) => [...oldData, constants.ReparableItem]);
    setTableHeader((oldData) => [...oldData, constants.ReplanishmentItems]);
    setTableKey((oldData) => [...oldData, "collectionCount"]);
    setTableKey((oldData) => [...oldData, "reparableitem"]);
    setTableKey((oldData) => [...oldData, "replanishitem"]);
    setlenofContent("More");
    console.log('131',tableKey,tableHeader)
    setFlatListData(broken_items);
    setLoader(false);
  };

  useEffect(() => {
    const task = route?.params?.status;
    settaskOfPage(task);
    if (organization == "School") {
      onSchool();
    } else if (task == "Pending Collection") {
      onrequestList();
    } else if (task == "Collection Accepted") {
      onCollectionAccepted();
    } else if (task == "Pending Repairs") {
      onPendingRepair();
    }
  }, [tableHeader, isFocused]);

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
        onSubmitDetails={(data) => setConfirmCollectedCount(data)}
        pageStatus = {taskofPage}
      />
    );
  };

  const onEdit = (item, task) => {
    navigation.navigate("AddRequestFur", {
      item: item,
      task: task,
      flatListData: flatListData,
      screen:
        route?.params?.screen == "MangeRequest" ||
        route?.params?.task == "MangeRequest"
          ? "MangeRequest"
          : null,
      id:
        route?.params?.screen == "MangeRequest"
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
    if (organization == "School") {
      onschoolreqSubmit();
    }
    else if (taskofPage == "Pending Collection") {
      onSubmitcollectionRequest();
    } 
    else if (taskofPage == "Collection Accepted") {
      onSubmitcollectionRequest();
    }
  };

  const onSubmitcollectionRequest = async () => {
    setLoader(true);

    let obj = {};
    confirmCollectedCount.map((ele) => {
      obj[ele?.id] = ele?.confirm_count;
    });

    var photo = {
      uri: imgData[0].sourceURL,
      type: imgData[0].mime,
      name: imgData[0].filename,
  };
  console.log("photo",photo)

     const form = new FormData();
    form.append("images[]", photo);
    // {
    //   uri: imgData[0].sourceURL,
      
    //   type: imgData[0].mime,
    //   name: imgData[0].filename,
    // });
    form.append("confirm_count[1]", 2);
    form.append("ref_number", ref_number);
    // form.append('status',1)
    
    const url = 'https://furnitureapp.php-dev.in/api/user/furniture-collect'

    axios({
      url: url,
      method: 'POST',
      data: form,
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        // 'token':`eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZnVybml0dXJlYXBwLnBocC1kZXYuaW5cL2FwaVwvbG9naW4iLCJpYXQiOjE2NDkxNjY2NDYsImV4cCI6MTY0OTE3MDI0NiwibmJmIjoxNjQ5MTY2NjQ2LCJqdGkiOiJMQVROcTJsdXJuQ0JQZ3pmIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.B9iLdu56sqOPevazqY1jewAljzZrcNjr6e0qTSwwzx8`,
        // 'Host': 'furnitureapp.php-dev.in',
        // 'Content-Length': form.length
      },
    }).then((res) => {
      setLoader(false)
      console.log("response", res)
    }).catch((err) => {
      setLoader(false)
      console.log("error", err)
    })
// .then((res) => {
//   console.log('314',res)
//         // setSuccessAlert(true);
//         setLoader(false);
//         // setMainMsg(res?.data?.message);
//       })
//       .catch((error) => {
//         console.log('320',error)
//         setLoader(false)
//         // ErrorApi(e);
//       });
  };

  const onschoolreqSubmit = async () => {
    setLoader(true);
    const data = {
      total_furniture: totalFurCount,
      broken_items: flatListData,
    };
    console.log("301", route?.params?.screen, route?.params?.task);
    if (
      route?.params?.screen == "MangeRequest" ||
      route?.params?.task == "MangeRequest"
    ) {
      axios
        .put(
          `${endUrl.delManageRequest}/${
            route?.params?.screen == "MangeRequest"
              ? route?.params?.id
              : route?.params?.items?.id
          }`,
          data
        )
        .then((res) => {
          setSuccessAlert(true);
          setLoader(false);
          setMainMsg(res?.data?.message);
          console.log("232", res?.data?.message);
        })
        .catch((e) => {
          ErrorApi(e);
        });
    } else {
      axios
        .post(`${endUrl.addFurRequest}`, data)
        .then((res) => {
          setSuccessAlert(true);
          setLoader(false);
          setMainMsg(res?.data?.message);
        })
        .catch((e) => {
          ErrorApi(e);
        });
    }
  };

  const ErrorApi = (e) => {
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
  };

  const onConfirm = (imgData) => {
    console.log("imgdat",imgData)
    let len;
    setImgData(imgData);
    len = imgData.length > 10 ? "10+" : imgData.length
    if(len == 0){
      setPhotoSection(true);
    }else{
      setImgLen(len);
      setPhotoSection(false);
    }
    setImageModal(false);
    setViewImage(false)
  }

  const onPressDone = () => {
    seterrorAlert(false);
  };

  const onSuccessPressDone = () => {
    if (
      route?.params?.screen == "MangeRequest" ||
      route?.params?.task == "MangeRequest"
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
      .catch((e) => {
        ErrorApi(e);
      });
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
    } else {
      return true;
    }
  };

  const createPDF = async () => {
    if (await isPermitted()) {
      const test = `${annexure}`;
      let options = {
        html: test,

        fileName: "test",
        directory: "docs",
      };
      let file = await reactNativeHtmlToPdf.convert(options);
      console.log(file.filePath);
      setFilePath(file.filePath);
    }
  };

  const printPickupbutpress = () => {
    setLoader(true);
    setPhotoSection(true);

    axios
      .get(`${endUrl.annexure}?ref_number=${ref_number}`)
      .then((res) => {
        setAnnexure(res?.data);
        createPDF();
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
    const title = "Furniture Replacement";
    navigation.setOptions({ title });
  }, []);

  const onBack = () => {
    setViewImage(false);
  };

  useEffect(() => {
    confirmCollectedCount.length > 0 && imgData.length > 0
      ? setSaveButton(false)
      : setSaveButton(true);
  }, [confirmCollectedCount, imgData]);

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
              organization == "School"
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
                organization == "School" ? schooldetails?.name : school_name
              }
              emisnumber={constants.emisNumber}
              emisvalue={
                organization == "School" ? schooldetails?.username : emis
              }
              org={organization}
              stockcollectionName={constants.schoolFurCount}
              stockcount={total_broken_items}
              onvalueEdit={(val) => onvalueEdit(val)}
            />
            {organization == "School" ? (
              <View style={styles.addplusView}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("AddRequestFur", {
                      flatListData: flatListData,
                      screen:
                        route?.params?.screen == "MangeRequest" ||
                        route?.params?.task == "MangeRequest"
                          ? "MangeRequest"
                          : null,
                      id:
                        route?.params?.screen == "MangeRequest"
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

        {filePath ? <Text style={styles.textStyle}>{filePath}</Text> : null}

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <FlatList
              ListHeaderComponent={HeaderComponent}
              data={flatListData}
              keyExtractor={(item) => item?.id}
              renderItem={renderComponent}
              showsVerticalScrollIndicator={false}
            />
          </ScrollView>
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
