import React from "react";
import { Home } from "../screens/Home";
import { MyCars } from "../screens/MyCars";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StackRoutes } from "./app.stack.routes";
import CarSVG from "../assets/car.svg";
import HomeSVG from "../assets/home.svg";
import PeopleSVG from "../assets/people.svg";
import { useTheme } from "styled-components";
import { Platform } from "react-native";
import { Profile } from "../screens/Profile";
import Forcesvg from '../assets/force.svg'
 
const { Navigator, Screen } = createBottomTabNavigator();

export function TabRoutes() {
  const theme = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 78,
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
          backgroundColor: theme.colors.background_primary,
        },
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.text_detail,
      }}
    >
      <Screen
        name="Home"
        component={StackRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <Forcesvg width={24} height={24}  />
          ),
        }}
      />

      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <Forcesvg width={24} height={24}  />
          ),
        }}
      />
      <Screen
        name="MyCars"
        component={MyCars}
        options={{
          tabBarIcon: ({ color }) => (
            <Forcesvg width={24} height={24}  />
          ),
        }}
      />
    </Navigator>
  );
}
