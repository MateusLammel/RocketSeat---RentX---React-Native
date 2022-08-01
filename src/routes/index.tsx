import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { LoadAnimation } from "../components/LoadAnimation";
import { useAuth } from "../hooks/auth";
import { Confirmation } from "../screens/Confirmation";
import { TabRoutes } from "./app.tab.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  const { user, load } = useAuth();
  return load ? (
    <LoadAnimation />
  ) : (
    <NavigationContainer>
      {  user.id ? <TabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
