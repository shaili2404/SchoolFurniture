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
  ScrollView,
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
import { useSelector } from "react-redux";
import CommonService from "../../../../../locales/service";
import ConstKey from "../../../../../locales/ApikeyConst";

const tableHeader = [constants.categories, constants.Items, constants.manage];

export const StockItems = () => {
  const [categoryList, setcategoryList] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [selected, setSelected] = useState({});
  const [defaultState, setDefaultState] = useState(false);
  const [editState, setEditState] = useState(false);
  const [stockCategoryName, setStockCategoryName] = useState("");
  const [defaultStockCategory, setDefaultStockCategory] = useState("");
  const [loader, setLoader] = useState(true);
  const tableKey = [ConstKey.category_name, ConstKey.name];
  const [errorMessage, setErrorMessage] = useState("");
  const [searchtask, setSearchTask] = useState("");
  const [alert, setAlert] = useState(false);
  const [taskfor, setTaskFor] = useState("");
  const [dropdata, setDropdowndata] = useState("");
  const [onEditName, setOnEditName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [maximumNumber, setmaximunNumber] = useState(0);
  const [number, setNumber] = useState(1);
  const loginData = useSelector((state) => state?.loginData);

  const [permissionId, setPermissionId] = useState({
    userCreate: false,
    userEdit: false,
    userDelete: false,
  });
  // get permission if user is able to view list
  useEffect(() => {
    const arr = loginData?.user?.data?.data?.permissions;
    const [userCreate, userEdit, userDlt] = CommonService.getPermission(
      arr,
      [18, 19, 20]
    );
    setPermissionId({
      userCreate: userCreate,
      userEdit: userEdit,
      userDelete: userDlt,
    });
  }, []);
  // get stock List
  useEffect(() => {
    getStockList();
  }, []);

  // get category list
  useEffect(() => {
    getCategoriesList();
  }, []);
  // if search task is empty call function again
  useEffect(() => {
    if (searchtask == "") {
      getStockList();
      setErrorMessage("");
      setLoader(false);
    }
  }, [searchtask]);
  // render component of flatlist
  const renderComponent = ({ item }) => {
    return (
      <DataDisplayList
        item={item}
        tableKey={tableKey}
        onEdit={(item, task) => onEdit(item, task)}
        link={endUrl.stockitemList}
        mainMessage={AlertText.deleteStock}
        reloadList={() => reloadList()}
        permissionId={permissionId}
      />
    );
  };
  // reload list if data is changed
  const reloadList = () => {
    getStockList();
  };
  // On Edit button Clicked
  const onEdit = (item, task) => {
    setTaskFor(task);
    setEditState(true);
    setDefaultStockCategory(item.name);
    setDropdowndata(item.category_name);
    setOnEditName(item);
  };
  // on Update function
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
        let { message, data, status } = e?.response?.data || {};
        setLoader(false);
        setAlert(true);
        {
          let str = "";
          status == 422
            ? Object.values(data).forEach((value) => {
                str += `  ${value}`;
                setSuccessMessage(str);
              })
            : setSuccessMessage(message);
        }
      });
  };
  // on Add Button Click to add stock item
  const onAdd = () => {
    let data = {
      name: stockCategoryName,
      category_id: selected.id,
    };
    setLoader(true);
    axios
      .post(`${endUrl.stockitemList}`, data)
      .then((res) => {
        getStockList();
        setLoader(false);
        setSelected({});
        setStockCategoryName("");
        setAlert(true);
        setSuccessMessage(res?.data?.message);
      })
      .catch((e) => {
        let { message, data, status } = e?.response?.data || {};
        setLoader(false);
        setAlert(true);
        {
          let str = "";
          status == 422
            ? Object.values(data).forEach((value) => {
                str += `  ${value}`;
                setSuccessMessage(str);
              })
            : setSuccessMessage(message);
        }
      });
  };
  // header component to flatlist
  const HeaderComponent = () => {
    return <ListHeaderComman tableHeader={tableHeader}  />;
  };
  // get data list
  const getCategoriesList = (count) => {
    axios
      .get(`${endUrl.stockCategoryList}?all==true`)
      .then((res) => {
        setDataList(res?.data?.data?.records);
      })
      .catch((e) => {});
  };
  // get stock categories list
  const getStockList = (count) => {
    setLoader(true);
    axios
      .get(`${endUrl.stockitemList}?page=${count ? count : number}`)
      .then((res) => {
        setcategoryList(res?.data?.data?.records);
        setmaximunNumber(res?.data?.data?.total_page);
        setLoader(false);
      })
      .catch((e) => {
        setLoader(false);
      });
  };
  // on search button clicked
  const onsearch = async () => {
    setLoader(true);
    axios
      .get(`${endUrl.stockItemSearch}${searchtask}`)
      .then((res) => {
        setcategoryList(res?.data?.data);
        setLoader(false);
      })
      .catch((e) => {
        {
          let { message, data, status } = e?.response?.data || {};
          setLoader(false);
          {
            let str = "";
            status == 422
              ? Object.values(data).forEach((value) => {
                  str += `  ${value}`;
                  setErrorMessage(str);
                })
              : setErrorMessage(message);
          }
        }
      });
  };

  // on Next button clicked
  const onNext = () => {
    let count = number + 1;
    setLoader(true);
    setNumber(number + 1);
    getStockList(count);
    setLoader(false);
  };
  // on previous button Clicked
  const onPrevious = () => {
    let count = number - 1;
    setLoader(true);
    setNumber(number - 1);
    getStockList(count);
    setLoader(false);
  };

  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={style.mainView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.container}>
          <Dropdown
            label={
              taskfor == constants.Edit ? dropdata : constants.stockCategory
            }
            data={dataList}
            onSelect={setSelected}
            task="name"
            way={taskfor == constants.Edit ? constants.Edit : null}
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
            {permissionId.userCreate && (
              <Text style={style.addText}>
                {editState === true ? constants.update : constants.add}
              </Text>
            )}
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
            data={categoryList.sort((a, b) =>
              a.category_name.localeCompare(b.category_name)
            )}
            keyExtractor={(item) => item.id}
            renderItem={renderComponent}
            showsVerticalScrollIndicator={false}
          />
        )}

        <View style={errorMessage ? style.lastssView : style.lastView}>
          <TouchableOpacity
            onPress={onPrevious}
            disabled={number == 1 ? true : false}
          >
            {number == 1 ? (
              <Image source={Images.leftarrow} />
            ) : (
              <Image source={Images.rightarrow} style={style.transformStyle} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onNext}
            disabled={number == maximumNumber ? true : false}
          >
            {number == maximumNumber ? (
              <Image source={Images.leftarrow} style={style.transformStyle} />
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
        <View style={{ height: 70 }} />
      </ScrollView>
    </SafeAreaView>
  );
};
