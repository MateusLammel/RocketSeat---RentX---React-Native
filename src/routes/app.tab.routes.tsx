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
          tabBarIcon: ({ focused, color }) => (
            <HomeSVG width={24} height={24} fill={color} />
          ),
        }}
      />

      <Screen
        name="Profile"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <PeopleSVG width={24} height={24} fill={color} />
          ),
        }}
      />
      <Screen
        name="MyCars"
        component={MyCars}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <CarSVG width={24} height={24} fill={color} />
          ),
        }}
      />
    </Navigator>
  );
}
