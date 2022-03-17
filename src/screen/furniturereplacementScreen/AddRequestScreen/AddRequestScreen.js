import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
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
  const [categoryList, setCategoryList] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [categoryItemList, setcategoryItemList] = useState([]);
  const [finalList, setFinalList] = useState([]);
  const route = useRoute();
  const [way, setWay] = useState("");
  const [editCategory, setEditCategory] = useState("");

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
  const getStockList = ({ id, item }) => {
    setLoader(true);
    axios
      .get(`${endUrl.categoryWiseItem}/${id}/edit`)
      .then((res) => {
        setcategoryItemList(res?.data?.data);
        setLoader(false);
      })
      .catch((e) => {
        setLoader(false);
        console.log(e?.response?.data?.message);
      });
  };

  useEffect(() => {
    if (route.params?.task) {
      setLoader(true);
      setWay("Edit");
      setEditCategory(route.params?.item);
      setLoader(false);
    } else {
      getCategoriesList();
    }
  }, [route]);

  const setCategoryValue = (item) => {
    getStockList(item);
  };

  const setItemValue = (item) => {
    setCategoryList((prevState) => [...prevState, item]);
    let obj = {};
    (obj.category_id = item.category_id),
      (obj.category_name = item.category_name),
      (obj.item_name = item.name),
      (obj.item_id = item.id),
      (obj.count = 1),
      setFinalList((prevState) => [...prevState, obj]);
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
          onPress={() => navigation.navigate("Furniture Replacment")}
        >
          <Image source={Images.closeimage} />
        </TouchableOpacity>
      </View>

      <View style={style.container}>
        <Dropdown
          label={
            way == "Edit" ? editCategory?.category_name : constants.FurCategory
          }
          data={dataList}
          onSelect={setCategoryValue}
          task="name"
          way={way}
        />
      </View>
      <View style={style.container}>
        <Dropdown
          label={way == "Edit" ? editCategory?.item_name : constants.furItem}
          data={categoryItemList}
          onSelect={setItemValue}
          task="name"
        />
      </View>
      <FlatList
        keyExtractor={(item) => item.id}
        data={finalList}
        renderItem={rendercomponent}
      />
      <View style={style.backContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("FurnitureReplacmentProcess", finalList)
          }
        >
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
