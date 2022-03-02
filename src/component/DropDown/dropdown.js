import React, { FC, ReactElement, useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
  ScrollView,
  Image
} from 'react-native';
import COLORS from '../../asset/color';
import Images from '../../asset/images';


const Dropdown = ({ label, data, onSelect }) => {
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
      <Text>{item.district_office}</Text>
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
              keyExtractor={(item, index) => index.toString()}
              style={{ height: 200 }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <>
      <TouchableOpacity
        // ref={DropdownButton}
        style={styles.button}
      // onPress={toggleDropdown}
      >
        {renderDropdown()}
        <Text style={styles.buttonText}>
          {(selected && selected.district_office) || label}
        </Text>

      </TouchableOpacity>
      <TouchableOpacity style={styles.eyeStyle} ref={DropdownButton} onPress={toggleDropdown}>
        <Image source={Images.DownArrow} style={styles.imgsStyle} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
  },
  buttonText: {
    flex: 1,
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: COLORS.LightGreen,
    width: '100%',
  },
  overlay: {
    width: '90%',
    height: '100%',
    alignSelf: 'center'
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  eyeStyle: {
    position: "relative",
    bottom: 12,
    left: 130,
  },
  imgsStyle: {
    width: 20,
    height: 10
  },
});

export default Dropdown;