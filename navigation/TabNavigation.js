import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import HomeScreen from "@/screens/Homescreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Entypo from "react-native-vector-icons/Entypo";
import UserScreen from "@/screens/userScreen";
import SearchScreen from "@/screens/SearchScreen";
import FavoriteScreen from "@/screens/FavoriteScreen";

const Tab = createBottomTabNavigator();
const TabNavigation = () => {
  return (
      <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        elevation: 0,
        height: 'auto'
      },
      tabBarShowLabel: true}}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={({ route }) => ({
            tabBarIcon: ({ color, size }) => (
              <Entypo name="home" size={size} color={color}/>
            ),
            tabBarStyle: {
              backgroundColor: 'white',
            },
          })}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={({ route }) => ({
            tabBarIcon: ({ color, size }) => (
              <Entypo name="magnifying-glass" size={size} color={color}/>
            ),
            tabBarStyle: {
              backgroundColor: 'white',
            },
          })}
        />
        <Tab.Screen
          name="Favorite"
          component={FavoriteScreen}
          options={({ route }) => ({
            tabBarIcon: ({ color, size }) => (
              <Entypo name="heart" size={size} color={color}/>
            ),
            tabBarStyle: {
              backgroundColor: 'white',
            },
          })}
        />
        <Tab.Screen
          name="User"
          component={UserScreen}
          options={({ route }) => ({
            tabBarIcon: ({ color, size }) => (
              <Entypo name="user" size={size} color={color}/>
            ),
            tabBarStyle: {
              backgroundColor: 'white'
            },
          })}
        />
      </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({});
