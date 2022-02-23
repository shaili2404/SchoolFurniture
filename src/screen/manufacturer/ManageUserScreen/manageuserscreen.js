import React,{useState} from 'react';
import Styles from './style'
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    FlatList,
    ScrollView,
    Image,
  } from "react-native";
  import COLORS from "../../../asset/color";
  import Images from "../../../asset/images";
  import { FurnitureRequestList } from "../../../component/school/furniturerequestList";
  
  import constants from "../../../locales/constants";
import { ListHeaderManageUser } from '../../../component/manufacturer/ListHeaderManageUser';
import { ManageUserList } from '../../../component/manufacturer/ManageUserList';
import Dummydatauser from '../../../component/dummyData/DummyDatauser';
export const ManageUserDoe = ()=>{
    const [dummyData, setDummyData] = useState(Dummydatauser);
    const rendercomponent = ({ item }) => {
      return (
        <ManageUserList
        Name={item.Name}
        Surname={item.Surname}
        Username={item.Username}
        Emailid={item.Emailid}
        Organisation={item.Organisation}
        />
      );
    };
    const HeaderComponet = () => {
      return <ListHeaderManageUser />;
    };
   
    return(
        <SafeAreaView style={Styles.mainView}>
      <View style={Styles.halfView}>
       
        <View>
        <TouchableOpacity style={Styles.eyeStyle}>
            <Image source={Images.SearchIcon} style={Styles.imgsStyle} />
          </TouchableOpacity>
          <TextInput
            style={Styles.refrenceStyle}
            placeholder={constants.searchText}
            placeholderTextColor={COLORS.Black}
            opacity={0.5}
          />
         
        </View>
       
          
         
       
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <FlatList
            ListHeaderComponent={HeaderComponet}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            data={dummyData}
            renderItem={rendercomponent}
          />
        </ScrollView>
      </View>
      <View style={Styles.lastView}>
        <TouchableOpacity >
        <Image source={Images.leftarrow} />
        </TouchableOpacity>
        <TouchableOpacity >
        <Image source={Images.rightarrow}  />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    )
}