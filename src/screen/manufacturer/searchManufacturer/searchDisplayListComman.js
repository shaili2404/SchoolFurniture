import React from 'react'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import COLORS from '../../../asset/color'
import Fonts from '../../../asset/Fonts'
import { RfW } from '../../../utils/helpers'

export const DataDisplayList = ({ item, tableKey }) => {
  const getRecord = (record) => {
    return tableKey.map((e) => (
      <View style={Styles.viewStyle} key={record.rowId}>
        <Text style={Styles.textStyle}>{record[e]}</Text>
      </View>
    ))
  }

  return (
    <SafeAreaView style={Styles.firstView}>
      <View style={Styles.mainView}>{getRecord(item)}</View>
    </SafeAreaView>
  )
}

const Styles = StyleSheet.create({
  textStyle: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: COLORS.Black,
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  mainView: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
  },
  firstView: {
    backgroundColor: COLORS.LightGreen,
    height: 56,
    borderBottomColor: COLORS.Black,
    borderBottomWidth: 0.4,
  },
  viewStyle: {
    width: RfW(180),
    alignSelf: 'center',
    marginHorizontal: 20,
  },
})
