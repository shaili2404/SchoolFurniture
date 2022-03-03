import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Image, ScrollView, FlatList } from "react-native";
import Styles from "./Styles";
import constants from "../../../locales/constants";
import axios from "axios";
import { Baseurl } from "../../../redux/configration/baseurl";
import endUrl from "../../../redux/configration/endUrl";
import { useSelector } from "react-redux";
import { Token } from "../../../component/dummyData/Token";
import Loader from "../../../component/loader";
import { Picker } from "@react-native-picker/picker";
import { exportDefaultSpecifier } from "@babel/types";
import { useRoute } from '@react-navigation/native';
import { ListHeaderComman } from "../../../component/manufacturer/ListHeaderComman";
import { DataDisplayList } from "../../../component/manufacturer/displayListComman";

const AddNewUsers = (Item) => {
  const [organizationList, setOrganizationList] = useState([]);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [emis, setEmis] = useState("");
  const [dropdata, setDropdowndata] = useState("");
  const [schoolData, setSchoolData] = useState([]);
  const [status, setStatus] = useState(false);
  const route = useRoute();
  const tableKey = [
    "name",
    "emis",
    // "surname",
    // "username",
    // "email",
    // "organization",
    // "tel",
    // "emis",
    // "district_name",
    // "school_principal",
  ];
  const tableHeader = [
    constants.school,
    constants.emis,
    // constants.username,
    // constants.emailId,
    // constants.organisation,
    // constants.manage,
  ];

  const imgSearch = require('../../../assets/Images/Common/ionic-ios-search.png');

  useEffect(() => {
    apicall();
    addSchool();
  }, []);

  const apicall = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`;
    try {
      const response = await axios.get(`${Baseurl}${endUrl.organisation}`);
      console.log("manageuser",response?.data?.data)
      
      var tempList = [];
      tempList = response?.data?.data;
      console.log("Temp",tempList);

      setOrganizationList(tempList);
      console.log("organizationdata",organizationList);
    } catch (e) {
      console.log(e);
    }
  };

  const addSchool = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`;
    try {
      const response = await axios.get(`${Baseurl}${endUrl.schoolList}`);
      console.log("schoolList",response?.data?.data)
      setSchoolData(response?.data?.data);
      
      // var tempList = [];
      // tempList = response?.data?.data;
      // console.log("Temp",tempList);

      // setOrganizationList(tempList);
      // console.log("organizationdata",organizationList);
    } catch (e) {
      console.log(e);
    }
  };

  useLayoutEffect(() => {
    const { btnStatus } = route.params;
    console.log("mmm",btnStatus);
    if (btnStatus == '0') { 
      const { Item } = route.params;
      console.log("checkitemdata",Item);
      setDropdowndata(Item.organization)
      console.log("checkitemd",setDropdowndata);
      setEmail(Item.email)
      setName(Item.name)
      setSurname(Item.surname)
     } 
  }, []);

  const onSubmitDetails = async (values, btnStatus) => {
    // setAdduserModal(false);
    // setLoader(true);
    // let obj = {};

    let obj ={'email':email,'name':name,'surname':surname}
    // Object.entries(values).forEach(([key, value]) => {
    //   if (value != null && value != "") obj[key] = value;
    // })
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`;
    console.log("aaa",obj);
    // const service = oper == "Add" ? axios.post(`${Baseurl}${endUrl.schoolDistList}`, obj) : axios.put(`${Baseurl}${endUrl.schoolDistList}/${updateItem.id}`, obj);
    const service = btnStatus == "0" ? 
    axios.put(`${Baseurl}${endUrl.addUser}/${updateItem.id}`, obj) : axios.post(`${Baseurl}${endUrl.addUser}`, obj);
    service.then((res) => {
      // setLoader(false);
      // setAlert(true);
      // apicall()
      console.log("response",res);
    }).catch((e) => {
      // setLoader(false);
      console.log("getError", e);
      console.log(obj)
    })
  };

  

  // const apicall = async () => {
  //   axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`;
  //   axios
  //     .get(`${Baseurl}${endUrl.schoolDistList}`)
  //     .then((res) => {
  //       initialPagination(res?.data?.data);
  //       setListData(res?.data?.data)
  //     })
  //     .catch((e) => console.log("apicall", e));
  // };
  const HeaderComponet = () => {
    return <ListHeaderComman tableHeader={tableHeader} />;
  };

  const rendercomponent = ({ item }) => {
    return (
      <DataDisplayList
        item={item}
        tableKey={tableKey}
        reloadList={() => reloadList()}
        Url={endUrl.schoolList}
        data={"0"}
        schoolDataList={(value)=> schoolDataList(value)}
      />
    );
  };

  const reloadList = () => {
    addSchool();
  };

  const showHide = () => {
    setStatus(!status)
}

const schoolDataList = (value) => {
    console.log("dataabcccddd",value);
    setName(value.name)
    setEmis(value.emis)
    setStatus(!status)
}


  return (
    <View style={Styles.mainView}>
      <KeyboardAvoidingView style={{ flex: 1}} behavior={Platform.OS === 'android' ? 'position' : null} keyboardVerticalOffset={0} >
      <Picker
        style={Styles.userPicker}
        selectedValue={dropdata}
        onValueChange={(itemValue, itemIndex) => setDropdowndata(itemValue)}
        >
        {organizationList != undefined ?
        organizationList.map((item, index)=>(
            <Picker.Item key={index} value={item.name} label={item.name} />)
            ) : null }
        {/* <Picker.Item label="Select Organisation" value="Select Organisation" />
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" /> */}

{/* <Picker       
         mode={mode} onValueChange={onValueChange} selectedValue={selectedValue}>
          <Item label={placeholderText} value="" />
          {dropDownData.map((item, index) => (
            <Item key={index} value={item.value} label={item.label} />
          ))}
        </Picker> */}


      </Picker>

      {dropdata == "Dinnovation" ?
      <View>
      <TextInput
        placeholder="Enter Name"
        style={Styles.inputTxtStyle}
        value={name}
        onChangeText={(txt) => setName(txt)}
        maxLength={50}
      />

      <TextInput
        placeholder="Enter Surname"
        style={Styles.inputTxtStyle}
        value={surname}
        onChangeText={(txt) => setSurname(txt)}
        maxLength={50}
      />

      <TextInput
        placeholder="Enter Email id"
        style={Styles.inputTxtStyle}
        value={email}
        onChangeText={(txt) => setEmail(txt)}
        maxLength={50}
      />
    </View> : null }

    {dropdata == "School" ?
      <View>
        <View style={{flexDirection: "row", justifyContent: 'center',
    alignItems: 'center',}}>
      <TextInput
        placeholder="School Name"
        style={Styles.inputTextStyle}
        value={name}
        onChangeText={(txt) => setName(txt)}
        maxLength={50}
      />
        <TouchableOpacity
          //  style={Styles.buttonStyle}
           onPress={()=> showHide()}>
        <Image source={imgSearch} style={{position: "absolute", alignItems: "center", right: 50, justifyContent: "center", top: 5}}/>
        </TouchableOpacity>
      </View>
      
      { status ? 
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginHorizontal: 30}}>
          <FlatList
            ListHeaderComponent={HeaderComponet}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            data={schoolData}
            renderItem={rendercomponent}
          />
        </ScrollView>
        : null}

      <TextInput
        placeholder="Email id"
        style={Styles.inputTxtStyle}
        value={email}
        onChangeText={(txt) => setEmail(txt)}
        maxLength={50}
      />

      <TextInput
        placeholder="Emis Number"
        keyboardType = 'numeric'
        style={Styles.inputTxtStyle}
        value={emis}
        onChangeText={(txt) => setEmis(txt)}
        maxLength={50}
      />
    </View> : null }

    {dropdata == "Department of Education" ?
      <View>
      <TextInput
        placeholder="Enter Name"
        style={Styles.inputTxtStyle}
        value={name}
        onChangeText={(txt) => setName(txt)}
        maxLength={50}
      />

      <TextInput
        placeholder="Enter Surname"
        style={Styles.inputTxtStyle}
        value={surname}
        onChangeText={(txt) => setSurname(txt)}
        maxLength={50}
      />

      <TextInput
        placeholder="Enter Email id"
        style={Styles.inputTxtStyle}
        value={email}
        onChangeText={(txt) => setEmail(txt)}
        maxLength={50}
      />
    </View> : null }


   

      

         
          
          
          </KeyboardAvoidingView>
          <TouchableOpacity
           style={Styles.buttonStyle}
           onPress={()=> onSubmitDetails()}>
              <Text style={Styles.buttonText}>Next</Text>
          </TouchableOpacity>
    </View>

    
  );
};

export default AddNewUsers;
