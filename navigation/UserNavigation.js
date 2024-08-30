import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import React from "react";
import TabNavigation from "./TabNavigation";
import LoginScreen from "../screens/LoginScreen";
import UserScreen from "../screens/userScreen";
import ForgerPassScreen from "../screens/ForgetPassScreen";
import VerificationScreen from "../screens/VerificationScreen"
import ChangePass from "../screens/ChangePass"

const UserNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserScreen" component={UserScreen} />
    </Stack.Navigator>
  );
};

export default UserNavigation;

const styles = StyleSheet.create({});
