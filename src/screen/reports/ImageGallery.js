import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView, Image, ImageViewer, Modal, Platform, PermissionsAndroid } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import constants from "./locales/constants";
import Fonts from './asset/Fonts';
import { RFValue } from 'react-native-responsive-fontsize';
import { STANDARD_SCREEN_SIZE } from './utils/constants';
import axios from 'axios'
import endUrl from './redux/configration/endUrl';

import { VictoryBar, VictoryChart, VictoryTheme, VictoryPie } from "victory-native";
// import ImageView from "react-native-image-viewing";
import { assertAnyTypeAnnotation } from '@babel/types';
import RNFetchBlob from 'rn-fetch-blob';

// import { Gallery } from 'react-native-gallery-view';

const ImageGallery = () => {
  const navigation = useNavigation();
  const [buttonStatus, setButtonStatus] = useState({})
  const [modalVisible, setModalVisible] = useState(false)
  const [imageData, setImageData] = useState("")


  const sampleData = [1,2,3,4,5,6,7,8,9];

  const sampleDat = [1,2,3,4,5,6,7];

  const images = [
    {
      uri: "https://st.depositphotos.com/1007995/1274/i/600/depositphotos_12746726-stock-photo-fashion-man-wearing- sunglasses-thinking.jpg",
    },
    {
      uri: "https://i.pinimg.com/originals/0b/44/e6/0b44e68d2fc68b0154811969eb588b96.jpg",
    },
    {
      uri: "https://s.yimg.com/ny/api/res/1.2/0wj9LndsMtHaLJU8.tTh3w--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MA--/https://s.yimg.com/cd/resizer/2.0/original/-Q7ql8v_Hy83ubHz_N1KOxjFLbo",
    },
    {
      uri: "https://media.istockphoto.com/photos/portrait-of-young-brunette-girl-in-denim-shirt-picture-id1321848051?b=1&k=20&m=1321848051&s=170667a&w=0&h=cMEZpGiFTT59FOtajf4YsHQB6Sqy8nFgeRwR0_rDSIs=",
    },
    {
      uri: "https://imgd.aeplcdn.com/664x374/n/cw/ec/40087/thar-exterior-right-front-three-quarter-11.jpeg?q=75",
    },
    {
      uri: "https://i.ndtvimg.com/i/2017-04/dc-design-mahindra-thar-concept_827x510_81493190581.jpg",
    },
    {
      uri: "https://st.depositphotos.com/1007995/1274/i/600/depositphotos_12746726-stock-photo-fashion-man-wearing- sunglasses-thinking.jpg",
    },
    {
      uri: "https://media.istockphoto.com/photos/portrait-of-young-brunette-girl-in-denim-shirt-picture-id1321848051?b=1&k=20&m=1321848051&s=170667a&w=0&h=cMEZpGiFTT59FOtajf4YsHQB6Sqy8nFgeRwR0_rDSIs=",
    },
  ];
  
   const [visible, setIsVisible] = useState(false);

  //  const fileUrl = 'https://www.techup.co.in/wp-content/uploads/2020/01/techup_logo_72-scaled.jpg';
  const fileUrl = imageData;

//    const photos [
//     {
//         label: 'beach',
//         src: require('../images/beach.jpg')
//     },
//     {
//         label: 'bridge',
//         src: require('../images/bridge.jpg')
//     },
//     {
//         label: 'fields',
//         src: require('../images/fields.jpg') 
//     },
//     {
//         label: 'mountains',
//         src: require('../images/mountains.jpg')
//     },
//     {
//         label: 'sunflower',
//         src: require('../images/sunflower.jpg')
//     },
//     {
//         label: 'sunset',
//         src: require('../images/sunset.jpg')
//     },
//     {
//         label: 'lake',
//         src: require('../images/lake.jpg')
//     },
//     {
//         label: 'nature',
//         src: require('../images/nature.jpg')
//     },
//     {
//         label: 'pink',
//         src: require('../images/pink.jpg')
//     },
//     {
//         label: 'rails',
//         src: require('../images/rails.jpg')
//     },
// ]

  // const [images, setImages] = useState([{
  //   src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRpGmKrfBFE90_MyomlXre9OJhLyjMvfGm5w&usqp=CAU",
  //   id: "12345"
  // }, {
  //   src: "https://st.depositphotos.com/1007995/1274/i/600/depositphotos_12746726-stock-photo-fashion-man-wearing- sunglasses-thinking.jpg",
  //   id: "12346"
  // }, {
  //   src: "https://i.pinimg.com/736x/36/fc/e9/36fce9ed325c3303d858b01257bd76c3.jpg",
  //   id: "12347"
  // }]);

  useLayoutEffect(() => {
    let title = 'Reports'
    navigation.setOptions({ title });
  }, []);

  const apicall = () => {
    // setLoader(true)
    axios
      .get(`${endUrl.dashboard_getButtonStatus}`)
      .then((res) => {
        setButtonStatus(res?.data?.data)
        // setLoader(false)
      })
      .catch((e) => setLoader(false))
  }

  useEffect(()=> {
     apicall()
  },[])

    // Function to check the platform
// If Platform is Android then check for permissions.
const checkPermission = async () => {

  if (Platform.OS === 'ios') {
    downloadFile();
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message:
            'Application needs access to your storage to download File',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Start downloading
        downloadFile();
       
      } else {
        // If permission denied then show alert
        Alert.alert('Error','Storage Permission Not Granted');
      }
    } catch (err) {
      // To handle permission related exception
      
    }
  }
};

  	
  const downloadFile = () => {
   
    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = fileUrl;    
    // Function to get extention of the file url
    let file_ext = getFileExtention(FILE_URL);
   
    file_ext = '.' + file_ext[0];
   
    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const { config, fs } = RNFetchBlob;
    let RootDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir+
          '/file_' + 
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext,
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,   
      },
    };
    config(options)
      .fetch('GET', FILE_URL)
      .then(res => {
        // Alert after successful downloading
       
        alert('File Downloaded Successfully.');
      });
  };

  const getFileExtention = fileUrl => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ?
             /[^.]+$/.exec(fileUrl) : undefined;
  };




  const showModal = () => {
    // this.setState({ modalVisible: true });
    setModalVisible(true)
  };

  const getPairsArray = (images) => {
    var pairs_r = [];
    var pairs = [];
    var count = 0;
    images.forEach((item) => {
      count += 1;
      pairs.push(item);
      if(count == 2){
        pairs_r.push(pairs)
        count = 0;
        pairs = [];
      }
    });
    return pairs_r;
}

  const renderGallery = () => {
    var count = 0;
    var previous_item = '';
    var pairs = getPairsArray(images);
    return images.map((item, index) => {
        return (
          <TouchableOpacity onPress={()=>{ setImageData(item.uri), setModalVisible(true)}}>
            <View style={styles.item} key={index}>
                <Image 
                    resizeMode= 'cover'
                    style={styles.photo} 
                    // style={{ width: 450, height: 300, backgroundColor: "red" }}
                    //  source={item[0].uri} 
                    source={{
                      uri: item.uri,
                    }}
                    />

<View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
           <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Image 
            resizeMode= 'contain'
            style={{height: '100%', width: 370}}
            source={{
              uri: imageData,
            }}
          />
          <TouchableOpacity
        style={styles.butto}
        onPress={checkPermission}>
        <Text style={styles.text}>
          Download File
        </Text>
      </TouchableOpacity>
          <TouchableOpacity style={{bottom: 40}} onPress={() => setModalVisible(!modalVisible)}>
          <Text style={{color: '#000', fontSize: 15 }}>Close</Text>
          </TouchableOpacity>
          </View></View>
          {/* <ImageViewer imageUrls={images} /> */}
        </Modal>
        </View>
                {/* <Image 
                    // resizeMode={Image.cover} 
                     style={styles.photo} 
                     source={item[1].uri} 
                    // style={{ width: 450, height: 300, backgroundColor: "red" }}
                    // source={{
                    //   uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRpGmKrfBFE90_MyomlXre9OJhLyjMvfGm5w&usqp=CAU',
                    // }}
                    /> */}
            </View>
            </TouchableOpacity>
            
        );
    });
}

  return (
  //   <View style={{ height: '100%', justifyContent: 'center', backgroundColor: '#fff', 
  // }}>
  //     <Text style={{ textAlign: 'center', fontFamily: Fonts.bold, fontSize: RFValue(18, STANDARD_SCREEN_SIZE)    }}>Reports</Text>
  //   </View>
  <ScrollView>
  <View style={styles.container}>
    <VictoryChart
    theme={VictoryTheme.material}
    domainPadding={{ x: 10, y: 20 }}
  >
    <VictoryBar horizontal
      style={{
        data: { fill: "#c43a31" }
      }}
      data={sampleData}
    />
  </VictoryChart>
  <VictoryPie
  colorScale={["yellow", "skyblue", "gold", "cyan", "navy","red", "pink" ]}
  data={sampleDat}
/>

<View style={styles.buttonView}>
  <View style={styles.flx}>
<TouchableOpacity style={[styles.button,{backgroundColor: '#FF6700'}]}>
        <Text style={styles.buttonText}>Pending Collections - {buttonStatus.pending_collection}</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.flx}>
      <TouchableOpacity style={[styles.button,{backgroundColor: '#C00000'}]}>
        <Text style={styles.buttonText}>Pending Repairs - {buttonStatus.pending_repairs}</Text>
      </TouchableOpacity>
      </View>
      </View>

      <View style={styles.buttonView}>
  <View style={styles.flx}>
<TouchableOpacity style={[styles.button,{backgroundColor: '#70B345'}]}>
        <Text style={styles.buttonText}>Total Deliveries - {buttonStatus.total_deliveries}</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.flx}>
      <TouchableOpacity style={[styles.button,{backgroundColor: '#5B9BD5'}]}>
        <Text style={styles.buttonText}>Pending Replenishments - {buttonStatus.pending_replenishments}</Text>
      </TouchableOpacity>
      </View>
      </View>

      <View style={styles.buttonView}>
  <View style={styles.flx}>
<TouchableOpacity style={[styles.button,{backgroundColor: '#21417C'}]}>
        <Text style={styles.buttonText}>Pending Deliveries - {buttonStatus.pending_deliveries}</Text>
      </TouchableOpacity>
      </View>
      </View>

      {/* <ImageView
  images={images}
  imageIndex={0}
  visible={visible}
  onRequestClose={() => setIsVisible(false)}
/> */}
{/* <View>
            <ScrollView style={styles.gallery}>
                { renderGallery() }
            </ScrollView>
        </View> */}
        <View style={{flex: 1,flexDirection: 'row',flexWrap: "wrap", marginLeft: 10}}>
        { renderGallery() }
        </View>


        {/* <View style={styles.contai}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 25, textAlign: 'center' }}>
          React Native File Download Example
        </Text>
       
      </View>
      <Image
        source={{
          uri: fileUrl,
        }}
        style={{
          width: '100%',
          height: 100,
          resizeMode: 'contain',
          margin: 5
        }}
      />
      <TouchableOpacity
        style={styles.butto}
        onPress={checkPermission}>
        <Text style={styles.text}>
          Download File
        </Text>
      </TouchableOpacity>
    </View> */}
        
</View>
</ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  }, 
  buttonView: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20
  },
  flx: {
    flex: 1,
  },
  buttonText: {
    fontSize: 12, 
    color: '#fff',
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 180,
    height: 41,
    borderRadius: 5,
  },

  containe: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 20
},
gallery: {
    flexDirection: 'row'
},
// tabs: {
//     flexDirection: 'row',
//     backgroundColor: '#333',
//     padding: 20
// },
// tab: {
//     flex: 1
// },
// icon: {
//     textAlign: 'center'
// },
 item: {
//    flex: 1,
//   // flexDirection: 'row',
   margin: 6,
},
photo: {
  width: 160,
  height: 150,
  // resizeMode: 'cover'
},
centeredView: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22
},
modalView: {
  margin: 20,
  backgroundColor: "white",
  borderRadius: 20,
  padding: 35,
  alignItems: "center",
  shadowColor: "#000",
  // shadowOffset: {
  //   width: 0,
  //   height: 2
  // },
  // shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5
  },

  contai: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    padding: 5,
  },
  butto: {
    width: '80%',
    // padding: 10,
    backgroundColor: 'blue',
    //  margin: 10,
    bottom: 60
  },
});

export default ImageGallery;