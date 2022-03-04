import React, { FC, ReactElement, useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
  ScrollView,
  Image,
} from "react-native";
import COLORS from "../../asset/color";
import Images from "../../asset/images";

const Dropdown = ({ label, data, onSelect, task,way }) => {
  const DropdownButton = useRef();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const [dropdownTop, setDropdownTop] = useState(0);
  const toggleDropdown = () => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = () => {
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h);
    });
    setVisible(true);
  };

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
              style={data.length > 4 ? styles.flatStyle : styles.flatStyles}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <>
      <TouchableOpacity
        style={styles.button}
      >
        {renderDropdown()}
        <Text style={styles.buttonText}>
          {(selected && selected[task]) || label}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.eyeStyle}
        ref={DropdownButton}
        onPress={toggleDropdown}
        disabled={way == 'Edit' ? true : false }
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

