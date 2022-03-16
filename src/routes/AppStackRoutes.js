import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SplashScreen from "react-native-splash-screen";
import First from "../First";
import Second from "../Second";
import PasswordReset from "../screen/PasswordReset/index";
import DrawerSideBar from "../DrawerSideBar";
import NavigationRouteNames from "./ScreenNames";
import { USER_ROLE } from "./Constants";
import { LoginScreen } from "../screen/LoginScreen";
import EmailSent from "../component/emailSent";
import { useSelector } from "react-redux";
import { Schoolmaintenancescreen } from "../screen/Manufacturer/maintenance/SchoolMaintenance/schoolmaintenancescreen";
import { ManageUserScreen } from "../screen/Manufacturer/ManageUserScreen/manageuserscreen";
import { SchoolDistrictList } from "../screen/Manufacturer/maintenance/SchoolMaintenance/SchoolDistrict/schooldistrictlist";
import { SchoolList } from "../screen/Manufacturer/maintenance/SchoolMaintenance/School/schoolList";
import AddNewUsers from "../screen/Manufacturer/AddNewUsers/AddNewUsers";
import { FurnitureReplacmentManfacturer } from "../screen/furniturereplacementScreen/furniturerequestscreen";
import { StockMaintenanceScreen } from "../screen/Manufacturer/maintenance/StockMaintenance/stockmaintenanncescreen";
import { Functionalities } from "../component/manufacturer/Functionalitiesuser";
import StockCategory from "../screen/Manufacturer/maintenance/StockCategory/StockCategory";
import { StockItems } from "../screen/Manufacturer/maintenance/StockMaintenance/stockItems/StockItems";
import { FurnitureReplacmentProcess } from "../screen/furniturereplacementScreen/FurnitureReplacpmentProcess/furnitureReplacmentProcessscreen";
import { AddFurRequestScreen } from "../screen/furniturereplacementScreen/AddRequestScreen/AddRequestScreen";

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
        name={NavigationRouteNames.MANAGEUSER}
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

  const loginData = useSelector((state) => state?.loginData);
  const token = loginData?.user?.data?.access_token;
  const role = loginData?.user?.data?.data?.user?.role;

  useEffect(() => {
    SplashScreen.hide();
  }, []);

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
              name={NavigationRouteNames.MANAGEUSER}
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

            {/* dummy Screen  */}
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
            {/* <Stack.Screen name="First" component={DrawerStack} /> */}
          </>
        );
    }
  };

  return (
    <Stack.Navigator initialRouteName={NavigationRouteNames.LOGINSCREEN}>
      {/* {!login ? ( */}
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

        {/* After Login Screen */}
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
          name={NavigationRouteNames.MANAGEUSER}
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

        {/* dummy Screen  */}
        <Stack.Screen
          name={NavigationRouteNames.ADDNEWUSERS}
          component={AddNewUsers}
          options={CommonHeaderStyle}
        />
        <Stack.Screen
          name={NavigationRouteNames.Functionalities}
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
        <Stack.Screen
          name={NavigationRouteNames.STOCKITEM}
          component={StockItems}
          options={CommonHeaderStyle}
        />
        <Stack.Screen
          name="FurnitureReplacmentProcess"
          component={FurnitureReplacmentProcess}
          options={CommonHeaderStyle}
        />
        <Stack.Screen
          name="AddRequestFur"
          component={AddFurRequestScreen}
          options={{ headerShown: false }}
        />
      </>
      {/* ) : (
        SwitchNavigation("Manufacturer")
      )} */}
    </Stack.Navigator>
  );
};

export default AppStack;