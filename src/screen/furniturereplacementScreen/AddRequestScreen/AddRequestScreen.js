import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import COLORS from "../../../asset/color";
import Images from "../../../asset/images";
import Dropdown from "../../../component/DropDown/dropdown";
import Loader from "../../../component/loader";
import constants from "../../../locales/constants";
import endUrl from "../../../redux/configration/endUrl";
import style from "./style";

export const AddFurRequestScreen = () => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(true);
  const [dataList, setDataList] = useState([]);
  const [categoryItemList, setcategoryItemList] = useState([]);
  const [finalList, setFinalList] = useState([]);
  const route = useRoute();
  const [way, setWay] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [prevData, setPrevData] = useState([]);
  const [count, setCount] = useState("");
  const [item_fullCount, setitem_fullCount] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const getCategoriesList = () => {
    setLoader(true);
    axios
      .get(`${endUrl.stockCategoryList}?all==true`)
      .then((res) => {
        setDataList(res?.data?.data?.records);
        setLoader(false);
      })
      .catch((e) => {
        setLoader(false);
      });
  };
  const getStockList = (id) => {
    axios
      .get(`${endUrl.categoryWiseItem}/${id}/edit`)
      .then((res) => {
        setcategoryItemList(res?.data?.data);
      })
      .catch((e) => {
        setLoader(false);
      });
  };

  
  useEffect(() => {
    if (route?.params?.task) {
      const { task, item, flatListData } = route?.params;
      setLoader(true);
      getStockList(item?.category_id, item);
      setWay(task);
      setSelectedItem(item);
      setEditItem(item);
      setPrevData(flatListData);
      setLoader(false);
    } else {
      getCategoriesList();
      setPrevData(route?.params?.flatListData);
    }
  }, [route]);

  const setCategoryValue = (item) => {
    getStockList(item?.id);
  };

  const setEditItem = (item) => {
    let obj = {};
    obj.category_id = item.category_id;
    obj.category_name = item.category_name;
    obj.item_name = item.item_name;
    obj.item_id = item.item_id;
    obj.count = item.count;
    obj.item_full_count = item.item_full_count;
    setFinalList([obj]);
  };

  const setItemValue = (item, task) => {
    let obj = {};
    obj.category_id = item.category_id;
    obj.category_name = item.category_name;
    obj.item_name = task == constants.Edit ? item.item_name : item.name;
    obj.item_id = task == constants.Edit ? item.item_id : item.id;
    obj.count = task == constants.Edit ? item.count : 1;

    if (way == constants.Edit) {
      finalList.find(function (post, index) {
        if (post.category_id == obj.category_id) setFinalList([obj]);
      });
    }

    var found = finalList.find(function (post, index) {
      if (post.item_id == obj.item_id) return true;
    });

    if (found == undefined && way !== constants.Edit)
      setFinalList((prevState) => [...prevState, obj]);
    else if (found !== undefined && way !== constants.Edit) {
      found.count += 1;
      setFinalList((prevState) => [...prevState]);
    }
  };

  const setQuantity = (item, value) => {
    let arr = [...finalList];
    let count;
    count = value == "Sub" ? (item.count -= 1) : (item.count += 1);
    arr.map((obj) => {
      return {
        ...obj,
        count: count,
      };
    });
    setFinalList(arr);
  };
  const onchangefurcount = (val, item, task) => {
    const value = item.item_full_count;
    if (way == constants.Edit) {
      finalList.filter((element) => {
        if (element.item_id == item?.item_id) {
          element.item_full_count = val;
        }
      });
    } else {
      if (task == constants.nextText) {
        finalList.filter((element) => {
          if (element.item_id == item?.item_id) {
            element.item_full_count = val;
          }
        });
        setCount(val);
      } else if (task == constants.add) {
        item.item_full_count = item.item_full_count += 1;
        setCount(item.item_full_count);
      } else if (task == "Sub") {
        item.item_full_count = item.item_full_count -= 1;
        setCount(item.item_full_count);
      }
    }
  };

  const practiceFunction = (val, task, item) => {
    if (task == constants.add) {
      const plusValue = (val += 1);

      setitem_fullCount(parseInt(plusValue));
    } else if (task == constants.nextText) {
      setitem_fullCount(parseInt(val));
    } else if (task == "Sub") {
      const minusValue = (val -= 1);
      setitem_fullCount(minusValue);
    }

    finalList.filter((element) => {
      if (element.item_id == item?.item_id) {
        element.item_full_count = item_fullCount;
      }
    });
  };

  const rendercomponent = ({ item }) => {
    setCount(item.item_full_count);
    return (
      <View style={style.listView}>
        <View style={{ width: 90 }}>
          <Text style={style.NewStyle}>{item.item_name}</Text>
        </View>
        <View>
          {way == constants.Edit ? (
            <TextInput
              style={style.emailInputStyle}
              placeholderTextColor={COLORS.Black}
              value={count}
              onChangeText={(count) => onchangefurcount(count, item)}
            />
          ) : (
            //     <View style={style.qutView}>
            //       <TouchableOpacity
            //         disabled={count == 1 ? true : false}
            //         style={style.minusButton}
            //         onPress={() => onchangefurcount(count, item, "Sub")}
            //       >
            //         <Image source={Images.MinusIcon} />
            //       </TouchableOpacity>
            //       <TextInput
            //         style={style.emailInputStyle}
            //         placeholderTextColor={COLORS.Black}
            //         value={count}
            //         onChangeText={(count) =>
            //           onchangefurcount(count, item, constants.nextText)
            //         }
            //       />
            //       <TouchableOpacity
            //         style={style.plusButton}
            //         onPress={() => onchangefurcount(count, item, constants.add)}
            //       >
            //         <Image source={Images.PlusIcon} />
            //       </TouchableOpacity>
            //     </View>
            //   )}
            // </View>
            <View style={style.qutView}>
              <TouchableOpacity
                disabled={item_fullCount == 1 ? true : false}
                style={style.minusButton}
                onPress={() => practiceFunction(item_fullCount, "Sub", item)}
              >
                <Image source={Images.MinusIcon} />
              </TouchableOpacity>
              <TextInput
                style={style.emailInputStyle}
                placeholderTextColor={COLORS.Black}
                // value={String(item_fullCount)}
                value={item.item_fullCount}
                onChangeText={(val) =>
                  practiceFunction(val, constants.nextText, item)
                }
                keyboardType={"numeric"}
              />
              <TouchableOpacity
                style={style.plusButton}
                onPress={() =>
                  practiceFunction(item_fullCount, constants.add, item)
                }
              >
                <Image source={Images.PlusIcon} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={style.qutView}>
          <TouchableOpacity
            disabled={item.count == 1 ? true : false}
            style={style.minusButton}
            onPress={() => setQuantity(item, "Sub")}
          >
            <Image source={Images.MinusIcon} />
          </TouchableOpacity>
          <Text style={style.qutStyle}>{item.count}</Text>
          <TouchableOpacity
            style={style.plusButton}
            onPress={() => setQuantity(item, constants.add)}
          >
            <Image source={Images.PlusIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const onPressNext = () => {
    const isGreaterThanZero = finalList?.every(
      (ele) => ele?.item_full_count > 0 && ele?.item_full_count >= ele.count
    );
    if (isGreaterThanZero) {
      setErrorMessage("");
      if (way !== constants.Edit) {
        if (prevData && prevData.length > 0) {
          const newArr = [...prevData, ...finalList];
          let map = new Map();
          newArr.forEach((eachObj) => map.set(eachObj.item_id, eachObj));
          const uniqueArr = Array.from(map.values());

          if (route?.params?.screen) {
            uniqueArr.forEach((item) => {
              item.collection_req_id = prevData[0].collection_req_id;
              if (item.id) {
              } else {
                item.id = "new-item";
              }
            });
          }

          navigation.navigate("FurnitureReplacmentProcess", {
            finalList: uniqueArr,
            screen: route?.params?.screen,
            id: route?.params?.id,
          });
        } else {
          navigation.navigate("FurnitureReplacmentProcess", {
            finalList: finalList,
            screen: route?.params?.screen,
            id: route?.params?.id,
          });
        }
      } else {
        prevData.find(function (post, index) {
          if (post?.item_id == selectedItem?.item_id) {
            post.category_id = finalList[0].category_id;
            post.category_name = finalList[0].category_name;
            post.item_name = finalList[0].item_name;
            post.item_id = finalList[0].item_id;
            post.count = finalList[0].count;
            post.item_full_count = finalList[0].item_full_count;
          }
        });

        navigation.navigate("FurnitureReplacmentProcess", {
          finalList: prevData,
          screen: route?.params?.screen,
          id: route?.params?.id,
        });
      }
    } else {
      const greaterNumber = finalList?.every(
        (ele) => ele?.item_full_count >= ele.count
      );
      const isZero = finalList?.every((ele) => ele?.item_full_count > 0);
      let str = "";
      greaterNumber ? "" : (str += `${constants.Greater_full_count},`);
      isZero ? "" : (str += `${constants.enter_full_count},`);
      setErrorMessage(str);
    }
  };

  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={style.mainView}>
      <View style={style.subview}>
        <Text style={style.createNewStyle}>
          {way == constants.Edit ? constants.Editreq : constants.createNewReq}
        </Text>
        <TouchableOpacity
          style={style.crossImg}
          onPress={() => {
            way == constants.Edit
              ? navigation.navigate("FurnitureReplacmentProcess", {
                  finalList: finalList,
                })
              : navigation.navigate("FurnitureReplacmentProcess");
          }}
        >
          <Image source={Images.closeimage} />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.container}>
          <Dropdown
            label={
              way == constants.Edit
                ? finalList[0]?.category_name
                : constants.FurCategory
            }
            data={
              way == constants.Edit ? finalList[0]?.category_name : dataList
            }
            onSelect={setCategoryValue}
            task="name"
            way={way}
            identify="dropdownA"
          />
        </View>
        <View style={style.container}>
          <Dropdown
            label={
              way == constants.Edit
                ? finalList[0]?.item_name
                : constants.furItem
            }
            data={categoryItemList}
            onSelect={setItemValue}
            task="name"
            way={way}
            identify="dropdownB"
            selectedItem={selectedItem?.item_id}
          />
        </View>

        <View style={style.headerView}>
          <View style={style.subHeaderView}>
            <Text style={style.headerText}>{constants.Furnitureitems}</Text>
          </View>
          <View style={style.subHeaderView}>
            <Text style={style.headerText}>
              {constants.furniture_full_count}
            </Text>
          </View>
          <View style={style.subHeaderView}>
            <Text style={style.headerText}>
              {constants.BrokenFurnitureCount}
            </Text>
          </View>
        </View>

        <FlatList
          keyExtractor={(item) => item.id}
          data={finalList}
          renderItem={rendercomponent}
        />
        <Text style={style.errorStyle}>{errorMessage ? errorMessage : ""}</Text>
        <View style={{ height: 70 }} />
      </ScrollView>

      <View style={style.backContainer}>
        <TouchableOpacity onPress={onPressNext}>
          <LinearGradient
            colors={[COLORS.LinearBox, COLORS.GreenBox]}
            start={{ x: 1, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={style.buttonStyle}
          >
            <Text style={style.buttonText}>{constants.nextText}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
