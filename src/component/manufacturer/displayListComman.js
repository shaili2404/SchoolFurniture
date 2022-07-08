import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
  PermissionsAndroid,
} from "react-native";
import { AlertMessage } from "../../Alert/alert";
import COLORS from "../../asset/color";
import Images from "../../asset/images";
import constants from "../../locales/constants";
import axios from "axios";
import { AddUserModal } from "./AddFormModal/AddFormModal";
import { useNavigation } from "@react-navigation/native";
import Fonts from "../../asset/Fonts";
import { RFValue } from "react-native-responsive-fontsize";
import { STANDARD_SCREEN_SIZE } from "../../utils/constants";
import { RfH, RfW } from "../../utils/helpers";
import Loader from "../loader";
import RNFetchBlob from "rn-fetch-blob";

export const DataDisplayList = ({
  item,
  tableKey,
  reloadList,
  onEdit,
  link,
  mainMessage,
  submessage,
  data,
  schoolDataList,
  permissionId,
  page,
  List,
}) => {
  const [userModal, setUserModal] = useState(false);
  const [alert, setAlert] = useState(false);
  const [address1, setAddress1] = useState("");
  const [level, setLevel] =
    item?.level_id == 1
      ? useState("P")
      : item?.level_id == 2
      ? useState("S")
      : useState("C");
  const [errorMsg, setErrorMsg] = useState(false);
  const [mainMsg, setMainMsg] = useState("");
  const [subMsg, setSubMsg] = useState("");
  const navigation = useNavigation();
  const [collectionImages, setcollectionImages] = useState([]);
  const [imageModal, setimageModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageData, setImageData] = useState([]);
  const [task, setTask] = useState("");

  const onDelete = () => {
    setAlert(true);
  };

  useEffect(() => {
    let address;
    let addressone = item.address1 === null ? "" : item.address1;
    let addresstwo = item.address2 === null ? "" : item.address2;
    let addressthree = item.address3 === null ? "" : item.address3;
    let addressfour = item.address4 === null ? "" : item.address4;
    let streetcode = item.street_code === null ? "" : item.street_code;
    tableKey.map((val) => {
      if (val === "address1") {
        address = `${addressone}${addresstwo}${addressthree}${addressfour}${streetcode}`;
      }
    });
    setAddress1(address);
  }, []);

  const onPressYes = async () => {
    setAlert(false);
    try {
      const response = await axios.delete(`${link}/${item.id}`);
      if (response.status === 200) reloadList();
      else reloadList();
    } catch (e) {
      setMainMsg(e?.response?.data?.message);
      setSubMsg(e?.response?.data?.data);
      setErrorMsg(true);
    }
  };

  const checkPermission = async () => {
    if (Platform.OS === "ios") {
      downloadFile();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage Permission Required",
            message:
              "Application needs access to your storage to download File",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          downloadFile();
        } else {
          Alert.alert("Error", "Storage Permission Not Granted");
        }
      } catch (err) {}
    }
  };
  const downloadFile = () => {
    let date = new Date();
    let FILE_URL = imageData;
    let file_ext = getFileExtention(FILE_URL);
    let Ref_No = item.ref_number;

    file_ext = "." + file_ext[0];
    const { config, fs } = RNFetchBlob;
    let RootDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir +
            // "/proof_" +
            task +
          // Math.floor(date.getTime() + date.getSeconds() / 2) +
          Ref_No +
          file_ext,
        description: "downloading file...",
        notification: true,
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch("GET", FILE_URL)
      .then((res) => {
        Alert.alert("File Downloaded Successfully.");
      });
  };

  const getFileExtention = (imageData) => {
    return /[.]/.exec(imageData) ? /[^.]+$/.exec(imageData) : undefined;
  };

  const rendercomponent = ({ item }) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            setImageData(item.path);
            setModalVisible(true);
          }}
        >
          <View>
            {item?.path ? (
              <Image
                resizeMode="cover"
                style={Styles.GalleryImage}
                source={{
                  uri: item.path,
                }}
              />
            ) : (
              <View
                style={Styles.GalleryImage}
              >
                <Loader />
              </View>
            )}
          </View>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={Styles.centeredView}>
            <View style={Styles.modalView}>
              {imageData ? (
                <Image
                  resizeMode="contain"
                  style={Styles.ModalImage}
                  source={{
                    uri: imageData,
                  }}
                />
              ) : (
                <View
                  style={Styles.ModalImgView}
                >
                  <Loader />
                </View>
              )}
              <TouchableOpacity
                style={Styles.butto}
                onPress={() => checkPermission()}
              >
                <Text style={Styles.text}>{constants.Download_File}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ bottom: 90 }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setimageModal(true);
                }}
              >
                <Text
                  style={Styles.ModalImgText}
                >
                  {constants.Modal_Close}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </>
    );
  };
  const onPreview = (item) => {
    setcollectionImages(item?.evidence_images);
    setimageModal(true);
    setTask("/collection_proof_");
  };

  const onPreviewDisposal = (item) => {
    setcollectionImages(item?.disposal_images);
    setimageModal(true);
    setTask("/disposal_proof_");
  };

  return (
    <SafeAreaView style={Styles.firstView}>
      {data == "0" ? (
        <View style={Styles.mainView}>
          {tableKey.map((val, index) => (
            <TouchableOpacity
              onPress={() => schoolDataList(item, constants.Edit)}
              key={index}
            >
              <View key={val} style={Styles.viewStyle}>
                <Text style={Styles.textStyle}>{item[val]}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={Styles.mainView}>
          {tableKey.map((val, index) => (
            <View
              key={val}
              style={List === "screen" ? Styles.screenStyle : Styles.viewStyle}
            >
              {val === "level_id" && page === constants.School ? (
                <Text style={Styles.textStyle} numberOfLines={1}>
                  {level}
                </Text>
              ) : (
                <>
                  {val == "evidence_images" ||
                      val == "disposal_images" ? (
                    <>
                      {item?.evidence_images[0]?.path == undefined || item.disposal_images[0]?.path == undefined  ? (
                        <Text style={Styles.textStyle}>{"NA"}</Text>
                      ) : (
                        <TouchableOpacity
                          style={Styles.downloadButton}
                          onPress={() => val == "evidence_images" ? onPreview(item): onPreviewDisposal(item) }
                        >
                          <Text style={Styles.searchText}>
                            {constants.preview}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </>
                  ) : (
                    <>
                      {val == "replenishment_proof" ||
                      val == "delivery_note" ? (
                        <>
                          {item[val] == "NA" ? (
                            <Text style={Styles.textStyle}>{item[val]}</Text>
                          ) : (
                            <TouchableOpacity
                              style={Styles.downloadButton}
                              onPress={() => {
                                checkPermission();
                                setImageData(
                                  val == "replenishment_proof"
                                    ? item?.replenishment_proof?.path
                                    : item?.delivery_note?.path
                                );
                              }}
                            >
                              <Text style={Styles.searchText}>
                                {constants.download}
                              </Text>
                            </TouchableOpacity>
                          )}
                        </>
                      ) : (
                        <Text style={Styles.textStyle}>{item[val]}</Text>
                      )}
                    </>
                  )}
                </>
              )}
            </View>
          ))}

          {permissionId.userEdit && (
            <View style={Styles.viewsssStyle}>
              <TouchableOpacity onPress={() => onEdit(item, constants.Edit)}>
                <Image source={Images.editIcon} />
              </TouchableOpacity>
            </View>
          )}
          {permissionId.userDelete && (
            <View style={Styles.viewsssStyle}>
              <TouchableOpacity onPress={() => onDelete(item)}>
                <Image source={Images.deleteIcon} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {userModal ? (
        <AddUserModal
          visible={userModal}
          setmodalVisible={(val) => setUserModal(val)}
          data={item}
          name={`${constants.Edit} ${constants.School} `}
          buttonVal={constants.update}
        />
      ) : null}

      {alert ? (
        <AlertMessage
          visible={alert}
          setmodalVisible={(val) => setAlert(val)}
          mainMessage={mainMessage ? mainMessage : ""}
          subMessage={submessage ? submessage : ""}
          type={constants.dropdown_Type}
          onConfirm={() => onPressYes()}
        />
      ) : null}
      {errorMsg ? (
        <AlertMessage
          visible={errorMsg}
          setmodalVisible={(val) => setErrorMsg(val)}
          mainMessage={mainMsg}
          subMessage={subMsg}
        />
      ) : null}

      <Modal animationType="slide" visible={imageModal} transparent={true}>
        <SafeAreaView style={Styles.Container}>
          <View style={Styles.crossImg}>
            <Text style={Styles.textIcon}>Evidence proof images</Text>

            <TouchableOpacity
              style={Styles.crossIcon}
              onPress={() => setimageModal(false)}
            >
              <Image source={Images.closeimage} />
            </TouchableOpacity>
          </View>
          <View style={Styles.modalStyle}>
            <FlatList
              keyExtractor={(item) => item.id}
              data={collectionImages}
              renderItem={rendercomponent}
              numColumns={2}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  textStyle: {
    fontFamily: Fonts.regular,
    fontSize: RFValue(14, STANDARD_SCREEN_SIZE),
    color: COLORS.Black,
    textAlign: "left",
    textAlignVertical: "center",
  },
  mainView: {
    flexDirection: "row",
    width: "100%",
    // height: RfH(50),
  },
  firstView: {
    backgroundColor: COLORS.LightGreen,
    // height: RfH(56),
    borderBottomColor: COLORS.Black,
    borderBottomWidth: 0.4,
  },
  viewStyle: {
    width: RfW(110),
    marginVertical: RfH(10),
    marginHorizontal: 5,
  },
  viewsssStyle: {
    width: 20,
    marginTop: 12,
    marginHorizontal: 10,
  },
  screenStyle: {
    width: RfW(170),
    marginHorizontal:  20,
    justifyContent: "center",
     height: RfH(50),
  },
  downloadButton: {
    backgroundColor: COLORS.GreenBox,
    borderRadius: 5,
    width: 90,
    height: 30,
    justifyContent: "center",
  },
  searchText: {
    color: COLORS.White,
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "normal",
    fontSize: 16,
  },
  modalStyle: {
    height: "85%",
    margin: 10,
  },
  Container: {
    height: "100%",
    // marginTop: 150,
    backgroundColor: COLORS.White,
    borderWidth: 1,
    borderColor: COLORS.LinearGreen1,
  },
  crossImg: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  textIcon: {
    fontSize:RFValue(18, STANDARD_SCREEN_SIZE),
    fontFamily:Fonts.bold,
    color:COLORS.ThemeGreen
  },
  crossIcon: {
    marginTop: 7,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    height: "100%",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
  },
  butto: {
    width: "80%",
    backgroundColor: COLORS.ThemeGreen,
    bottom: 120,
  },
  text: {
    color: COLORS.White,
    fontSize: 20,
    textAlign: "center",
    padding: 5,
  },
  GalleryImage: {
    width: 170, 
    height: 170, 
    margin: 10 
  },
  ModalImage: {
    height: "100%", 
    width: 370
  },
  ModalImgView: {
    width: 180,
    height: 180,
    margin: 2,
    borderRadius: 20,
  },
  ModalImgText: {
    color: COLORS.blue,
    fontSize: 18,
    textDecorationLine: "underline",
  },
});
