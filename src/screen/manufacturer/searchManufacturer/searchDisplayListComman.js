import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native'
import { AlertMessage } from '../../../Alert/alert'
import COLORS from '../../../asset/color'
import Images from '../../../asset/images'
import constants from '../../../locales/constants'
import axios from 'axios'
import { AddUserModal } from '../../../component/manufacturer/AddFormModal/AddFormModal'
import { useNavigation } from '@react-navigation/native'
import Fonts from '../../../asset/Fonts'
import { RFValue } from 'react-native-responsive-fontsize'
import { STANDARD_SCREEN_SIZE } from '../../../utils/constants'
import { RfH, RfW } from '../../../utils/helpers'

export const DataDisplayList = ({
  item,
  tableKey,
  onEdit,
  mainMessage,
  submessage,
  permissionId,
  organization,
  onDeleteFurItem,
  flatListData,
  onSubmitDetails,
  pageStatus,
  data,
  onSubmitreparableDetails,
  onsubmitDilverdetails,
}) => {
  const [userModal, setUserModal] = useState(false)
  const [alert, setAlert] = useState(false)
  const [errorMsg, setErrorMsg] = useState(false)
  const [mainMsg, setMainMsg] = useState('')
  const [subMsg, setSubMsg] = useState('')
  const [repItem, setRepItem] = useState('')
  const [confirmCount, setConfirmCount] = useState('')
  const [deliverCount, setDeliverCount] = useState('')
  const [brokenItems, setBrokenItems] = useState(false)

  const getContent = (val) => {
    if (val && Array.isArray(val)) {
      return val.map((brItem) => (
        <Text style={Styles.textStyle}>{brItem?.category_name}</Text>
      ))
    } else {
      return <Text style={Styles.textStyle}>{val}</Text>
    }
  }

  return (
    <SafeAreaView style={Styles.firstView}>
      <View style={Styles.mainView}>
        {tableKey.map((val, index) => (
          <TouchableOpacity
            // onPress={() => schoolDataList(item, constants.Edit)}
            key={index}
          >
            <View key={val} style={Styles.viewStyle}>
              {getContent(item[val])}
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {userModal ? (
        <AddUserModal
          visible={userModal}
          setmodalVisible={(val) => setUserModal(val)}
          data={item}
          name={`Edit ${constants.School} `}
          buttonVal={constants.update}
        />
      ) : null}

      {alert ? (
        <AlertMessage
          visible={alert}
          setmodalVisible={(val) => setAlert(val)}
          mainMessage={mainMessage ? mainMessage : ''}
          subMessage={submessage ? submessage : ''}
          type={constants.dropdown_Type}
          onConfirm={() => onPressYes()}
        />
      ) : null}
      {errorMsg ? (
        <AlertMessage
          visible={errorMsg}
          setmodalVisible={(val) => setErrorMsg(val)}
          mainMessage={mainMsg}
          subMessage={subMsg}
        />
      ) : null}
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
  viewsssStyle: {
    width: 20,
    marginTop: 12,
    marginHorizontal: 20,
  },
  screenStyle: {
    width: '30%',
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  inputStyles: {
    height: 35,
    backgroundColor: COLORS.White,
    width: 140,
  },
  grayinputStyles: {
    height: 35,
    backgroundColor: COLORS.White,
    width: 140,
  },
})
