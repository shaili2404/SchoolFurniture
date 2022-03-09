import axios from "axios";
import React, { useEffect, useState } from "react";
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
import { AlertMessage } from "../../../../../Alert/alert";
import AlertText from "../../../../../Alert/AlertText";
import COLORS from "../../../../../asset/color";
import Images from "../../../../../asset/images";
import Dropdown from "../../../../../component/DropDown/dropdown";
import Loader from "../../../../../component/loader";
import { DataDisplayList } from "../../../../../component/manufacturer/displayListComman";
import { ListHeaderComman } from "../../../../../component/manufacturer/ListHeaderComman";
import constants from "../../../../../locales/constants";
import endUrl from "../../../../../redux/configration/endUrl";
import style from "./style";

const tableHeader = [constants.categories, constants.Items, constants.manage];

const PAGESIZE = 4;
export const StockItems = () => {
  const [categoryList, setcategoryList] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [selected, setSelected] = useState({});
  const [defaultState, setDefaultState] = useState(false);
  const [editState, setEditState] = useState(false);
  const [stockCategoryName, setStockCategoryName] = useState("");
  const [defaultStockCategory, setDefaultStockCategory] = useState("");
  const [loader, setLoader] = useState(true);
  const tableKey = ["category_name", "name"];
  const [errorMessage, setErrorMessage] = useState("");
  const [searchtask, setSearchTask] = useState("");
  const [alert, setAlert] = useState(false);
  const [taskfor, setTaskFor] = useState("");
  const [dropdata, setDropdowndata] = useState("");
  const [onEditName, setOnEditName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPage: 0,
    startIndex: 0,
    endIndex: 0,
  });

  const renderComponent = ({ item }) => {
    return (
      <DataDisplayList
        item={item}
        tableKey={tableKey}
        List="screen"
        mainMessage={AlertText.deleteStock}
        submessage={AlertText.UndoMessgae}
        onEdit={(item, task) => onEdit(item, task)}
        link={endUrl.stockitemList}
        mainMessage={AlertText.deleteStock}
        submessage={AlertText.UndoMessgae}
        reloadList={() => reloadList()}
      />
    );
  };

  const reloadList = () => {
    getStockList();
  };

  const onEdit = (item, task) => {
    setTaskFor(task);
    setEditState(true);
    setDefaultStockCategory(item.name);
    setDropdowndata(item.category_name);
    setOnEditName(item);
  };

  const onUpdate = () => {
    setEditState(false);
    setTaskFor("");
    let data = {
      name: defaultStockCategory,
      category_id: onEditName.category_id,
    };
    setLoader(true);
    axios
      .put(`${endUrl.stockitemList}/${onEditName.id}`, data)
      .then((res) => {
        setAlert(true);
        getStockList();
        setLoader(false);
        setSelected({});
        setSuccessMessage(res?.data?.message);
        setStockCategoryName("");
      })
      .catch((e) => {
        setLoader(false);
      });
  };
  const onAdd = () => {
    let data = {
      name: stockCategoryName,
      category_id: selected.id,
    };
    setLoader(true);
    axios
      .post(`${endUrl.stockitemList}`, data)
      .then((res) => {
        setAlert(true);
        getStockList();
        setLoader(false);
        setSelected({});
        setStockCategoryName("");
        setSuccessMessage(res?.data?.message);
      })
      .catch((e) => {
        setLoader(false);
      });
  };

  const HeaderComponent = () => {
    return <ListHeaderComman tableHeader={tableHeader} List="screen" />;
  };

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

  const getStockList = () => {
    setLoader(true);
    axios
      .get(`${endUrl.stockitemList}`)
      .then((res) => {
        setcategoryList(res?.data?.data);
        initialPagination(res?.data?.data);
        setLoader(false);
      })
      .catch((e) => {
        setLoader(false);
      });
  };

  const onsearch = async () => {
    setLoader(true);
    axios
      .get(`${endUrl.stockItemSearch}${searchtask}`)
      .then((res) => {
        setcategoryList(res?.data?.data);
        initialPagination(res?.data?.data);
        setLoader(false);
      })
      .catch((e) => {
        let errorMsg = e?.response?.data?.message;
        setLoader(false);
        setErrorMessage(errorMsg);
      });
  };

  useEffect(() => {
    getStockList();
  }, []);
  useEffect(() => {
    getCategoriesList();
  }, []);

  useEffect(() => {
    if (searchtask == "") {
      getStockList();
      setErrorMessage("");
      setLoader(false);
    }
  }, [searchtask]);

  const initialPagination = (list) => {
    const len = list.length;
    const totalPage = Math.ceil(len / PAGESIZE);
    setPagination({
      currentPage: 1,
      totalPage: totalPage,
      startIndex: 0,
      endIndex: len > PAGESIZE ? PAGESIZE : len,
    });
  };

  const onNext = () => {
    setLoader(true);
    let { currentPage, totalPage } = pagination;
    if (currentPage === totalPage) {
      return;
    }
    setPagination((prevState) => {
      return {
        ...prevState,
        currentPage: currentPage + 1,
        startIndex: currentPage * PAGESIZE,
        endIndex:
          (currentPage + 1) * PAGESIZE > categoryList.length
            ? categoryList.length
            : (currentPage + 1) * PAGESIZE,
      };
    });
    setLoader(false);
  };

  const onPrevious = () => {
    setLoader(true);
    let { currentPage } = pagination;
    if (currentPage === 1) {
      return;
    }
    setPagination((prevState) => {
      return {
        ...prevState,
        currentPage: currentPage - 1,
        startIndex: (currentPage - 2) * PAGESIZE,
        endIndex: (currentPage - 1) * PAGESIZE,
      };
    });
    setLoader(false);
  };

  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={style.mainView}>
      <View style={style.container}>
        <Dropdown
          label={taskfor == "Edit" ? dropdata : constants.stockcategories}
          data={dataList}
          onSelect={setSelected}
          task="name"
          way={taskfor == "Edit" ? "Edit" : null}
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
            onChangeText={(value) =>
              editState === true
                ? setDefaultStockCategory(value)
                : setStockCategoryName(value)
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
            value={searchtask}
            onChangeText={(val) => setSearchTask(val)}
          />
          <TouchableOpacity style={style.searchButton} onPress={onsearch}>
            <Image source={Images.SearchIconWhite} />
          </TouchableOpacity>
        </View>
      </View>
      {errorMessage ? (
        <View style={style.errorView}>
          <Text style={style.errormessStyle}>{errorMessage}</Text>
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={HeaderComponent}
          style={style.listStyle}
          data={categoryList.slice(pagination.startIndex, pagination.endIndex)}
          keyExtractor={(item) => item.id}
          renderItem={renderComponent}
          showsVerticalScrollIndicator={false}
        />
      )}

      <View style={style.lastView}>
        <TouchableOpacity
          onPress={onPrevious}
          disabled={pagination.currentPage === 1 ? true : false}
        >
          {pagination.currentPage === 1 ? (
            <Image source={Images.leftarrow} />
          ) : (
            <Image
              source={Images.rightarrow}
              style={{ transform: [{ rotate: "180deg" }] }}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onNext}
          disabled={
            pagination.currentPage === pagination.totalPage ? true : false
          }
        >
          {pagination.currentPage === pagination.totalPage ? (
            <Image
              source={Images.leftarrow}
              style={{ transform: [{ rotate: "180deg" }] }}
            />
          ) : (
            <Image source={Images.rightarrow} />
          )}
        </TouchableOpacity>
      </View>

      {alert ? (
        <AlertMessage
          visible={alert}
          setmodalVisible={(val) => setAlert(val)}
          mainMessage={successMessage}
        />
      ) : null}
    </SafeAreaView>
  );
};
