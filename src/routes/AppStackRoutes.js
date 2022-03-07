import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SplashScreen from "react-native-splash-screen";
import First from "../First";
import Second from "../Second";
import PasswordReset from "../screen/PasswordReset/index";
// import DrawerSideBar from "../containers/DrawerSideBar/index";
import DrawerSideBar from "../DrawerSideBar";
import NavigationRouteNames from "./ScreenNames";
import { storeData, getSaveData, removeData, clearAll } from "../utils/helpers";
import { USER_ROLE } from "./Constants";
import { LoginScreen } from "../screen/LoginScreen";
import EmailSent from "../component/emailSent";
import { useSelector } from "react-redux";
import { Schoolmaintenancescreen } from "../screen/Manufacturer/maintenance/SchoolMaintenance/schoolmaintenancescreen";
import { ManageUserScreen } from "../screen/Manufacturer/ManageUserScreen/manageuserscreen";
import { SchoolDistrictList } from "../screen/Manufacturer/maintenance/SchoolMaintenance/SchoolDistrict/schooldistrictlist";
import { SchoolList } from "../screen/Manufacturer/maintenance/SchoolMaintenance/School/schoolList";
import AddNewUsers from "../screen/Manufacturer/AddNewUsers/AddNewUsers";
import { FurnitureReplacmentManfacturer } from "../screen/Manufacturer/furniturereplacementScreen/furniturerequestscreen";
import { StockMaintenanceScreen } from "../screen/Manufacturer/maintenance/StockMaintenance/stockmaintenanncescreen";
import { Functionalities } from "../component/manufacturer/Functionalitiesuser";
import StockCategory from "../screen/Manufacturer/maintenance/StockCategory/StockCategory";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const CommonHeaderStyle = { headerTitleStyle: { color: '#359934' } };

const DrawerStack = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerSideBar {...props} />}>
      <Drawer.Screen
        component={First}
        name="First"
        options={CommonHeaderStyle}
      />
    </Drawer.Navigator>
  );
};

const ManageUserDrawerStack = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerSideBar {...props} />}>
      <Drawer.Screen
        component={ManageUserScreen}
        name="Manage User"
        options={CommonHeaderStyle}
      />
    </Drawer.Navigator>
  );
};

const SchoolMaintenanceDrawerStack = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerSideBar {...props} />}>
      <Drawer.Screen
        name="School Maintenance"
        component={Schoolmaintenancescreen}
        options={CommonHeaderStyle}
      />
    </Drawer.Navigator>
  );
};

const FurnitureReplaceDrawerStack = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerSideBar {...props} />}>
      <Drawer.Screen
        name="Furniture Replacment"
        component={FurnitureReplacmentManfacturer}
        options={CommonHeaderStyle}
      />
    </Drawer.Navigator>
  );
};

const StockMaintenanceDrawerStack = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerSideBar {...props} />}>
            <Drawer.Screen 
              name={NavigationRouteNames.STOCKMAINTENANCE}
              component={StockMaintenanceScreen}
              options={CommonHeaderStyle}
            />
    </Drawer.Navigator>
  );
};



const AppStack = (props) => {
  const [login, setLogin] = useState(false);

  // useEffect(() => {
  //   async function getToken() {
  //     const token = await getSaveData("token");
  //     console.log("hi", token);
  //     if (token != null) {
  //       setLogin(true);
  //     }
  //   }
  //   getToken();
  // }, []);

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
  }, []);

  //  const user = props.loginReducer;
  //  console.log("user",user);

  const SwitchNavigation = (role) => {
    switch (role) {
      case USER_ROLE.Manufacturer:
        return (
          <>
            <Stack.Screen
              name={NavigationRouteNames.FIRST}
              component={DrawerStack}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={NavigationRouteNames.SECOND}
              component={Second}
              options={CommonHeaderStyle}
            />
            <Stack.Screen
              name="School Maintenance"
              component={SchoolMaintenanceDrawerStack}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Manage User"
              component={ManageUserDrawerStack}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="School District"
              component={SchoolDistrictList}
              options={CommonHeaderStyle}
            />
            <Stack.Screen
              name="School"
              component={SchoolList}
              options={CommonHeaderStyle}
            />
            <Stack.Screen
              name="Furniture Replacment"
              component={FurnitureReplaceDrawerStack}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name={NavigationRouteNames.ADDNEWUSERS}
              component={AddNewUsers}
              options={CommonHeaderStyle}
            />
          </>
        );

      case USER_ROLE.SCHOOL:
        return (
          <>
            <Stack.Screen name="First" component={DrawerStack} />
            <Stack.Screen name="Second" component={Second} />
          </>
        );

      case USER_ROLE.DOE:
        return (
          <>
            <Stack.Screen name="First" component={DrawerStack} />
            <Stack.Screen name="Second" component={Second} />
          </>
        );

      default:
        return (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="PasswordReset" component={PasswordReset} />
            <Stack.Screen name="First" component={DrawerStack} />
          </>
        );
    }
  };

  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <>
        <Stack.Screen
          name={NavigationRouteNames.LOGINSCREEN}
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={NavigationRouteNames.PASSWORDRESET}
          component={PasswordReset}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={NavigationRouteNames.EMAILSENT}
          component={EmailSent}
          options={CommonHeaderStyle}
        />

        <Stack.Screen
          name={NavigationRouteNames.FIRST}
          component={DrawerStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={NavigationRouteNames.SECOND}
          component={Second}
          options={CommonHeaderStyle}
        />
        <Stack.Screen
          name="School Maintenance"
          component={SchoolMaintenanceDrawerStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Manage User"
          component={ManageUserDrawerStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="School District"
          component={SchoolDistrictList}
          options={CommonHeaderStyle}
        />
        <Stack.Screen
          name="School"
          component={SchoolList}
          options={CommonHeaderStyle}
        />
        <Stack.Screen
          name="Furniture Replacment"
          component={FurnitureReplaceDrawerStack}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={NavigationRouteNames.ADDNEWUSERS}
          component={AddNewUsers}
          options={CommonHeaderStyle}
        />
        <Stack.Screen
          name="Functionalities"
          component={Functionalities}
          options={CommonHeaderStyle}
        />
        <Stack.Screen 
            name={NavigationRouteNames.STOCKMAINTENANCE}
            component={StockMaintenanceDrawerStack} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name={NavigationRouteNames.STOCKCATEGORY}
            component={StockCategory} 
            options={CommonHeaderStyle}
          />
      </>
      {/* ) : (
        SwitchNavigation("Manufacturer")
      )} */}
    </Stack.Navigator>
  );
};

export default AppStack;