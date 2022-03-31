// import React from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { PermissionsAndroid, Alert } from "react-native";
// import RNFetchBlob from 'rn-fetch-blob';
// import ImagePicker from 'react-native-image-crop-picker';

// const image = require('../src/assets/Images/Common/inventory_black_24dp.png');



// const Second = () => {

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


  // return (
  //   <View>
  //     <Text>Furniture</Text>
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
//     </View>
//   );
// };

// export default Second;



// Example to Make PDF in React Native from HTML Text
// https://aboutreact.com/make-pdf-in-react-native-from-html-text/

// Import React
import React, {useState, useEffect} from 'react';
// Import required components
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';

// Import HTML to PDF
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import endUrl from "./redux/configration/endUrl";
import RNFetchBlob from 'rn-fetch-blob';

const Second = () => {
  const [filePath, setFilePath] = useState('');
  const [annexure, setAnnexure] = useState(``);
  const route = useRoute();
//   const { value } = route.params;
//   console.log("name",value);

const annexureApi = () => {
    const ref_number = '123456789_290322_1';
    // setLoader(true);
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios
      .get(`${endUrl.annexure}?ref_number=${ref_number}`)
      .then((res) => {
        // initialPagination(res?.data?.data);
        setAnnexure(res?.data);
        console.log("dataaa",res?.data);
        // setLoader(false);
      })
      .catch((e) => {
        // setLoader(false);
        console.log("apicall", e);
      });
  };

  useEffect(()=> {
    annexureApi();
  },[]);

   const actualDownload = () => {
       console.log("hi")
      const { dirs } = RNFetchBlob.fs;
     RNFetchBlob.config({
       fileCache: true,
       addAndroidDownloads: {
       useDownloadManager: true,
       notification: true,
       mediaScannable: true,
       title: `test.pdf`,
       path: `${dirs.DownloadDir}/test.pdf`,
       },
     })
        // const ref_number = '123456789_290322_1';
        // axios.defaults.headers.common["Content-Type"] = "application/json";
        // axios
        //   .get(`${endUrl.annexure}?ref_number=${ref_number}`)
        //   .then((res) => {
        //      setAnnexure(res?.data);
        //   })
        //   .catch((e) => {
        //     console.log("apicall", e);
        //   });
       .fetch('GET', 'http://www.africau.edu/images/default/sample.pdf', {})
       .then((res) => {
         console.log('The file saved to ', res.path());
       })
       .catch((e) => {
         console.log(e)
       });
   }

  const downloadFile = async() => {
      console.log("hello")
      try {
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            actualDownload();
          } else {
            Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
          }
        } catch (err) {
          console.warn(err);
        } 
    }

  const isPermitted = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs access to Storage data',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        alert('Write permission err', err);
        return false;
      }
    } else {
      return true;
    }
  };

  const createPDF = async () => {
    if (await isPermitted()) {
      const test = `${annexure}`;
      let options = {
        //Content to print
        html: test,
        //File Name
        fileName: 'test',
        //File directory
        directory: 'docs',
      };
      let file = await RNHTMLtoPDF.convert(options);
      console.log("filepath",file.filePath);
      setFilePath(file.filePath);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={styles.titleText}>
        Example to Make PDF in React Native from HTML Text
      </Text>
      <View style={styles.container}>
        <TouchableOpacity onPress={createPDF}>
          <View>
            <Image
              //We are showing the Image from online
              source={{
                uri:
                  'https://raw.githubusercontent.com/AboutReact/sampleresource/master/pdf.png',
              }}
              style={styles.imageStyle}
            />
            <Text style={styles.textStyle}>Create PDF</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.textStyle}>{filePath}</Text>
        <TouchableOpacity onPress={()=> downloadFile()}>
                <Text>Download!!!</Text>
            </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Second;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    fontSize: 18,
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  imageStyle: {
    width: 150,
    height: 150,
    margin: 5,
    resizeMode: 'stretch',
  },
});