import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { PermissionsAndroid, Alert } from "react-native";
// import RNFetchBlob from 'rn-fetch-blob';
// import ImagePicker from 'react-native-image-crop-picker';

const image = require('../src/assets/Images/Common/inventory_black_24dp.png');



const Second = () => {

  // const actualDownload = () => {
  //     const { dirs } = RNFetchBlob.fs;
  //    RNFetchBlob.config({
  //      fileCache: true,
  //      addAndroidDownloads: {
  //      useDownloadManager: true,
  //      notification: true,
  //      mediaScannable: true,
  //      title: `test.pdf`,
  //      path: `${dirs.DownloadDir}/test.pdf`,
  //      },
  //    })
  //      .fetch('GET', 'http://www.africau.edu/images/default/sample.pdf', {})
  //      .then((res) => {
  //        console.log('The file saved to ', res.path());
  //      })
  //      .catch((e) => {
  //        console.log(e)
  //      });
  //  }

  // const downloadFile = async() => {
  //     try {
  //         const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
  //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //           actualDownload();
  //         } else {
  //           Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
  //         }
  //       } catch (err) {
  //         console.warn(err);
  //       } 
  //   }

  // const openGallery = () => {
  //   ImagePicker.openPicker({
  //     // width: 300,
  //     // height: 400,
  //     // cropping: true
  //     multiple: true
  //   }).then(image => {
  //     console.log(image);
  //   });
  // };

  // const openCam = () => {
  // ImagePicker.openCamera({
  //     width: 300,
  //     height: 400,
  //     cropping: true,
  //   }).then(image => {
  //     console.log(image);
  //   });
  // };

  // const openCrop = () => {
  // ImagePicker.openCropper({
  //     path: {image},
  //     width: 300,
  //     height: 400
  //   }).then(image => {
  //     console.log(image);
  //   });
  // };


  return (
    <View>
      <Text>Furniture</Text>
      {/* <TouchableOpacity onPress={()=> downloadFile()}>
                <Text>Download!!!</Text>
            </TouchableOpacity> */}
      {/* <TouchableOpacity onPress={()=> openGallery()}>
                <Text>Open Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> openCam()}>
                <Text>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> openCrop()}>
                <Text>Open Crop</Text>
            </TouchableOpacity> */}
    </View>
  );
};

export default Second;