import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";

// Screens
import ChatPage from "./Screens/ChatPage";
import HomePage from "./Screens/HomePage";
import ChatProvider from "./Context/ChatProvider";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    console.log("App has started!");
  }, []);

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <ChatProvider>
          <Stack.Navigator
            initialRouteName="HomePage"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="HomePage" component={HomePage} />
            <Stack.Screen name="ChatPage" component={ChatPage} />
          </Stack.Navigator>
        </ChatProvider>
        <StatusBar style="auto" />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
