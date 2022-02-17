import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { loginReducer } from "../redux/reducers/loginReducer";
import First from "../First";
import Second from "../Second";
// import DrawerSideBar from "../containers/DrawerSideBar/index";
import DrawerSideBar from "../DrawerSideBar";
import NavigationRouteNames from "./ScreenNames";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerSideBar {...props} />}>
      <Drawer.Screen component={First} name="First" />
    </Drawer.Navigator>
  );
};

const AppStack = (props) => {
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
    <Stack.Navigator initialRouteName="First">
      <Stack.Screen
        name="First"
        component={DrawerStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Second" component={Second} />
    </Stack.Navigator>
    // <Drawer.Navigator>
    //   <Drawer.Screen name="First" component={First} />
    //   <Drawer.Screen name="Second" component={Second} />
    // </Drawer.Navigator>
  );
};

export default AppStack;
