import React, { useRef, useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
  Image,
} from "react-native";
import COLORS from "../../asset/color";
import Images from "../../asset/images";

const Dropdown = ({
  label,
  data,
  onSelect,
  task,
  way,
  identify,
  selectedItem,
  loadmoredata,
}) => {
  const DropdownButton = useRef();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState({});
  const [dropdownTop, setDropdownTop] = useState(0);
  const [isDisable, setIsDisable] = useState(false);
  const toggleDropdown = () => {
    visible ? setVisible(false) : openDropdown();
  };

  const loadData = ()=>{
    loadmoredata()
    // visible ? setVisible(false) : openDropdown();
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
      <Text>{item[task]}</Text>
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
            <FlatList
              data={data}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              style={data?.length > 4 ? styles.flatStyle : styles.flatStyles}
              extraData={useState}
              // onEndReached={() => loadData()}
            />
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
});

export default Dropdown;
