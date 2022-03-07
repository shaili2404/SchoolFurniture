import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import Styles from "./Styles";
import constants from "../../../locales/constants";
import axios from "axios";
import endUrl from "../../../redux/configration/endUrl";
import { ListHeaderComman } from "../../../component/manufacturer/ListHeaderComman";
import { DataDisplayList } from "../../../component/manufacturer/displayListComman";
import { useRoute, useNavigation } from "@react-navigation/native";
import Dropdown from "../../../component/DropDown/dropdown";
import { regExpEmail } from "../../../locales/regexp";
import Images from "../../../asset/images";

const AddNewUsers = () => {
  const [organizationList, setOrganizationList] = useState([]);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [emis, setEmis] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [dropdata, setDropdowndata] = useState("");
  const [schoolData, setSchoolData] = useState([]);
  const [disable, setDisable] = useState(true);
  const [status, setStatus] = useState(false);
  const [selected, setSelected] = useState({});
  const route = useRoute();
  const navigation = useNavigation();
  const { btnStatus, Item } = route.params;

  const tableKey = ["name", "emis"];
  const tableHeader = [constants.school, constants.emis];

  useEffect(() => {
    { !regExpEmail.test(email) ? setDisable(true) : setDisable(false) }
  }, [email])
  useEffect(() => {
    apicall();
    addSchool();
  }, []);

  useEffect(() => {
    if (btnStatus == 0) {
    } else {
      setName("");
      setSurname("");
      setEmail("");
      setSchoolName('');
      setEmis('')
    }
  }, [selected]);

  const apicall = async () => {
    try {
      const response = await axios.get(endUrl.organisation);

      var tempList = [];
      tempList = response?.data?.data;

      setOrganizationList(tempList);
    } catch (e) {
      console.log(e);
    }
  };

  const addSchool = async () => {
    try {
      const response = await axios.get(`${endUrl.schoolList}`);
      setSchoolData(response?.data?.data);
    } catch (e) {
      console.log(e);
    }
  };

  useLayoutEffect(() => {
    if (btnStatus == "0") {
      setDropdowndata(Item.organization);
      setEmail(Item.email);
      setName(Item.name);
      setSurname(Item.surname);
      setEmis(Item.emis);
      setSchoolName(Item.name);
    }
  }, []);

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
        schoolDataList={(value) => schoolDataList(value)}
      />
    );
  };

  const reloadList = () => {
    addSchool();
  };

  const showHide = () => {
    setStatus(!status);
  };

  const schoolDataList = (value) => {
    setSchoolName(value.name);
    setEmis(String(value.emis));
    setStatus(!status);
  };

  const goToPermision = () => {
    let obj = {
      email: email,
    };
    if (selected.id == 2) {
      obj.emis = emis;
      obj.name = schoolName;
    } else {
      obj.surname = surname;
      obj.name = name
    };

    let item;
    if (btnStatus == '0') {
      item = Item
      obj.organization = Item.organization_id
    } else {
      item = null
      obj.organization = selected.id
    }
    navigation.navigate("Functionalities", { reqData: obj, itemObj: item, btnStatus: btnStatus });
  };

  return (
    <View style={Styles.mainView}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "android" ? "position" : null}
        keyboardVerticalOffset={0}
      >
        <View style={Styles.container}>
          <Dropdown
            label={btnStatus == 0 ? dropdata : constants.selectOrg}
            data={organizationList}
            onSelect={setSelected}
            task="name"
            way={btnStatus == 0 ? 'Edit' : null}
          />
        </View>

        {dropdata == "Dinnovation" || selected.name == "Dinnovation" ? (
          <View>
            <TextInput
              placeholder={constants.enterName}
              style={Styles.inputTxtStyle}
              value={name}
              onChangeText={(txt) => setName(txt)}
              maxLength={50}
            />

            <TextInput
              placeholder={constants.surname}
              style={Styles.inputTxtStyle}
              value={surname}
              onChangeText={(txt) => setSurname(txt)}
              maxLength={50}
            />

            <TextInput
              placeholder={constants.emailId}
              style={Styles.inputTxtStyle}
              value={email}
              onChangeText={(txt) => setEmail(txt)}
              maxLength={50}
            />
          </View>
        ) : null}

        {dropdata == "School" || selected.name == "School" ? (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextInput
                placeholder={constants.schoolName}
                style={Styles.inputTextStyle}
                value={schoolName}
                onChangeText={(txt) => setSchoolName(txt)}
                maxLength={50}
              />
              <TouchableOpacity onPress={() => showHide()}>
                <Image
                  source={Images.SearchIcon}
                  style={{
                    position: "absolute",
                    alignItems: "center",
                    right: 50,
                    justifyContent: "center",
                    top: 5,
                  }}
                />
              </TouchableOpacity>
            </View>

            {status ? (
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ marginHorizontal: 30 }}
              >
                <FlatList
                  ListHeaderComponent={HeaderComponet}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.id}
                  data={schoolData}
                  renderItem={rendercomponent}
                />
              </ScrollView>
            ) : null}

            <TextInput
              placeholder={constants.email}
              style={Styles.inputTxtStyle}
              value={email}
              onChangeText={(txt) => setEmail(txt)}
              maxLength={50}
            />

            <TextInput
              placeholder={constants.emisNumber}
              keyboardType="numeric"
              style={Styles.inputTxtStyle}
              value={emis}
              onChangeText={(txt) => setEmis(txt)}
              maxLength={50}
              editable={false}
            />
          </View>
        ) : null}

        {dropdata == "Department of Education" ||
          selected.name == "Department of Education" ? (
          <View>
            <TextInput
              placeholder={constants.enterName}
              style={Styles.inputTxtStyle}
              value={name}
              onChangeText={(txt) => setName(txt)}
              maxLength={50}
            />

            <TextInput
              placeholder={constants.surname}
              style={Styles.inputTxtStyle}
              value={surname}
              onChangeText={(txt) => setSurname(txt)}
              maxLength={50}
            />

            <TextInput
              placeholder={constants.emailId}
              style={Styles.inputTxtStyle}
              value={email}
              onChangeText={(txt) => setEmail(txt)}
              maxLength={50}
            />
          </View>
        ) : null}
      </KeyboardAvoidingView>
      {dropdata == "School" || selected.name == "School" ? (
        <>
          {schoolName && email && emis ? (
            <TouchableOpacity
              style={Styles.buttonStyle}
              onPress={goToPermision}
              disabled={disable}
            >
              <Text style={Styles.buttonText}>{constants.nextText}</Text>
            </TouchableOpacity>
          ) : null}
        </>
      ) : (
        <>
          {name && surname && email ? (
            <TouchableOpacity
              style={Styles.buttonStyle}
              onPress={goToPermision}
              disabled={disable}
            >
              <Text style={Styles.buttonText}>{constants.nextText}</Text>
            </TouchableOpacity>
          ) : null}
        </>
      )}
    </View>
  );
};

export default AddNewUsers;
