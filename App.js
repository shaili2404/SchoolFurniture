import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import {
  Text,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppStack from './src/routes';
// import SplashScreen from 'react-native-splash-screen';

// const Stack = createNativeStackNavigator();
import { FurnitureRequest } from './src/screen/school/FurnitureRequestScreen/furniturerequestscreen';
import { ManageUserDoe } from './src/screen/doe/ManageUserScreen/manageuserscreen';
import { EditAddUserModal } from './src/component/doe/EditAddUserModal/editAdduserModal';
import { Functionalities } from './src/component/doe/Functionalitiesuser';
import { AlertMessage } from './src/Alert/alert';
import { LoginScreen } from './src/screen/LoginScreen/index';

import PasswordReset from './src/screen/PasswordReset';
import EmailSent from './src/component/emailSent';
// import { Schoolmaintenancescreen } from './src/screen/Manufacturer/SchoolMaintenance/';
import { SchoolDistrictList } from './src/screen/doe/maintenance/SchoolMaintenance/SchoolDistrict/schooldistrictlist';

const App = () => {

  return (
    <NavigationContainer>
      <Provider store={store}>
        <AppStack />
        {/* <LoginScreen /> */}
        {/* <FurnitureRequest /> */}
        {/* <PasswordReset /> */}
        {/* <EmailSent /> */}
        {/* <ManageUserDoe /> */}
        {/* <EditAddUserModal/> */}
        {/* <Functionalities/> */}
        {/* <AlertMessage/> */}
        {/* <Schoolmaintenancescreen /> */}
        {/* <SchoolDistrictList/> */}
      </Provider>
    </NavigationContainer>
  )
}

export default App;
