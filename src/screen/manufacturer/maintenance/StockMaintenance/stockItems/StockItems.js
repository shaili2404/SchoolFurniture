import React, { useState } from "react";
import {
  SafeAreaView,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import COLORS from "../../../../../asset/color";
import Images from "../../../../../asset/images";
import Dropdown from "../../../../../component/DropDown/dropdown";
import { ListDataSTocks } from "../../../../../component/manufacturer/stockMaintenancce/ListDataStocks";
import { HeaderStocks } from "../../../../../component/manufacturer/stockMaintenancce/ListHeaderstock";
import constants from "../../../../../locales/constants";
import DummydataDropDown from "./DummyItems";
import style from "./style";

const tableHeader = [constants.categories, constants.Items, constants.manage];
const tableKey = ["id", "item"];

export const StockItems = () => {
  const renderComponent = ({ item }) => {
    return <ListDataSTocks item={item} tableKey={tableKey} />;
  };
  const [dList, setDList] = useState(DummydataDropDown);
  const [dataList, setDataList] = useState(DummydataDropDown);
  const [selected, setSelected] = useState({});
  const [defaultState, setDefaultState] = useState(false);

  const HeaderComponent = () => {
    return <HeaderStocks tableHeader={tableHeader} />;
  };

  return (
    <SafeAreaView style={style.mainView}>
      <View style={style.container}>
        <Dropdown
          label={constants.stockcategories}
          data={dList}
          onSelect={setSelected}
          task="item"
        />
      </View>
      <View>
        {defaultState === true ? (
          <View style={style.changeView}>
            <Text style={style.changeText}>{constants.stockitems}</Text>
          </View>
        ) : null}
        <View>
          <TextInput
            style={style.emailInputStyle}
            placeholder={defaultState === true ? " " : constants.stockitems}
            placeholderTextColor={COLORS.Black}
            onFocus={() => setDefaultState(true)}
            onBlur={() => setDefaultState(false)}
            opacity={defaultState === true ? 1 : 0.5}
          />
        </View>
      </View>
      <TouchableOpacity style={style.addStyling}>
        <LinearGradient
          colors={[COLORS.LinearGreen1, COLORS.LinearGreen2]}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={style.addButton}
        >
          <Text style={style.addText}>{constants.add}</Text>
        </LinearGradient>
      </TouchableOpacity>

      <View>
        {defaultState === true ? (
          <View style={style.changeView}>
            <Text style={style.changeText}>{constants.searchItem}</Text>
          </View>
        ) : null}
        <View style={style.searchBox}>
          <TextInput
            style={style.searchInputStyle}
            placeholder={defaultState === true ? " " : constants.searchItem}
            placeholderTextColor={COLORS.Black}
            onFocus={() => setDefaultState(true)}
            onBlur={() => setDefaultState(false)}
            opacity={defaultState === true ? 1 : 0.5}
          />
          <TouchableOpacity style={style.searchButton}>
            <Image source={Images.SearchIconWhite} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        ListHeaderComponent={HeaderComponent}
        style={style.listStyle}
        data={dataList}
        keyExtractor={(item) => item.id}
        renderItem={renderComponent}
      />
    </SafeAreaView>
  );
};
