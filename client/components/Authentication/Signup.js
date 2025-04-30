import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  Pressable,
  useToast,
} from "native-base";
import { StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

export default function Signup({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [pic, setPic] = useState(null); // State to store the image URI
  const [loading, setLoading] = useState(false);

  const toast = useToast();

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

  const submitHandler = async () => {
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      toast.show({
        title: "failure",
        description: "Please fill all the required fields",
        status: "failed",
        duration: 1000,
        isClosable: true,
        placement: "bottom",
      });

      setLoading(false);
      return;
    }

    if (password != confirmPassword) {
      toast.show({
        title: "Error",
        description: "Passwords do not match",
        status: "failed",
        duration: 1000,
        isClosable: true,
        placement: "bottom",
      });

      setLoading(false); // not in the tutorials
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/user",
        { name, email, password, pic },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));

      setLoading(false);

      toast.show({
        title: "success",
        description: "Registration was successful",
        status: "success",
        duration: 1000,
        isClosable: true,
        placement: "bottom",
      });

      navigation.navigate("ChatPage");
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data); // Server-side error message

        toast.show({
          title: "Error",
          description: error.response.data.message,
          status: "failed",
          duration: 1000,
          isClosable: true,
          placement: "bottom",
        });
      } else {
        console.log(error.message); // Generic error, like network issue

        toast.show({
          title: "Network error",
          description: error.message,
          status: "failed",
          duration: 1000,
          isClosable: true,
          placement: "bottom",
        });
      }

      setLoading(false);
    }
  };

  return (
    <VStack space="4">
      <Box>
        <Text style={styles.label}>
          Name <Text style={styles.required}>*</Text>
        </Text>
        <Input
          placeholder="Enter Your Name"
          value={name}
          onChangeText={setName}
        />
      </Box>

      <Box>
        <Text style={styles.label}>
          Email Address <Text style={styles.required}>*</Text>
        </Text>
        <Input
          placeholder="Enter Your Email Address"
          value={email}
          onChangeText={setEmail}
        />
      </Box>

      <Box>
        <Text style={styles.label}>
          Password <Text style={styles.required}>*</Text>
        </Text>
        <Input
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          type={showPassword ? "text" : "password"}
          InputRightElement={
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.toggleText}>
                {showPassword ? "Hide" : "Show"}
              </Text>
            </Pressable>
          }
        />
      </Box>

      <Box>
        <Text style={styles.label}>
          Confirm Password <Text style={styles.required}>*</Text>
        </Text>
        <Input
          placeholder="Confirm password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          type={showConfirmPassword ? "text" : "password"}
          InputRightElement={
            <Pressable
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Text style={styles.toggleText}>
                {showConfirmPassword ? "Hide" : "Show"}
              </Text>
            </Pressable>
          }
        />
      </Box>

      <Box>
        <Text style={styles.label}>Upload your Picture</Text>
        <Button
          variant="outline"
          style={styles.uploadButton}
          onPress={pickImage}
        >
          Choose File
        </Button>

        {pic && (
          <Box style={styles.imageContainer}>
            <Image source={{ uri: pic }} style={styles.image} />
          </Box>
        )}
      </Box>

      <Button
        style={styles.signUpButton}
        colorScheme="blue"
        onPress={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
    fontSize: 16,
    fontWeight: "500",
  },
  required: {
    color: "red",
  },
  uploadButton: {
    marginTop: 4,
  },
  signUpButton: {
    marginTop: 8,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  toggleText: {
    paddingHorizontal: 12,
    color: "#3b82f6", // Tailwind's blue-500
    fontWeight: "500",
  },
});
