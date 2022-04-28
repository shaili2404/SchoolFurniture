import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView
} from "react-native";
import { useSelector } from "react-redux";
import Styles from "./Styles";
import Loader from "../../../../component/loader";
import Constants from "../../../../locales/constants";
import { ListHeaderComman } from "../../../../component/manufacturer/ListHeaderComman";
import { useNavigation } from "@react-navigation/core";
import { DataDisplayList } from "../../../../component/manufacturer/displayListComman";
import axios from "axios";
import endUrl from "../../../../redux/configration/endUrl";
import COLORS from "../../../../asset/color";
import Images from "../../../../asset/images";
import AlertText from "../../../../Alert/AlertText";
import { AlertMessage } from "../../../../Alert/alert";


// Current Data in List Per Page
const PAGESIZE = 4;

const StockCategory = () => {
  const [stockCategory, setStockCategory] = useState("");
  const [categoryListData, setCategoryListData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [defaultState, setDefaultState] = useState(false);
  const [editState, setEditState] = useState(false);
  const [defaultStockCategory, setDefaultStockCategory] = useState("");
  const [updateItem, setUpdateItem] = useState("");
  const [searchtask, setSearchTask] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const tableKey = ["name"];
  const navigation = useNavigation();
  const loginData = useSelector((state) => state?.loginData);
  const [maximumNumber,setmaximunNumber] = useState(0)
  const [number,setNumber] = useState(1)
  const [permissionId, setPermissionId] = useState({
    userCreate: false,
    userEdit: false,
    userDelete: false,
  });

  const tableHeader = [Constants.categories, Constants.manage];
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const arr = loginData?.user?.data?.data?.permissions
    let userCreate = false, userEdit = false, userDlt = false;
    arr.forEach((input) => {
      if (input.id === 18) {
        userCreate = true
      } if (input.id === 19) {
        userEdit = true
      } if (input.id === 20) {
        userDlt = true
      }
    })
    setPermissionId({
      userCreate: userCreate,
      userEdit: userEdit,
      userDelete: userDlt,
    })

  }, []);

  const HeaderComponent = () => {
    return <ListHeaderComman tableHeader={tableHeader} />;
  };

  const rendercomponent = ({ item }) => {
    return (
      <DataDisplayList
        item={item}
        tableKey={tableKey}
        reloadList={() => reloadList()}
        mainMessage={AlertText.deleteStockCategory}
        submessage={AlertText.UndoMessgae}
        onEdit={(item, task) => onEdit(item, task)}
        link={endUrl.stockCategoryList}
        permissionId={permissionId}
      />
    );
  };

  const reloadList = () => {
    categorylistapi();
  };

  // Edit Functionality
  const onEdit = (item, task) => {
    if (task == "Edit") {
      setEditState(true);
      setDefaultStockCategory(item.name);
      setUpdateItem(item);
    }
  };

  // List api call
  const categorylistapi = (count) => {
    setLoader(true);
    axios
      .get(`${endUrl.stockCategoryList}?page=${count? count : number}`)
      .then((res) => {
        setCategoryListData(res?.data?.data?.records);
        setmaximunNumber(res?.data?.data?.total_page)
        setLoader(false)
      })
      .catch((e) => {
        setLoader(false);
        console.log("apicall", e);
      });
  };

  useEffect(() => {
    categorylistapi();
  }, []);

  // Page Title
  useLayoutEffect(() => {
    const title = "Stock Maintenance";
    navigation.setOptions({ title });
  }, []);

  // Add and edit api call
  const onSubmitDetails = async () => {
    setLoader(true);
    let obj = {};
    editState ? (obj.name = defaultStockCategory) : (obj.name = stockCategory);
    axios.defaults.headers.common["Content-Type"] = "application/json";
    const service = editState
      ? axios.put(`${endUrl.stockCategoryList}/${updateItem.id}`, obj)
      : axios.post(`${endUrl.stockCategoryList}`, obj);
    service
      .then((res) => {
        setStockCategory("");
        setDefaultStockCategory("");
        categorylistapi();
        setAlert(true);
        setSuccessMessage(res?.data?.message);
        setLoader(false);
      })
      .catch((e) => 
        {
          let { message, data, status } = e?.response?.data || {};
          setLoader(false);
          setAlert(true)
          {
            let str = "";
            status == 422 ?
              Object.values(data).forEach((value) => {
                str += `  ${value}`;
                setSuccessMessage(str);
              }) :
              setSuccessMessage(message);
          }
        })
  };

  // Add Button Functionality
  const onAdd = () => {
    onSubmitDetails();
  };

  // Edit Button Functionality
  const onUpdate = () => {
    setEditState(false);
    onSubmitDetails();
  };

  // search api call for list
  const onsearch = () => {
    setLoader(true);
    axios
      .get(`${endUrl.stockCategorySearch}${searchtask}`)
      .then((res) => {
        setCategoryListData(res?.data?.data);
        setLoader(false);
      })
      .catch((e) => {
        {
          let { message, data, status } = e?.response?.data || {};
          setLoader(false);
          {
            let str = "";
            status == 422 ?
              Object.values(data).forEach((value) => {
                str += `  ${value}`;
                setErrorMessage(str);
              }) :
              setErrorMessage(message);
          }
        }
      });
  };

  useEffect(() => {
    if (searchtask == "") {
      categorylistapi();
      setErrorMessage("");
      setLoader(false);
    }
  }, [searchtask]);



  const onNext = () => {
    let count = number + 1
    setLoader(true)
    setNumber(number+1)
    categorylistapi(count)
    setLoader(false)
  };

  const onPrevious = () => {
    let count = number -1
    setLoader(true)
    setNumber(number-1)
    categorylistapi(count)
        setLoader(false)
  };

  return loader ? (
    <Loader />
  ) : (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={Styles.mainView}>
      <TextInput
        placeholder={Constants.StockCategories}
        style={Styles.inputTxtStyle}
        value={editState === true ? defaultStockCategory : stockCategory}
        onChangeText={(txt) =>
          editState === true
            ? setDefaultStockCategory(txt)
            : setStockCategory(txt)
        }
        maxLength={50}
      />
      {permissionId.userCreate && (
        <View style={Styles.buttonView}>
          <TouchableOpacity
            style={Styles.buttonStyle}
            onPress={editState === true ? onUpdate : onAdd}
          >
            <Text style={Styles.buttonText}>
              {editState === true ? Constants.update : Constants.add}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={Styles.boxDefault}>
        {defaultState === true ? (
          <View style={Styles.changeView}>
            <Text style={Styles.changeText}>{Constants.searchItem}</Text>
          </View>
        ) : null}
        <View style={Styles.searchBox}>
          <TextInput
            style={Styles.searchInputStyle}
            placeholder={defaultState === true ? " " : Constants.searchCategory}
            placeholderTextColor={COLORS.Black}
            value={searchtask}
            onChangeText={(val) => setSearchTask(val)}
            onFocus={() => setDefaultState(true)}
            onBlur={() => setDefaultState(false)}
            opacity={defaultState === true ? 1 : 0.5}
          />
          <TouchableOpacity
            style={Styles.searchButton}
            onPress={() => onsearch()}
          >
            <Image source={Images.SearchIconWhite} />
          </TouchableOpacity>
        </View>
      </View>
      {errorMessage ? (
        <View style={Styles.errorView}>
          <Text style={Styles.errormessStyle}>{errorMessage}</Text>
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={HeaderComponent}
          style={Styles.listStyle}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          data={categoryListData}
          renderItem={rendercomponent}
        />
      )}

<View style={Styles.lastView}>
        <TouchableOpacity onPress={onPrevious} disabled={number == 1 ? true  : false}>
          {number == 1 ? (
            <Image source={Images.leftarrow} />
          ) : (
            <Image
              source={Images.rightarrow}
              style={{ transform: [{ rotate: "180deg" }] }}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={onNext} disabled={number == maximumNumber ?  true :false}  >
          {number == maximumNumber? (
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
    </View>
    <View style={{ height: 20 }} />
    </ScrollView>
  );
};

export default StockCategory;

