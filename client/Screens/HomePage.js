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
  const [pic, setPic] = useState(null); // State to store the image URI
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleClick = () => setShow(!show);

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please select an image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    // Check if the file is an image (jpeg or png)
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app"); // Set your Cloudinary upload preset here
      data.append("cloud_name", "dpfocfuir"); // Set your Cloudinary cloud name here

      fetch("https://api.cloudinary.com/v1_1/dpfocfuir/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json()) // Parse the JSON response
        .then((data) => {
          // Log the URL of the uploaded image
          const imageUrl = data.url; // This is where you get the URL of the uploaded image
          console.log("Image uploaded successfully:", imageUrl);
          setPic(imageUrl); // Set the image URL to the state
          setLoading(false);
        })
        .catch((err) => {
          console.log("Error uploading image:", err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please select a valid image (JPEG/PNG)",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

  const submitHandler = () => {};

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
      setPic(result.assets[0].uri); // Set image URI to pic state
    }
  };

  const handleLogin = () => {
    // your logIn function here
  };

  const handleSignup = () => {
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
              image={pic} // Pass the pic state as the image to Signup component
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
