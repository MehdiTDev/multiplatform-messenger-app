import { NativeBaseProvider, Box, HStack, Pressable, Text } from "native-base";
import { StyleSheet, Platform } from "react-native";
import { useEffect, useState } from "react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomePage({ navigation }) {
  const [selectedTab, setSelectedTab] = useState("Login");

  var storage = localStorage

  if (Platform.OS === 'web') {
    console.log('Running in a web browser');
    storage = localStorage
  } else if (Platform.OS === 'ios') {
    console.log('Running on iOS');
    storage = AsyncStorage
  } else if (Platform.OS === 'android') {
    console.log('Running on Android');
    storage = AsyncStorage

  }

  console.log("this is the storage", storage)

  useEffect(() => {
    const user = JSON.parse(storage.getItem("userInfo"));
    if (user) {
      navigation.navigate("ChatPage");
    }
  }, [navigation]);

  return (
    <NativeBaseProvider>
      <Box style={styles.container}>
        <Box style={styles.card}>
          {/* Tabs */}
          <HStack style={styles.tabContainer}>
            <Pressable onPress={() => setSelectedTab("Login")}>
              <Box
                style={[
                  styles.tab,
                  selectedTab === "Login" && styles.activeTab,
                ]}
              >
                <Text style={styles.tabText}>Login</Text>
              </Box>
            </Pressable>

            <Pressable onPress={() => setSelectedTab("SignUp")}>
              <Box
                style={[
                  styles.tab,
                  selectedTab === "SignUp" && styles.activeTab,
                ]}
              >
                <Text style={styles.tabText}>Sign Up</Text>
              </Box>
            </Pressable>
          </HStack>

          {/* Render forms */}
          {selectedTab === "Login" ? (
            <Login navigation={navigation} />
          ) : (
            <Signup navigation={navigation} />
          )}
        </Box>
      </Box>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00BFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 400,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 24,
  },
  tab: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 999,
  },
  activeTab: {
    backgroundColor: "#dbeafe",
  },
  tabText: {
    fontWeight: "bold",
    color: "black",
  },
});
