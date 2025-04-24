import { NativeBaseProvider, Box, HStack, Pressable, Text } from "native-base";
import { StyleSheet } from "react-native";
import { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import * as ImagePicker from "expo-image-picker";

export default function HomePage({ navigation }) {
  const [selectedTab, setSelectedTab] = useState("Login");

  // Login states
  const [emailLogIn, setEmailLogIn] = useState("");
  const [passwordLogIn, setPasswordLogIn] = useState("");
  const [showPasswordLogIn, setShowPasswordLogIn] = useState(false);

  // Signup states
  const [nameSignUp, setNameSignUp] = useState("");
  const [emailSignUp, setEmailSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [confirmPasswordSignUp, setConfirmPasswordSignUp] = useState("");
  const [showPasswordSignUp, setShowPasswordSignUp] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleLogin = () => {
    // your logIn function here
  };

  const handleSignup = () => {
    // your signUP function here
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
              onLogin={handleLogin}
              onGuest={() => {}}
            />
          ) : (
            <Signup
              name={nameSignUp}
              setName={setNameSignUp}
              email={emailSignUp}
              setEmail={setEmailSignUp}
              password={passwordSignUp}
              setPassword={setPasswordSignUp}
              confirmPassword={confirmPasswordSignUp}
              setConfirmPassword={setConfirmPasswordSignUp}
              showPassword={showPasswordSignUp}
              setShowPassword={setShowPasswordSignUp}
              showConfirmPassword={showConfirmPassword}
              setShowConfirmPassword={setShowConfirmPassword}
              onSignup={handleSignup}
              onPickImage={pickImage}
              image={image}
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
