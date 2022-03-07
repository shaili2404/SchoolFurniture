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
import AlertText from "../../../../../Alert/AlertText";
import COLORS from "../../../../../asset/color";
import Images from "../../../../../asset/images";
import Dropdown from "../../../../../component/DropDown/dropdown";
import { DataDisplayList } from "../../../../../component/manufacturer/displayListComman";
import { ListHeaderComman } from "../../../../../component/manufacturer/ListHeaderComman";
import constants from "../../../../../locales/constants";
import DummydataDropDown from "./DummyItems";
import style from "./style";

const tableHeader = [constants.categories, constants.Items, constants.manage];
const tableKey = ["id", "item"];

export const StockItems = () => {
  const [dList, setDList] = useState(DummydataDropDown);
  const [dataList, setDataList] = useState(DummydataDropDown);
  const [selected, setSelected] = useState({});
  const [defaultState, setDefaultState] = useState(false);
  const [editState, setEditState] = useState(false);
  const [stockCategoryName, setStockCategoryName] = useState("");
  const [defaultStockCategory, setDefaultStockCategory] = useState("");

  const renderComponent = ({ item }) => {
    return (
      <DataDisplayList
        item={item}
        tableKey={tableKey}
        List="screen"
        mainMessage={AlertText.deleteStock}
        submessage={AlertText.UndoMessgae}
        onEdit={(item, task) => onEdit(item, task)}
      />
    );
  };

  const onEdit = ({ item, task }) => {
    setEditState(true);
    setDefaultStockCategory(item);
  };

  const onUpdate = () => {
    setEditState(false);
  };
  const onAdd = () => {};

  const HeaderComponent = () => {
    return <ListHeaderComman tableHeader={tableHeader} List="screen" />;
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
            value={
              editState === true ? defaultStockCategory : stockCategoryName
            }
          />
        </View>
      </View>
      <TouchableOpacity
        style={style.addStyling}
        onPress={editState === true ? onUpdate : onAdd}
      >
        <LinearGradient
          colors={[COLORS.LinearGreen1, COLORS.LinearGreen2]}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={style.addButton}
        >
          <Text style={style.addText}>
            {editState === true ? constants.update : constants.add}
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      <View style={style.boxDefault}>
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
