import React, { useState, useEffect, useLayoutEffect } from 'react'
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
import COLORS from '../../asset/color'
import Images from '../../asset/images'

import constants from '../../locales/constants'
import axios from 'axios'
import endUrl from '../../redux/configration/endUrl'
import { useSelector } from 'react-redux'
import { DataDisplayList } from '../../component/manufacturer/displayListComman'
import { ListHeaderComman } from '../../component/manufacturer/ListHeaderComman'
import Loader from '../../component/loader'
import AlertText from '../../Alert/AlertText'
import DatePicker from 'react-native-date-picker'
import { useNavigation, useIsFocused } from '@react-navigation/core'
import CommonService from '../../locales/service'

export const ManageRequests = () => {
  const isFocused = useIsFocused()
  const [listData, setListData] = useState([])
  const loginData = useSelector((state) => state?.loginData)
  const [loader, setLoader] = useState(true)
  const [searchtask, setSearchTask] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endData, setEndDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [close, setCLose] = useState(false)
  const [startDateStatus, setStartDateStatus] = useState(true)
  const [enddateStatus, setendDatestatus] = useState(true)
  const [searchStatus, setSearchStatus] = useState(true)
  const [dateErrorMessage, setDateErrorMessage] = useState('')
  const [maximumNumber, setmaximunNumber] = useState(0)
  const [number, setNumber] = useState(1)

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
  const navigation = useNavigation()

  const tableKey = [
    'school_name',
    'emis',
    'created_at',
    'ref_number',
    'status',
    'total_furniture',
  ]

  const tableHeader = [
    constants.School,
    constants.emisNumber,
    constants.dateCreated,
    constants.refrenceNumber,
    constants.status,
    constants.totalFurnitureCount,
    constants.manage,
  ]

  useEffect(() => {
    const arr = loginData?.user?.data?.data?.permissions
    const [userEdit, userDlt] = CommonService.getPermission(arr, [31, 32])
    setPermissionId({
      userEdit: userEdit,
      userDelete: userDlt,
    })
  }, [listData])

  const rendercomponent = ({ item }) => {
    return (
      <DataDisplayList
        item={item}
        tableKey={tableKey}
        reloadList={() => reloadList()}
        link={endUrl.delManageRequest}
        mainMessage={AlertText.deleteManageRequest}
        submessage={AlertText.UndoMessgae}
        onEdit={(item, task) => onEdit(item, task)}
        permissionId={permissionId}
      />
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
      .get(`${endUrl.getManageRequest}?page=${count ? count : number}`)
      .then((res) => {
        // initialPagination(res?.data?.data);
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

  // Edit Functionality
  const onEdit = (task) => {
    let data = task
    navigation.navigate('FurnitureReplacmentProcess', {
      items: data,
      task: 'MangeRequest',
    })
  }

  useEffect(() => {
    if (startDate.getTime() > endData.getTime()) {
      setDateErrorMessage(AlertText.DateError)
    } else {
      setDateErrorMessage('')
    }
  }, [startDate, endData])

  const onsearch = () => {
    setSearchStatus(false)
    let strtDte = `${startDate?.getFullYear()}-${
      startDate?.getMonth() + 1
    }-${startDate?.getDate()}`
    let endDte = `${endData?.getFullYear()}-${
      endData?.getMonth() + 1
    }-${endData.getDate()}`
    let str = ''
    if (!validation(searchtask)) str += `ref_number=${searchtask}&`
    if (startDateStatus == false) str += `start_date=${strtDte}&`
    if (enddateStatus == false) str += `end_date=${endDte}&`
    setLoader(true)
    axios
      .get(`${endUrl.searchManageRequest}?${str}`)
      .then((res) => {
        setListData(res?.data?.data)
        initialPagination(res?.data?.data)
        setLoader(false)
      })
      .catch((e) => {
        setLoader(false)
        setErrorMessage(e?.response?.data?.message)
      })
  }
  const onReset = () => {
    setSearchStatus(true)
    setSearchTask('')
    setStartDateStatus(true)
    setendDatestatus(true)
    setDateErrorMessage('')
    setErrorMessage(false)
  }

  const validation = (value) => {
    return value == '' || value == undefined || value == null
  }

  useEffect(() => {
    apicall()
  }, [isFocused])

  useEffect(() => {
    if (listData) setLoader(false)
  }, [listData])

  useEffect(() => {
    if (searchtask === '') {
      apicall()
      setErrorMessage('')
      setLoader(false)
    }
  }, [searchtask])

  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.radioView}>
        <View style={styles.radioDate}>
          <View>
            <TextInput
              style={styles.refrenceStyle}
              placeholder={constants.referenceNumber}
              placeholderTextColor={COLORS.Black}
              opacity={0.5}
              value={searchtask}
              onChangeText={(val) => setSearchTask(val)}
            />
          </View>
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
                  : `${endData?.getDate()}/${
                      endData?.getMonth() + 1
                    }/${endData?.getFullYear()}`}
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
                date={endData}
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
          {dateErrorMessage ? (
            <View style={styles.dateerrorView}>
              <Text style={styles.DateerrormessStyle}>{dateErrorMessage}</Text>
            </View>
          ) : null}
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={searchStatus ? onsearch : onReset}
          >
            <Text style={styles.buttonText}>
              {' '}
              {searchStatus ? constants.search : constants.Reset}
            </Text>
          </TouchableOpacity>
        </View>







        
      </View>
      {errorMessage ? (
        <View style={styles.errorView}>
          <Text style={styles.errormessStyle}>{errorMessage}</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.radView}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <FlatList
            ListHeaderComponent={HeaderComponet}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            data={
              listData
              // .filter((element)=>element?.status==='Pending Collection')
              // .slice(pagination.startIndex, pagination.endIndex)
            }
            renderItem={rendercomponent}
          />
        </ScrollView>
      )}
      <View style={styles.lastView}>
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
    </SafeAreaView>
  )
}
