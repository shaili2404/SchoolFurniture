// Example of File Picker in React Native
// https://aboutreact.com/file-picker-in-react-native/

// Import React
import React, {useState} from 'react';
// Import required components
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

// Import Document Picker
import DocumentPicker from 'react-native-document-picker';
import axios from "axios";
import endUrl from './redux/configration/endUrl';

const App = () => {
  const [singleFile, setSingleFile] = useState([]);
  const [multipleFile, setMultipleFile] = useState([]);

  const selectOneFile = async () => {
    //Opening Document Picker for selection of one file
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        //There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      for (const res of result) {
      }
      //Setting the state to show single file attributes
      setSingleFile(result);
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
        type: [DocumentPicker.types.images],
        //There can me more options as well find above
      });
      for (const res of results) {
        //Printing the log realted to the file
       
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

  const onSubmitcollectionRequest = async () => {
    // setLoader(true);

  //  let obj = {};
  //  confirmCollectedCount.map((ele) => {
  //    obj[ele?.id] = Number(ele?.confirm_count);
  //  });


   const url = `${Config.API_URL}${endUrl.uploadSignedDelivery}`

   let body = new FormData();

   imgData.forEach((img) => {
     const name = Platform.OS == "ios" ? img.filename : img.path.substring(img.path.lastIndexOf('/') + 1)
     body.append('upload_proof[]', {
       uri: Platform.OS == "ios" ? img.sourceURL : img.path,
       type: img.mime,
       name: name,
       filename: name
     })
   })
   for (const [key, value] of Object.entries(obj)) {
     body.append(`confirm_count[${key}]`, `${value}`);
   }
   body.append("ref_number", ref_number); 


   const uploadImg = async () => {
     try {
       let response = await fetch(url, {
         method: "POST",
         headers: {
           'Content-Type': 'multipart/form-data',
           "Authorization": `Bearer${token}`
         },
         body: body
       });
       let res = await response.json();
       if (response.ok) {
        //  setSuccessAlert(true);
        //  setLoader(false);
        //  setMainMsg(res?.message);
      
       } else {
         ErrorApi(res, "collection");
       }
     } catch (err) {
     }
   }

   uploadImg();
 };

  return (
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
        <TouchableOpacity style={{alignItems: "center",
    justifyContent: "center",
    width: 342,
    height: 41,
    backgroundColor: '#46A346'}} onPress={()=> onSubmitcollectionRequest()}>
        <Text style={{fontSize: 18, color: '#fff'}}>Submit</Text>
      </TouchableOpacity>
      </View>
     
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
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