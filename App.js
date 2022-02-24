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
import { navigationRef } from './src/routes/rootNavigation';
// import SplashScreen from 'react-native-splash-screen';

// const Stack = createNativeStackNavigator();
import { FurnitureRequest } from './src/screen/school/FurnitureRequestScreen/furniturerequestscreen';
import { ManageUserDoe } from './src/screen/manufacturer/ManageUserScreen/manageuserscreen';
import { EditAddUserModal } from './src/component/doe/EditAddUserModal/editAdduserModal';
import { Functionalities } from './src/component/doe/Functionalitiesuser';
import { AlertMessage } from './src/Alert/alert';
import { LoginScreen } from './src/screen/LoginScreen/index';
import { SchoolDistrictList } from './src/screen/manufacturer/maintenance/SchoolMaintenance/SchoolDistrict/schooldistrictlist'
import PasswordReset from './src/screen/PasswordReset';
import EmailSent from './src/component/emailSent';
import { DataDisplayList } from './src/component/manufacturer/displayListComman';
import { AddUserModal } from './src/component/manufacturer/AddFormModal/AddFormModal';
import { SchoolList } from './src/screen/manufacturer/maintenance/SchoolMaintenance/School/schoolList';
// import { Schoolmaintenancescreen } from './src/screen/Manufacturer/SchoolMaintenance/';

const App = () => {

  return (
    <NavigationContainer ref={navigationRef}>
      <Provider store={store}>
        {/* <AppStack /> */}
        {/* <LoginScreen /> */}
        {/* <FurnitureRequest /> */}
        {/* <PasswordReset /> */}
        {/* <EmailSent /> */}
        {/* <ManageUserDoe /> */}
        {/* <EditAddUserModal/> */}
        {/* <Functionalities/> */}
        {/* <AlertMessage/> */}
        {/* <Schoolmaintenancescreen /> */}
        {/* <SchoolDistrictList /> */}
        {/* <DataDisplayList /> */}
        {/* <AddUserModal/> */}
        <SchoolList/>
      </Provider>
    </NavigationContainer>
  )
}

export default App;
