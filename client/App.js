import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";

// Screens
import ChatPage from "./Screens/ChatPage";
import HomePage from "./Screens/HomePage";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    console.log("App has started!");
  }, []);

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HomePage"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="ChatPage" component={ChatPage} />
          <Stack.Screen name="HomePage" component={HomePage} />
        </Stack.Navigator>
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
