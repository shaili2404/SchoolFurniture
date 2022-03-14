import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import COLORS from "../../../asset/color";
import Images from "../../../asset/images";
import Dropdown from "../../../component/DropDown/dropdown";
import Loader from "../../../component/loader";
import constants from "../../../locales/constants";
import Dummydata from "./dummyData";
import style from "./style";

export const AddFurRequestScreen = () => {
  const navigation = useNavigation()
  const [dataList, setDataList] = useState(Dummydata);
  const [ItemList, SetItemList] = useState(Dummydata);
  const [Item, setItem] = useState({});
  const [selected, setSelected] = useState({});
  const [loader, setLoader] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [data,setData] = useState([])
  

  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={style.mainView}>
      <View style={style.subview}>
        <Text style={style.createNewStyle}>{constants.createNewReq}</Text>
        <TouchableOpacity style={style.crossImg} onPress={()=>navigation.navigate('Furniture Replacment')}>
          <Image source={Images.closeimage} />
        </TouchableOpacity>
      </View>

      <View style={style.container}>
        <Dropdown
          label={constants.FurCategory}
          data={dataList}
          onSelect={setSelected}
          task="data"
        />
      </View>
      <View style={style.container}>
        <Dropdown
          label={constants.furItem}
          data={ItemList}
          onSelect={setItem}
          task="data"
        />
      </View>
      {Item.data ? (
        <View style={style.listView}>
          <Text style={style.NewStyle}>{Item.data}</Text>

          <View style={style.qutView}>
            <TouchableOpacity
              disabled={quantity == 0 ? true : false}
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
      ) : null}
      <View style={style.backContainer}>
        <TouchableOpacity>
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
