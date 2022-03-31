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

  const getCategoriesList = () => {
    setLoader(true);
    axios
      .get(`${endUrl.stockCategoryList}`)
      .then((res) => {
        setDataList(res?.data?.data);
        setLoader(false);
      })
      .catch((e) => {
        setLoader(false);
      });
  };
  const getStockList = (id) => {
    // setLoader(true);
    axios
      .get(`${endUrl.categoryWiseItem}/${id}/edit`)
      .then((res) => {
        setcategoryItemList(res?.data?.data);
        // setLoader(false);
      })
      .catch((e) => {
        setLoader(false);
        console.log(e?.response?.data?.message);
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
    setFinalList([obj]);
  };

  const setItemValue = (item, task) => {
    let obj = {};
    obj.category_id = item.category_id;
    obj.category_name = item.category_name;
    obj.item_name = task == "Edit" ? item.item_name : item.name;
    obj.item_id = task == "Edit" ? item.item_id : item.id;
    obj.count = task == "Edit" ? item.count : 1;

    if (way == "Edit") {
      finalList.find(function (post, index) {
        if (post.category_id == obj.category_id) {
          setFinalList([obj]);
        }
      });
    }

    var found = finalList.find(function (post, index) {
      if (post.item_id == obj.item_id) return true;
    });

    if (found == undefined && way !== "Edit") {
      setFinalList((prevState) => [...prevState, obj]);
    } else if (found !== undefined && way !== "Edit") {
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

  const rendercomponent = ({ item }) => {
    return (
      <View style={style.listView}>
        <Text style={style.NewStyle}>{item.item_name}</Text>
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
            onPress={() => setQuantity(item, "Add")}
          >
            <Image source={Images.PlusIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const onPressNext = () => {
    if (way !== "Edit") {
      if (prevData && prevData.length > 0) {
        const result1 = prevData.filter(
          ({ item_id: id1 }) =>
            !finalList.some(({ item_id: id2 }) => id2 === id1)
        );
        const result2 = finalList.filter(
          ({ item_id: id1 }) =>
            !prevData.some(({ item_id: id2 }) => id2 === id1)
        );
        const result3 = finalList.filter(({ item_id: id1 }) =>
          prevData.some(({ item_id: id2 }) => id2 === id1)
        );

        const newList = [...result1, ...result2, ...result3];

        navigation.navigate("FurnitureReplacmentProcess", {
          finalList: newList,
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
          console.log("176", post.item_id == selectedItem?.item_id);
          console.log("177", finalList);
          post.category_id = finalList[0].category_id;
          post.category_name = finalList[0].category_name;
          post.item_name = finalList[0].item_name;
          post.item_id = finalList[0].item_id;
          post.count = finalList[0].count;
        }
      });

      navigation.navigate("FurnitureReplacmentProcess", {
        finalList: prevData,
        screen: route?.params?.screen,
        id: route?.params?.id,
      });
    }
  };

  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={style.mainView}>
      <View style={style.subview}>
        <Text style={style.createNewStyle}>
          {way == "Edit" ? constants.Editreq : constants.createNewReq}
        </Text>
        <TouchableOpacity
          style={style.crossImg}
          onPress={() => {
            way == "Edit"
              ? navigation.navigate("FurnitureReplacmentProcess", prevData)
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
              way == "Edit"
                ? finalList[0]?.category_name
                : constants.FurCategory
            }
            data={way == "Edit" ? finalList[0]?.category_name : dataList}
            onSelect={setCategoryValue}
            task="name"
            way={way}
            identify="dropdownA"
          />
        </View>
        <View style={style.container}>
          <Dropdown
            label={way == "Edit" ? finalList[0]?.item_name : constants.furItem}
            data={categoryItemList}
            onSelect={setItemValue}
            task="name"
            way={way}
            identify="dropdownB"
            selectedItem={selectedItem?.item_id}
          />
        </View>
        <FlatList
          keyExtractor={(item) => item.id}
          data={finalList}
          renderItem={rendercomponent}
        />
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
