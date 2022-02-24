import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SplashScreen from "react-native-splash-screen";
import { loginReducer } from "../redux/reducers/loginReducer";
import First from "../First";
import Second from "../Second";
import PasswordReset from "../screen/PasswordReset/index"
// import DrawerSideBar from "../containers/DrawerSideBar/index";
import DrawerSideBar from "../DrawerSideBar";
import NavigationRouteNames from "./ScreenNames";
//import LoginScreen from './src/screen/LoginScreen/loginscreen';
// import PasswordReset from "../screen/PasswordReset/index";
import { LoginScreen } from "../screen/LoginScreen";
import EmailSent from "../component/emailSent";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerSideBar {...props} />}>
      {/* <Drawer.Screen component={First} name="First" /> */}
      <Drawer.Screen component={LoginScreen} name="LoginScreen" options={{ headerShown: false }} />
      <Drawer.Screen component={PasswordReset} name="PasswordReset" options={{ headerShown: false }} />
      <Drawer.Screen component={First} name="First" />
    </Drawer.Navigator>
  );
};

const AppStack = (props) => {

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
            {/* Dashboard SCREEN */}
            <Stack.Screen
              name={NavigationRouteNames.HOME_SCREEN}
              component={DrawerStack}
            />
            <Stack.Screen
              name={NavigationRouteNames.SECOND}
              component={Second}
            />
          </>
        );

      case USER_ROLE.SCHOOL:
        return (
          <>
            {/* Dashboard SCREEN */}
            <Stack.Screen
              name={NavigationRouteNames.HOME_SCREEN}
              component={DrawerStack}
            />
            <Stack.Screen
              name={NavigationRouteNames.SECOND}
              component={Second}
            />
          </>
        );

      case USER_ROLE.DOE:
        return (
          <>
            {/* Dashboard SCREEN */}
            <Stack.Screen
              name={NavigationRouteNames.HOME_SCREEN}
              component={DrawerStack}
            />
            <Stack.Screen
              name={NavigationRouteNames.SECOND}
              component={Second}
            />
          </>
        );

      default:
        return (
          <>
            {/* Login SCREEN */}
            <Stack.Screen
              name={NavigationRouteNames.LOGIN}
              component={login}
              options={NoHeaderScreen}
            />

            <Stack.Screen
              name={NavigationRouteNames.FORGOT_PASSWORD}
              component={forgot_password}
              options={NoHeaderScreen}
            />
          </>
        );
    }
  };

  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={DrawerStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Second" component={Second} />
      <Stack.Screen name="PasswordReset" component={PasswordReset} />
      <Stack.Screen name="First" component={First} />
      <Stack.Screen name="EmailSent" component={EmailSent} />
    </Stack.Navigator>
    // <Drawer.Navigator>
    //   <Drawer.Screen name="First" component={First} />
    //   <Drawer.Screen name="Second" component={Second} />
    // </Drawer.Navigator>
  );
};

export default AppStack;
