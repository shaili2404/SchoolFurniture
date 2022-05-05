import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
  Image,
  TextInput,
  urlval
} from "react-native";
import COLORS from "../../asset/color";
import Images from "../../asset/images";
import constants from "../../locales/constants";

const DropdownCR = ({
  label,
  data,
  onSelect,
  task,
  way,
  identify,
  selectedItem,
  urlval,
  searchboxname
  
}) => {
  const DropdownButton = useRef();
  const [dropData,setDropData] = useState([])
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [dropdownTop, setDropdownTop] = useState(0);
  const [isDisable, setIsDisable] = useState(false);
  const [searchTask,setSearchTask] = useState('')
  const toggleDropdown = () => {
    visible ? setVisible(false) : openDropdown();
  };

  const onsearch = (val)=>{
      if (val == ''){ 
          setDropData(data)
        setSearchTask(val)
      }
      else{
        console.log(`${urlval}${val}`)
        setSearchTask(val)
        axios
        .get(`${urlval}${val}`)
        .then((res) => {
           setErrorMessage('')
          setDropData(res?.data?.data);
        //   setLoader(false);
        })
        .catch((e) => {

          {
            let { message, data, status } = e?.response?.data || {};
    
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
      }
  }

  const openDropdown = () => {
    DropdownButton.current.measure((_fx, fy, w, h, _px, py) => {
      setDropdownTop(py + h);
    });
    setVisible(true);
  };

  useEffect(() => {
    if (way == "Edit" && identify == "dropdownA") {
      setSelected(data[0]);
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [way]);

  useEffect(() => {
    if (way == "Edit" && identify == "dropdownB") {
      setIsDisable(false);
      data.map((element) => {
        Object.entries(element).forEach(([key, value]) => {
          if (`${key}` == "id" && `${value}` == selectedItem)
            setSelected(element);
        });
      });
    }
  }, [data]);

  const onItemPress = (item) => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
      <Text style={{fontSize:16}}>{item[task]}</Text>
    </TouchableOpacity>
  );

  const renderDropdown = () => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
           
          <View style={[styles.dropdown, { top: dropdownTop }]}>
          <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextInput
                placeholder={searchboxname}
                style={styles.inputTextStyle}
                maxLength={50}
                value={searchTask}
                onChangeText={(val)=>onsearch(val)}
              />
              <TouchableOpacity>
                <Image
                  source={Images.SearchIcon}
                  style={{
                    position: "absolute",
                    alignItems: "center",
                    right: 20,
                    justifyContent: "center",
                    top: 5,
                  }}
                />
              </TouchableOpacity>
            </View>
            {errorMessage ? 
          <View style={styles.errorView}>
            <Text style={styles.errormessStyle}>{errorMessage}</Text>
          </View>
          : 
          <>
            <FlatList
              data={searchTask == ''?  data : dropData}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              style={data?.length > 4 ? styles.flatStyle : styles.flatStyles}
            />
          </>}
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <>
      <TouchableOpacity style={styles.button}>
        {renderDropdown()}
        <Text style={styles.buttonText}>
          {(selected && selected[task]) || label}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.eyeStyle}
        ref={DropdownButton}
        onPress={toggleDropdown}
        disabled={isDisable}
      >
        <Image source={Images.DownArrow} style={styles.imgsStyle} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
  },
  buttonText: {
    flex: 1,
  },
  dropdown: {
    position: "absolute",
    backgroundColor: COLORS.LightGreen,
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  overlay: {
    width: "90%",
    height: "100%",
    alignSelf: "center",
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.2,
  },
  eyeStyle: {
    position: "relative",
    bottom: 12,
    left: 130,
  },
  imgsStyle: {
    width: 20,
    height: 10,
  },
  flatStyle: {
    height: 220,
    paddingVertical: 15,
  },
  flatStyles: {
    paddingVertical: 15,
  },
  inputTextStyle: {
    borderRadius: 10,
    backgroundColor: COLORS.White,
    marginTop: 30,
    paddingLeft: 15,
    height:40,
    width: "100%",
    alignItems: 'center',
    alignSelf:'center',
    justifyContent: 'center',
    fontSize:18
  },
  errormessStyle: {
    textAlign: "center",
    color: COLORS.red,
    fontSize: 22,
  },
  errorView: {
    width: "100%",
    alignContent: "center",
  },
});

export default DropdownCR;
