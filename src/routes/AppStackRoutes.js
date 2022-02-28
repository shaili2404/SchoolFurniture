import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SplashScreen from "react-native-splash-screen";
import First from "../First";
import Second from "../Second";
import PasswordReset from "../screen/PasswordReset/index"
import DrawerSideBar from "../DrawerSideBar";
import { getSaveData } from '../utils/helpers';
import { USER_ROLE } from "./Constants";
import { LoginScreen } from "../screen/LoginScreen";
import EmailSent from "../component/emailSent";
import { useSelector } from "react-redux";
import { Schoolmaintenancescreen } from "../screen/Manufacturer/maintenance/SchoolMaintenance/schoolmaintenancescreen";
import { ManageUserScreen } from "../screen/Manufacturer/ManageUserScreen/manageuserscreen";
import { SchoolDistrictList } from "../screen/Manufacturer/maintenance/SchoolMaintenance/SchoolDistrict/schooldistrictlist";
import { SchoolList } from "../screen/Manufacturer/maintenance/SchoolMaintenance/School/schoolList";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerSideBar {...props} />}>
      <Drawer.Screen component={First} name="First" />
      {/* <Drawer.Screen component={LoginScreen} name="LoginScreen" options={{ headerShown: false }} />
      <Drawer.Screen component={PasswordReset} name="PasswordReset" options={{ headerShown: false }} /> */}
      {/* <Drawer.Screen component={First} name="First" /> */}
    </Drawer.Navigator>
  );
};

const AppStack = (props) => {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    async function getToken() {
      const token = await getSaveData('token');
      console.log("hi", token);
      if (token != null) {
        setLogin(true)
      }
    };

    // async function getToken() {
    //   const token = await getSaveData("token");
    //   const role = await getSaveData(LOCAL_STORAGE_DATA_KEY.USER_ROLE);     
    //   if (token) {
    //     setLogin(true);
    //     setUserRole(role);
    //   }     
    //   setTimeout(() => {
    //     SplashScreen.hide();
    //   }, 2500);
    // };
    getToken();
  }, []);

  const loginData = useSelector((state) => state?.loginData);
  const token = loginData?.user?.data?.access_token;
  console.log("checkdata", token);
  const role = loginData?.user?.data?.data?.user?.role;
  console.log("checkdatarole", role);



  // useEffect(() => {
  //   // {
  //   //   Platform.OS === 'ios' ?
  //   //     null :
  //   //     SplashScreen.hide();
  //   // }
  //   setTimeout(() => {
  //     SplashScreen.hide();
  //   }, 2500);
  // }, []);

  useEffect(() => {
    SplashScreen.hide();
  }, [])

  //  const user = props.loginReducer;
  //  console.log("user",user);

  const SwitchNavigation = (role) => {
    switch (role) {
      case USER_ROLE.MANUFACTURER:
        return (
          <>
            <Stack.Screen
              name="First"
              component={DrawerStack}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Second"
              component={Second}
            />
            <Stack.Screen
              name="School Maintenance"
              component={Schoolmaintenancescreen}
            />
            <Stack.Screen
              name="Manage User"
              component={ManageUserScreen}
            />
            <Stack.Screen
              name="School District"
              component={SchoolDistrictList}
            />
            <Stack.Screen
              name="School"
              component={SchoolList}
            />
          </>
        );

      case USER_ROLE.SCHOOL:
        return (
          <>
            <Stack.Screen
              name="First"
              component={DrawerStack}
            />
            <Stack.Screen
              name="Second"
              component={Second}
            />
          </>
        );

      case USER_ROLE.DOE:
        return (
          <>
            <Stack.Screen
              name="First"
              component={DrawerStack}
            />
            <Stack.Screen
              name="Second"
              component={Second}
            />
          </>
        );

      default:
        return (
          <>
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
            />

            <Stack.Screen
              name="PasswordReset"
              component={PasswordReset}
            />
          </>
        );
    }
  };

  return (
    <Stack.Navigator initialRouteName={
      !login ? LoginScreen : First
    }>
      {!login ? (
        <>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="PasswordReset" component={PasswordReset} options={{ headerShown: false }} />
          <Stack.Screen name="EmailSent" component={EmailSent} />
          <Stack.Screen name="First" component={First} />
        </>
      ) :
        SwitchNavigation("manufacturer")
      }
    </Stack.Navigator>
  );
};

export default AppStack;
