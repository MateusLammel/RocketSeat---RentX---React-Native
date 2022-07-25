import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useAuth } from "../hooks/auth";
import { StackRoutes } from "./app.stack.routes";
import { TabRoutes } from "./app.tab.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      {user ? <TabRoutes /> : <AuthRoutes />}
 
    </NavigationContainer>
  );
}
