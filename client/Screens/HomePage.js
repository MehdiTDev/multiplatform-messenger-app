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

  const postDetails = async (imageUri) => {
    setLoading(true);
    if (!imageUri) {
      toast({
        title: "Please select an image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        placement: "bottom", // Corrected placement
      });
      setLoading(false);
      return;
    }

    const data = new FormData();
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      data.append("file", blob, "upload.jpg"); // Pass blob and filename
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dpfocfuir");

      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/dpfocfuir/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const result = await cloudinaryResponse.json();

      if (result && result.secure_url) {
        console.log("Cloudinary Upload Success:", result); // Log the entire result on success
        setPic(result.secure_url);
        toast.show({
          title: "Image uploaded!",
          status: "success",
          duration: 5000,
          isClosable: true,
          placement: "bottom",
        });
      } else {
        console.error("Cloudinary Upload Failed:", result); // Log the entire result on failure
        toast.show({
          title: "Upload failed",
          description: result?.error?.message || "Unknown error",
          status: "error",
          duration: 5000,
          isClosable: true,
          placement: "bottom",
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.show({
        title: "Error uploading image",
        status: "error",
        duration: 5000,
        isClosable: true,
        placement: "bottom",
      });
    } finally {
      setLoading(false);
    }
  };

  const submitHandler = () => {};

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
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
      const imageUri = result.assets[0].uri;
      setPic(imageUri); // Update state with image URI
      await postDetails(imageUri); // Call function to upload to Cloudinary
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
              image={pic}
              isLoading={loading}
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
