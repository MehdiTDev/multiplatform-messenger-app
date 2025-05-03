import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";

// Screens
import ChatPage from "./Screens/ChatPage";
import HomePage from "./Screens/HomePage";
import ChatProvider, { ChatState } from "./Context/ChatProvider";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    console.log("App has started!");
  }, []);

  const AppContent = () => {
    const { user, loading } = ChatState(); // Access `user` and `loading` states

    // Show a loading indicator while checking authentication
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00BFFF" />
        </View>
      );
    }

    return (
      <Stack.Navigator
        initialRouteName={user ? "ChatPage" : "HomePage"} // Navigate based on user authentication
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="ChatPage" component={ChatPage} />
      </Stack.Navigator>
    );
  };

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <ChatProvider>
          <AppContent />
        </ChatProvider>
        <StatusBar style="auto" />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
