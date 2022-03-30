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
} from 'react-native';

// Import HTML to PDF
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import endUrl from "../src/redux/configration/endUrl";

const Second = () => {
  const [filePath, setFilePath] = useState('');
  const [annexure, setAnnexure] = useState(``);
  const route = useRoute();
  const { ref_number } = route.params;
  //const { value } = route.params; 
  console.log("name",ref_number);
//   console.log("cat",annexure);

  const annexureApi = () => {
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
      const test = `${annexure}`
    //   `
    //   <!DOCTYPE html>
    //   <html lang="en">
      
    //   <head>
    //       <meta charset="UTF-8">
    //       <meta http-equiv="X-UA-Compatible" content="IE=edge">
    //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //       <title>Document</title>
    //       <style>
    //       </style>
    //   </head>
      
    //   <body>
      
    //       <table width="800" border="0" align="center" cellpadding="0" cellspacing="0">
    //           <tbody>
    //               <tr>
    //                   <td align="center" valign="top"
    //                       style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#000;background-color:#fff; ">
    //                       <table width="800" border="0" align="center" cellpadding="0" cellspacing="0">
    //                           <tbody>
    //                               <tr>
    //                                   <td align="left" valign="top"
    //                                       style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#000;background-color:#c00000;padding:10px; border: 1px solid #000;">
      
    //                                       <table width="100%" border="0" cellspacing="0" cellpadding="0">
    //                                           <tbody>
    //                                               <tr>
    //                                                   <td width="300" height="80" align="left" valign="top"><img
    //                                                           src="dinnovation-Logo.png" alt="Avenues" title="Avenues"
    //                                                           width="300" height="80" class="CToWUd"> </td>
    //                                                   <td width="500" align=" right" valign="center"
    //                                                       style="font-family:Arial,Helvetica,sans-serif;font-size:28px;color:#fff;">
    //                                                       <strong>Furniture Collection Slip No.[ ]</strong>
    //                                                   </td>
    //                                               </tr>
    //                                           </tbody>
    //                                       </table>
    //                                   </td>
    //                               </tr>
    //                               <tr>
    //                                   <td>
    //                                       <table width="100%" border="0" cellspacing="0" cellpadding="10"
    //                                           style="border: 1px solid red;">
    //                                           <tbody>
    //                                               <tr>
    //                                                   <td width="500" align=" left" valign="top"
    //                                                       style="font-family:Arial,Helvetica,sans-serif;">
    //                                                       <p style="font-size: 18px;margin: 0;">The Principal</p>
    //                                                       <br>
    //                                                       <p
    //                                                           style="font-size: 18px; font-weight: bold;margin: 0; text-transform: uppercase;">
    //                                                           [NAME OF SCHOOL]${value}</p>
    //                                                       <br>
    //                                                       <p
    //                                                           style="font-size: 18px; font-weight: bold; line-height: 1; margin: 0; text-transform: uppercase;">
    //                                                           [emis number] - [district]
    //                                                       </p>
    //                                                   </td>
    //                                                   <td width="300" height="80" align="left" valign="top"><img
    //                                                           src="../assets/img/logo.png" alt="Avenues" title="Avenues"
    //                                                           width="300" height="80" class="CToWUd"> </td>
    //                                               </tr>
    //                                           </tbody>
    //                                       </table>
    //                                   </td>
    //                               </tr>
    //                               <tr>
    //                                   <td>
    //                                       <table width="800" border="0" align="center" cellpadding="0" cellspacing="0"
    //                                           style="border: 1px solid red;">
    //                                           <tbody>
    //                                               <tr>
    //                                                   <td width="100%" height="20px"></td>
    //                                               </tr>
    //                                           </tbody>
    //                                       </table>
    //                                   </td>
    //                               </tr>
    //                               <tr>
    //                                   <td>
    //                                       <table width="800" border="0" align="center" cellpadding="10" cellspacing="0"
    //                                           style="border: 1px solid red;">
    //                                           <tbody>
    //                                               <tr>
    //                                                   <td width="100%">
      
    //                                                       <p style="font-size:18px; margin-bottom: 0;">
    //                                                           In response to your Furniture Collection Request, <b> [Refernce
    //                                                               Number]</b>,this serves as record of collection of
    //                                                           furniture, as
    //                                                           follows:-</p>
    //                                                   </td>
    //                                               </tr>
    //                                           </tbody>
    //                                       </table>
    //                                   </td>
    //                               </tr>
    //                               <tr>
    //                                   <td>
    //                                       <table width="800" border="1" align="center" cellpadding="0" cellspacing="0"
    //                                           style="text-align: center; border: 1px solid red; font-size: 18px;">
    //                                           <thead>
    //                                               <th width="400" height="25" style="width: 400px; height: 25px;">Furniture
    //                                                   Description</th>
    //                                               <th width="150" height="25" style="width: 150px; height: 25px;">Qty Reported
    //                                               </th>
    //                                               <th width="150" height="25" style="width: 150px; height: 25px;">Qty
    //                                                   Collected</th>
    //                                               <th width="200" height="25" style="width: 200px; height: 25px;">Comments
    //                                               </th>
    //                                           </thead>
    //                                           <tbody>
    //                                               <tr height="25">
    //                                                   <td>[Dpuble Combination Dest - Sec]</td>
    //                                                   <td>[50]</td>
    //                                                   <td>48(Hand Write)</td>
    //                                                   <td>(Hand Write)</td>
    //                                               </tr>
    //                                               <tr height="25">
    //                                                   <td>[Dpuble Combination Dest - Sec]</td>
    //                                                   <td>[50]</td>
    //                                                   <td>48(Hand Write)</td>
    //                                                   <td>(Hand Write)</td>
    //                                               </tr>
    //                                               <tr height="25">
    //                                                   <td></td>
    //                                                   <td></td>
    //                                                   <td></td>
    //                                                   <td></td>
    //                                               </tr>
    //                                               <tr height="25">
    //                                                   <td></td>
    //                                                   <td></td>
    //                                                   <td></td>
    //                                                   <td></td>
    //                                               </tr>
    //                                               <tr height="25">
    //                                                   <td></td>
    //                                                   <td></td>
    //                                                   <td></td>
    //                                                   <td></td>
    //                                               </tr>
    //                                               <tr height="25">
    //                                                   <td></td>
    //                                                   <td></td>
    //                                                   <td></td>
    //                                                   <td></td>
    //                                               </tr>
    //                                               <tr height="25">
    //                                                   <td></td>
    //                                                   <td></td>
    //                                                   <td></td>
    //                                                   <td></td>
    //                                               </tr>
    //                                               <tr height="25">
    //                                                   <td></td>
    //                                                   <td></td>
    //                                                   <td></td>
    //                                                   <td></td>
    //                                               </tr>
    //                                               <tr height="25">
    //                                                   <td></td>
    //                                                   <td></td>
    //                                                   <td></td>
    //                                                   <td></td>
    //                                               </tr>
    //                                               <tr height="25">
    //                                                   <td></td>
    //                                                   <td></td>
    //                                                   <td></td>
    //                                                   <td></td>
    //                                               </tr>
    //                                               <tr>
    //                                                   <td colspan="2">
    //                                                       <p style="text-align:justify;padding:0 5px;margin:0;color: #000;">
    //                                                           It is confirmed that furniture items were collected by the
    //                                                           Department's Repair Agent as per quantities indicated in the Qty
    //                                                           Collected Column
    //                                                       </p>
    //                                                       <br><br>
    //                                                       <table width="100%" border="0" cellspacing="0" cellpadding="5"
    //                                                           style="font-size:18px; border-top:2px solid #000 ;text-align: left; ">
    //                                                           <tbody>
    //                                                               <tr>
    //                                                                   <td width="100%">
    //                                                                       <span style="float: left;">Principal Name (OR
    //                                                                           Designate) </span>
    //                                                                   </td>
    //                                                               </tr>
    //                                                           </tbody>
    //                                                       </table>
    //                                                       <br><br>
    //                                                       <table width="100%" border="0" cellspacing="0" cellpadding="5"
    //                                                           style="font-size:18px; border-top:2px solid #000 ;text-align: left; ">
    //                                                           <tbody>
    //                                                               <tr>
    //                                                                   <td width="60%">
    //                                                                       <span style="float: left;">Signature </span>
    //                                                                   </td>
    //                                                                   <td width="40%">
    //                                                                       <span style="float: left;">Date </span>
    //                                                                   </td>
    //                                                               </tr>
    //                                                           </tbody>
    //                                                       </table>
      
    //                                                   </td>
    //                                                   <td colspan="2">
    //                                                       <p
    //                                                           style="font-size: 18px; font-weight: bold; text-align:center;padding:0 5px;margin:0">
    //                                                           [SCHOOL STAMP]
    //                                                       </p>
    //                                                       <br>
    //                                                       <p
    //                                                           style="font-size: 18px; font-weight: bold; text-align:center;padding:0 5px;margin:0">
    //                                                           OR</p>
    //                                                       <br>
    //                                                       <p
    //                                                           style="font-size: 18px; font-weight: bold; text-align:center;padding:0 5px;margin:0">
    //                                                           PERSAL No:__________
    //                                                       </p>
    //                                                   </td>
    //                                               </tr>
      
      
    //                                           </tbody>
    //                                       </table>
    //                                   </td>
    //                               </tr>
    //                               <tr>
    //                                   <td>
    //                                       <table width="800" border="0" align="center" cellpadding="5" cellspacing="0"
    //                                           style="border: 1px solid red;">
    //                                           <tbody>
    //                                               <tr>
    //                                                   <td width="100%">
      
    //                                                       <p style="font-size:18px; color: #000;">
    //                                                           It is confirmed that furniture items were collected as per
    //                                                           quantities indicated in the Qty collected Column. The Online
    //                                                           Furniture Applicaiton has been updated accordingly/shall be
    //                                                           updated within 24 hours. </p>
    //                                                       <br>
    //                                                       <table width="100%" border="0" cellspacing="0" cellpadding="5"
    //                                                           style="font-size:18px;color: #000; border-top:2px solid #000 ;text-align: left; ">
    //                                                           <tbody>
    //                                                               <tr>
    //                                                                   <td width="100%">
    //                                                                       <span style="float: left;">Driver Name: </span>
    //                                                                   </td>
    //                                                               </tr>
    //                                                           </tbody>
    //                                                       </table>
      
    //                                                       <br>
    //                                                       <br>
    //                                                       <br>
    //                                                       <table width="100%" border="0" cellspacing="0" cellpadding="5"
    //                                                           style="font-size:18px;color: #000; border-top:2px solid #000 ;text-align: left; ">
    //                                                           <tbody>
    //                                                               <tr>
    //                                                                   <td width="80%">
    //                                                                       <span style="float: left;">Signature </span>
    //                                                                   </td>
    //                                                                   <td width="20%">
    //                                                                       <span style="float: left;">Date </span>
    //                                                                   </td>
    //                                                               </tr>
    //                                                           </tbody>
    //                                                       </table>
      
    //                                                   </td>
    //                                               </tr>
    //                                           </tbody>
    //                                       </table>
    //                                   </td>
    //                               </tr>
    //                               <tr>
    //                                   <td>
    //                                       <table width="800" border="0" align="center" cellpadding="0" cellspacing="0"
    //                                           style="border: 1px solid red;">
    //                                           <tbody>
    //                                               <tr>
    //                                                   <td width="100%" height="25px"></td>
    //                                               </tr>
    //                                           </tbody>
    //                                       </table>
    //                                   </td>
    //                               </tr>
    //                           </tbody>
      
    //                       </table>
    //                   </td>
    //               </tr>
      
    //           </tbody>
    //       </table>
    //   </body>
      
    //   </html>
    //   `
      ;
      let options = {
        //Content to print
        html: test,
        //File Name
        fileName: 'test',
        //File directory
        directory: 'docs',
      };
      let file = await RNHTMLtoPDF.convert(options);
      console.log(file.filePath);
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