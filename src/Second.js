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
  ScrollView,
} from 'react-native';

// Import HTML to PDF
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import endUrl from "./redux/configration/endUrl";
import RNFetchBlob from 'rn-fetch-blob';
import DocumentPicker from 'react-native-document-picker';

const Second = () => {
  const [filePath, setFilePath] = useState('');
  const [annexure, setAnnexure] = useState(``);
  const route = useRoute();
  const [singleFile, setSingleFile] = useState([]);
  const [multipleFile, setMultipleFile] = useState([]);
//   const [imageSet, updateImageSet] = useState([]);
//   const [isPickerVisible, setPickerVisibility] = useState(true);
//   const [isPreviewVisible, setPreviewVisibility] = useState(false);
//   const [progress, setProgress] = useState(false)
//   const closeWindow = () => {
//     handleClose();
//     setPickerVisibility(true);
//     setPreviewVisibility(false);
//     setProgress(false)
//     updateImageSet([]);
// };   
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

//   const openDocPicker = async () => {
//     try {
//         const res = await DocumentPicker.pick({
//             type: [DocumentPicker.types.pdf],
//         });
//         console.log('res', res);
//         handleUpload({base64: '', file: res.uri, type:res.type});
//         closeWindow();
//     } catch (err) {
//         console.log('err', err);
//         if (DocumentPicker.isCancel(err)) {
//             closeWindow();
//         } else {
//             throw err;
//         }
//     }
// };

// const selectOneFile = () => {
//   console.log("multi",multipleFile)
//   var photo = {
//     uri: multipleFile[0].uri,
//     type: multipleFile[0].type,
//     name: multipleFile[0].name,
// };
// console.log("photo",photo)

//    const form = new FormData();
//   form.append("image[]", photo);
//   // {
//   //   uri: imgData[0].sourceURL,
    
//   //   type: imgData[0].mime,
//   //   name: imgData[0].filename,
//   // });
//   // form.append("confirm_count[1]", 2);
//   // form.append("ref_number", 123456);
//   form.append('status',2)

  
//   const url = 'https://furnitureapp.php-dev.in/api/test'

//   axios({
//     url: url,
//     method: 'POST',
//     data: form,
//     headers: {
//       // Accept: 'application/json',
//       'Content-Type': 'multipart/form-data',
//       // 'token':`eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZnVybml0dXJlYXBwLnBocC1kZXYuaW5cL2FwaVwvbG9naW4iLCJpYXQiOjE2NDkxNjY2NDYsImV4cCI6MTY0OTE3MDI0NiwibmJmIjoxNjQ5MTY2NjQ2LCJqdGkiOiJMQVROcTJsdXJuQ0JQZ3pmIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.B9iLdu56sqOPevazqY1jewAljzZrcNjr6e0qTSwwzx8`,
//       // 'Host': 'furnitureapp.php-dev.in',
//       // 'Content-Length': form.length
//     },
//   }).then((res) => {
//     console.log("response", res)
//   }).catch((err) => {
//     console.log("error", err)
//   })
// }

const selectOneFile = async () => {
  //Opening Document Picker for selection of one file
  try {
    const resu = await DocumentPicker.pick({
      type: [DocumentPicker.types.images],
      //There can me more options as well
      // DocumentPicker.types.allFiles
      // DocumentPicker.types.images
      // DocumentPicker.types.plainText
      // DocumentPicker.types.audio
      // DocumentPicker.types.pdf
    });
    for (const res of resu) {
    //Printing the log realted to the file
    console.log('resp : ' + JSON.stringify(res));
    console.log('URI : ' + res.uri);
    console.log('Type : ' + res.type);
    console.log('File Name : ' + res.name);
    console.log('File Size : ' + res.size);
    }
    //Setting the state to show single file attributes
    setSingleFile(resu);
  } catch (err) {
    //Handling any exception (If any)
    if (DocumentPicker.isCancel(err)) {
      //If user canceled the document selection
      alert('Canceled from single doc picker');
    } else {
      //For Unknown Error
      alert('Unknown Error: ' + JSON.stringify(err));
      throw err;
    }
  }
};

const selectMultipleFile = async () => {
  //Opening Document Picker for selection of multiple file
  try {
    const results = await DocumentPicker.pickMultiple({
      type: [DocumentPicker.types.allFiles],
      //There can me more options as well find above
    });
    for (const res of results) {
      //Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + res.uri);
      console.log('Type : ' + res.type);
      console.log('File Name : ' + res.name);
      console.log('File Size : ' + res.size);
    }
    //Setting the state to show multiple file attributes
    setMultipleFile(results);
  } catch (err) {
    //Handling any exception (If any)
    if (DocumentPicker.isCancel(err)) {
      //If user canceled the document selection
      alert('Canceled from multiple doc picker');
    } else {
      //For Unknown Error
      alert('Unknown Error: ' + JSON.stringify(err));
      throw err;
    }
  }
};

{
  console.log("single", singleFile);
}
{
  console.log("singlename", singleFile[0].name);
}

  return (
    // <SafeAreaView style={{flex: 1}}>
    //   <Text style={styles.titleText}>
    //     Example to Make PDF in React Native from HTML Text
    //   </Text>
    //   <View style={styles.container}>
    //     <TouchableOpacity onPress={createPDF}>
    //       <View>
    //         <Image
    //           //We are showing the Image from online
    //           source={{
    //             uri:
    //               'https://raw.githubusercontent.com/AboutReact/sampleresource/master/pdf.png',
    //           }}
    //           style={styles.imageStyle}
    //         />
    //         <Text style={styles.textStyle}>Create PDF</Text>
    //       </View>
    //     </TouchableOpacity>
    //     <Text style={styles.textStyle}>{filePath}</Text>
    //     <TouchableOpacity onPress={()=> downloadFile()}>
    //             <Text>Download!!!</Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity onPress={()=> openDocPicker()}>
    //             <Text>document pick!!!</Text>
    //         </TouchableOpacity>
    //   </View>
    // </SafeAreaView>
    <SafeAreaView style={{flex: 1}}>
      <Text style={styles.titleText}>
        Example of File Picker in React Native
      </Text>
      <View style={styles.container}>
        {/*To show single file attribute*/}
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={selectOneFile}>
          {/*Single file selection button*/}
          <Text style={{marginRight: 10, fontSize: 19}}>
            Click here to pick one file
          </Text>
          <Image
            source={{
              uri: 'https://img.icons8.com/offices/40/000000/attach.png',
            }}
            style={styles.imageIconStyle}
          />
        </TouchableOpacity>
        {/*Showing the data of selected Single file*/}
        {singleFile.map((item, key) => (
            <View key={key}>
        <Text style={styles.textStyle}>
          File Name: {item.name ? item.name : ''}
          {'\n'}
          Type: {item.type ? item.type : ''}
          {'\n'}
          File Size: {item.size ? item.size : ''}
          {'\n'}
          URI: {item.uri ? item.uri : ''}
          {'\n'}
        </Text>
        </View>
        ))}
        <View
          style={{
            backgroundColor: 'grey',
            height: 2,
            margin: 10
          }} />
        {/*To multiple single file attribute*/}
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={selectMultipleFile}>
          {/*Multiple files selection button*/}
          <Text style={{marginRight: 10, fontSize: 19}}>
            Click here to pick multiple files
          </Text>
          <Image
            source={{
              uri: 'https://img.icons8.com/offices/40/000000/attach.png',
            }}
            style={styles.imageIconStyle}
          />
        </TouchableOpacity>
        <ScrollView>
          {/*Showing the data of selected Multiple files*/}
          {multipleFile.map((item, key) => (
            <View key={key}>
              <Text style={styles.textStyle}>
                File Name: {item.name ? item.name : ''}
                {'\n'}
                Type: {item.type ? item.type : ''}
                {'\n'}
                File Size: {item.size ? item.size : ''}
                {'\n'}
                URI: {item.uri ? item.uri : ''}
                {'\n'}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Second;

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   padding: 10,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  // },
  // titleText: {
  //   fontSize: 22,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   paddingVertical: 20,
  // },
  // textStyle: {
  //   fontSize: 18,
  //   padding: 10,
  //   color: 'black',
  //   textAlign: 'center',
  // },
  // imageStyle: {
  //   width: 150,
  //   height: 150,
  //   margin: 5,
  //   resizeMode: 'stretch',
  // },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    color: 'black',
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    padding: 5,
  },
  imageIconStyle: {
    height: 20,
    width: 20,
    resizeMode: 'stretch',
  },
});