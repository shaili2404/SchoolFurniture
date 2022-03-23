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
  const [dataList, setDataList] = useState([]);
  const [categoryItemList, setcategoryItemList] = useState([]);
  const [finalList, setFinalList] = useState([]);
  const route = useRoute();
  const [way, setWay] = useState("");

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
    console.log('43',id)
    // setLoader(true);
    axios
      .get(`${endUrl.categoryWiseItem}/${id}/edit`)
      .then((res) => {
        console.log('47',res?.data?.data)
        setcategoryItemList(res?.data?.data);
        // setLoader(false);
      })
      .catch((e) => {
        setLoader(false);
        console.log('53',e?.response?.data?.message);
      });
  };

  useEffect(() => {
   
    if (route?.params?.task) {
      const {task,item} = route?.params
      setLoader(true);
      setWay("Edit");
      getStockList(item?.category_id)
      setItemValue(item,task)
      setLoader(false);
    } else {
      getCategoriesList();
    }
  }, [route]);

  const setCategoryValue = (item) => {
    getStockList(item?.id); 
  };

  const setItemValue = (item,task) => {
    let obj = {};
    obj.category_id = item.category_id
      obj.category_name = item.category_name
      obj.item_name = item.name
      obj.item_id = item.id
      obj.count = task == 'Edit' ? item.count : 1

      var found = finalList.find(function (post, index) {
        if (post.item_id == obj.item_id)
          return true;
      });
  
      if (found == undefined) {
        if (task == 'Edit') {
          setFinalList([obj])
        } else {
          setFinalList((prevState) => [...prevState, obj])
        }
      } else {
        found.count += 1;
        setFinalList((prevState) => [...prevState])
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
            way == 'Edit'
              ? navigation.navigate("FurnitureReplacmentProcess")
              : navigation.navigate("Furniture Replacment");
          }}
        >
          <Image source={Images.closeimage} />
        </TouchableOpacity>
      </View>

      <View style={style.container}>
        <Dropdown
          label={
            way == "Edit" ? finalList?.category_name : constants.FurCategory
          }
          data={dataList}
          onSelect={setCategoryValue}
          task="name"
          way={way}
        />
      </View>
      <View style={style.container}>
        <Dropdown
          label={way == "Edit" ? finalList?.item_name : constants.furItem}
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
