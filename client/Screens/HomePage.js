import {
  NativeBaseProvider,
  Box,
  HStack,
  Pressable,
  Text,
  useToast,
} from "native-base";
import { StyleSheet } from "react-native";
import { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
//import { useHistory } from "react-router-dom"

export default function HomePage({ navigation }) {
  const [selectedTab, setSelectedTab] = useState("Login");
  const toast = useToast();
  // Login states
  const [emailLogIn, setEmailLogIn] = useState("");
  const [passwordLogIn, setPasswordLogIn] = useState("");
  const [showPasswordLogIn, setShowPasswordLogIn] = useState(false);

  // Signup states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordSignUp, setShowPasswordSignUp] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [pic, setPic] = useState(null); // State to store the image URI
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  //const history = useHistory()

  const handleClick = () => setShow(!show);



  const handleLogin = async () => {
    // your logIn function here
  };


  const handleSignup = async () => {
    // your signUp function here
  };


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
            <Login
              email={emailLogIn}
              setEmail={setEmailLogIn}
              password={passwordLogIn}
              setPassword={setPasswordLogIn}
              showPassword={showPasswordLogIn}
              setShowPassword={setShowPasswordLogIn}
              onLogin={() => { }}
              onGuest={() => { navigation.navigate("TestPage"); }}
              isLoading={loading}
              setLoading={setLoading}
            />
          ) : (
            <Signup
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              showPassword={showPasswordSignUp}
              setShowPassword={setShowPasswordSignUp}
              showConfirmPassword={showConfirmPassword}
              setShowConfirmPassword={setShowConfirmPassword}
              onSignup={() => { }}
              onPickImage={() => { }}
              image={pic}
              setPic={setPic}
              isLoading={loading}
              setLoading={setLoading}
            />
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
