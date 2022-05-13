import React, { useState, useEffect } from 'react'
import Styles from '../maintenance/SchoolMaintenance/SchoolDistrict/style'
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  Image,
  Text,
} from 'react-native'
import styles from './Styles'
import COLORS from '../../../asset/color'
import Images from '../../../asset/images'

import constants from '../../../locales/constants'
import axios from 'axios'
import endUrl from '../../../redux/configration/endUrl'
import { useSelector } from 'react-redux'
import { DataDisplayList } from './searchDisplayListComman'
import { ListHeaderComman } from '../../../component/manufacturer/ListHeaderComman'
import Loader from '../../../component/loader'
import AlertText from '../../../Alert/AlertText'
import { useNavigation } from '@react-navigation/native'
import RadioForm from 'react-native-simple-radio-button'
import DatePicker from 'react-native-date-picker'

const PAGESIZE = 10

export const Search = () => {
  const [listData, setListData] = useState([])
  const loginData = useSelector((state) => state?.loginData)
  const [loader, setLoader] = useState(true)
  const [searchtask, setSearchTask] = useState('')
  const [radioParam, setRadioParam] = useState([
    { label: 'Data Range', value: 0 },
    { label: 'Reference Number', value: 1 },
  ])
  const [searchValue, setSearchValue] = useState(0)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [close, setCLose] = useState(false)
  const [status, setStatus] = useState(false)
  const [startDateStatus, setStartDateStatus] = useState(true)
  const [enddateStatus, setendDatestatus] = useState(true)
  const [maximumNumber, setmaximunNumber] = useState(0)
  const [number, setNumber] = useState(1)
  const navigation = useNavigation()
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPage: 0,
    startIndex: 0,
    endIndex: 0,
  })
  const [permissionId, setPermissionId] = useState({
    userList: false,
    userCreate: false,
    userEdit: false,
    userDelete: false,
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [permissionArr, setpermissionArr] = useState([])

  const tableKey = [
    'school_name',
    'emis',
    'ref_number',
    'created_at',
    'category_name',
    'count',
    'status',
  ]

  const tableHeader = [
    constants.School,
    constants.emisNumber,
    constants.refrenceNumber,
    constants.dateCreated,
    constants.FurnitureCat,
    constants.ItemCount,
    constants.status,
  ]

  const addArray = [
    { key: 'district_office', value: constants.DistrictOffice },
    { key: 'director', value: constants.Director },
    { key: 'tel', value: constants.TelphoneNo },
    { key: 'address1', value: constants.Address1 },
    { key: 'address2', value: constants.Address2 },
    { key: 'address3', value: constants.Address3 },
    { key: 'address4', value: constants.Address4 },
    { key: 'street_code', value: constants.streetCode },
  ]

  useEffect(() => {
    setpermissionArr(loginData?.user?.data?.data?.permissions)
    let userList = false,
      userCreate = false,
      userEdit = false,
      userDlt = false
    permissionArr.forEach((input) => {
      if (input.id === 5) {
        // setErrorMessage("");
        userList = true
      }
      if (input.id === 6) {
        userCreate = true
      }
      if (input.id === 7) {
        userEdit = true
      }
      if (input.id === 8) {
        userDlt = true
      } else if (!userList) {
      }
    })
    setPermissionId({
      userList: userList,
      userCreate: userCreate,
      userEdit: userEdit,
      userDelete: userDlt,
    })
  }, [listData])

  const rendercomponent = ({ item }) => {
    const brokenItem = item.broken_items
    if (brokenItem && Array.isArray(brokenItem) && brokenItem.length > 0) {
      return brokenItem.map((brItem) =>
        renderRow({
          ...item,
          category_name: brItem.category_name,
          rowId: `${item.id}-${brItem.id}`,
          count: brItem.count,
        })
      )
    } else {
      return renderRow({
        ...item,
        category_name: '',
        rowId: item.id,
        count: brItem.total_broken_items,
      })
    }
  }

  const renderRow = (item) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('FurnitureReplacmentProcess', item)}
      >
        <DataDisplayList
          item={item}
          tableKey={tableKey}
          reloadList={() => reloadList()}
          link={endUrl.schoolDistList}
          mainMessage={AlertText.deletedistrict}
          submessage={AlertText.UndoMessgae}
          permissionId={permissionId}
          data={'0'}
        />
      </TouchableOpacity>
    )
  }

  const HeaderComponet = () => {
    return <ListHeaderComman tableHeader={tableHeader} />
  }

  const reloadList = () => {
    apicall()
  }

  const apicall = (count) => {
    setLoader(true)
    axios
      .get(`${endUrl.collectionreqList}?page=${count ? count : number}`)
      .then((res) => {
        setListData(res?.data?.data?.records)
        setmaximunNumber(res?.data?.data?.total_page)
        setLoader(false)
      })
      .catch((e) => setLoader(false))
  }

  const onNext = () => {
    let count = number + 1
    setLoader(true)
    setNumber(number + 1)
    apicall(count)
    setLoader(false)
  }

  const onPrevious = () => {
    let count = number - 1
    setLoader(true)
    setNumber(number - 1)
    apicall(count)
    setLoader(false)
  }

  const onsearch = async () => {
    console.log('hi', searchValue)
    // setLoader(true);
    let strtDte = `${startDate?.getFullYear()}-${
      startDate?.getMonth() + 1
    }-${startDate?.getDate()}`
    let endDte = `${endDate?.getFullYear()}-${
      endDate?.getMonth() + 1
    }-${endDate.getDate()}`
    let str = ''
    if (startDateStatus == false) str += `start_date=${strtDte}&`
    if (enddateStatus == false) str += `end_date=${endDte}&`

    let obj =
      searchValue != 0
        ? { ref_number: searchtask }
        : { start_date: strtDte, end_date: endDte }
    console.log('obbbj', obj)
    axios
      .post(
        `${
          searchValue != 0
            ? endUrl.searchBy_ReferenceNumber
            : endUrl.searchBy_DateRange
        }`,
        obj
      )
      .then((res) => {
        console.log('res', res?.data?.data)
        setListData(res?.data?.data?.records)
        setLoader(false)
      })
      .catch((e) => {
        console.log('err', e?.response)
        let errorMsg = e?.response?.data?.message
        setLoader(false)
        setErrorMessage(errorMsg)
      })
  }

  useEffect(() => {
    apicall()
  }, [])

  useEffect(() => {
    if (listData) setLoader(false)
  }, [listData])

  useEffect(() => {
    if (searchtask == '') {
      apicall()
      setErrorMessage('')
      setLoader(false)
    }
  }, [searchtask])

  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={Styles.mainView}>
      <View style={styles.radioView}>
        <View>
          <Text style={styles.selectSearchText}>
            {constants.selectSearchOption}
          </Text>
          <View style={styles.line}></View>
        </View>
        <View style={styles.radioDate}>
          <View style={styles.radView}>
            <RadioForm
              radio_props={radioParam}
              initial={0}
              formHorizontal={true}
              buttonSize={10}
              buttonColor={'#48A448'}
              selectedButtonColor={'#359934'}
              buttonWrapStyle={{ paddingLeft: 50 }}
              radioStyle={{ paddingRight: 40 }}
              labelStyle={{ fontSize: 16, color: '#000000' }}
              onPress={(value) => setSearchValue(value)}
            />
          </View>
          {searchValue == 0 ? (
            // Search by Date Range
            <View style={styles.viewInputStyle}>
              <View style={styles.dropStyle}>
                <Text style={styles.textStyle}>
                  {startDateStatus
                    ? 'Start Date'
                    : `${startDate?.getDate()}/${
                        startDate?.getMonth() + 1
                      }/${startDate?.getFullYear()}`}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.eyeStyle}
                onPress={() => setOpen(true)}
              >
                <Image source={Images.Calendar} style={styles.imgStyle} />
                <DatePicker
                  modal
                  open={open}
                  date={startDate}
                  mode="date"
                  onConfirm={(date) => {
                    setOpen(false)
                    setStartDate(date)
                    setStartDateStatus(false)
                  }}
                  onCancel={() => {
                    setOpen(false)
                  }}
                />
              </TouchableOpacity>
              <View style={styles.dropStyle}>
                <Text style={styles.textStyle}>
                  {enddateStatus
                    ? 'End Date'
                    : `${endDate?.getDate()}/${
                        endDate?.getMonth() + 1
                      }/${endDate?.getFullYear()}`}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.eyeStylee}
                onPress={() => setCLose(true)}
              >
                <Image source={Images.Calendar} style={styles.imgStylee} />
                <DatePicker
                  modal
                  open={close}
                  date={endDate}
                  mode="date"
                  onConfirm={(date) => {
                    setCLose(false)
                    setEndDate(date)
                    setendDatestatus(false)
                  }}
                  onCancel={() => {
                    setCLose(false)
                  }}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              {/* Search by reference number */}
              <TextInput
                style={styles.refrenceStyle}
                placeholder={constants.referenceNumber}
                placeholderTextColor={COLORS.Black}
                opacity={0.5}
                value={searchtask}
                onChangeText={(val) => setSearchTask(val)}
              />
            </View>
          )}
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => onsearch()}
          >
            <Text style={styles.buttonText}>{constants.search}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={styles.radView}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <FlatList
          ListHeaderComponent={HeaderComponet}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          data={listData}
          renderItem={rendercomponent}
        />
      </ScrollView>

      <View style={Styles.lastView}>
        <TouchableOpacity
          onPress={onPrevious}
          disabled={number == 1 ? true : false}
        >
          {number == 1 ? (
            <Image source={Images.leftarrow} />
          ) : (
            <Image
              source={Images.rightarrow}
              style={{ transform: [{ rotate: '180deg' }] }}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onNext}
          disabled={number == maximumNumber ? true : false}
        >
          {number == maximumNumber ? (
            <Image
              source={Images.leftarrow}
              style={{ transform: [{ rotate: '180deg' }] }}
            />
          ) : (
            <Image source={Images.rightarrow} />
          )}
        </TouchableOpacity>
      </View>
      <View style={{ height: 70 }} />
    </SafeAreaView>
  )
}
