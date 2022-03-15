import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TextInput,
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
import Dummydata from "./dummyData";
import style from "./style";

export const AddFurRequestScreen = () => {
  const navigation = useNavigation();
  const [ItemList, SetItemList] = useState(Dummydata);
  const [Item, setItem] = useState({});
  const [selected, setSelected] = useState({});
  const [loader, setLoader] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [categoryItemList, setcategoryItemList] = useState([]);
  const [finalList, setFinalList] = useState([]);

  const getCategoriesList = () => {
    axios
      .get(`${endUrl.stockCategoryList}`)
      .then((res) => {
        setDataList(res?.data?.data);
      })
      .catch((e) => {});
  };
  const getStockList = ({ id, item }) => {
    axios
      .get(`${endUrl.categoryWiseItem}/${id}/edit`)
      .then((res) => {
        setcategoryItemList(res?.data?.data);
      })
      .catch((e) => {});
  };

  useEffect(() => {
    getCategoriesList();
  }, []);

  const setCategoryValue = (item) => {
    getStockList(item);
  };

  const setItemValue = (item) => {
    setCategoryList((prevState) => [...prevState, item]);
    // setFinalList((prevState) => [
    //   ...prevState,
    //   {
    //     category_id: item.category_id,
    //     category_name: item.category_name,
    //     item_name: item.name,
    //     item_id: item.id,
    //     count: 1,
    //   },
    // ]);
    // console.log(finalList);
  };

  const rendercomponent = ({ item }) => {
    return (
      <View style={style.listView}>
        <Text style={style.NewStyle}>{item.name}</Text>
        <View style={style.qutView}>
          <TouchableOpacity
            disabled={quantity == 1 ? true : false}
            style={style.minusButton}
            onPress={() => setQuantity(quantity - 1)}
          >
            <Image source={Images.MinusIcon} />
          </TouchableOpacity>
          <Text style={style.qutStyle}>{quantity}</Text>
          <TouchableOpacity
            style={style.plusButton}
            onPress={() => setQuantity(quantity + 1)}
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
        <Text style={style.createNewStyle}>{constants.createNewReq}</Text>
        <TouchableOpacity
          style={style.crossImg}
          onPress={() => navigation.navigate("Furniture Replacment")}
        >
          <Image source={Images.closeimage} />
        </TouchableOpacity>
      </View>

      <View style={style.container}>
        <Dropdown
          label={constants.FurCategory}
          data={dataList}
          onSelect={setCategoryValue}
          task="name"
        />
      </View>
      <View style={style.container}>
        <Dropdown
          label={constants.furItem}
          data={categoryItemList}
          onSelect={setItemValue}
          task="name"
        />
      </View>
      <FlatList
        keyExtractor={(item) => item.id}
        data={categoryList}
        renderItem={rendercomponent}
      />
      <View style={style.backContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("FurnitureReplacmentProcess")}
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
