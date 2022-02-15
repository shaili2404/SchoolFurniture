import React from "react";
import {View, Text} from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { loginReducer } from "../redux/reducers/loginReducer";
import First from '../First';
import Second from '../Second';

const Stack = createNativeStackNavigator();

const AppStack = (props) => {
    //  const user = props.loginReducer;
    //  console.log("user",user);

  return (
    <Stack.Navigator initialRouteName="First">
      <Stack.Screen name="First" component={First} />
      <Stack.Screen name="Second" component={Second} />
    </Stack.Navigator>
  );
};

export default AppStack;
