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
import { StyleSheet, Platform } from "react-native";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {

  var storage = AsyncStorage

  if (Platform.OS === 'web') {
    storage = localStorage
  } else if (Platform.OS === 'ios') {
    storage = AsyncStorage
  } else if (Platform.OS === 'android') {
    storage = AsyncStorage

  }

  const { setUser } = ChatState();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const submitHandler = async () => {
    setLoading(true);

    if (!email || !password) {
      toast.show({
        title: "Failure",
        description: "Please fill all the required fields",
        status: "error",
        duration: 1000,
        isClosable: true,
        placement: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/user/login",
        { email, password },
        config
      );

      storage.setItem("userInfo", JSON.stringify(data));
      setUser(data);

      toast.show({
        title: "Success",
        description: "Logged in successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        placement: "bottom",
      });

      navigation.navigate("ChatPage");
    } catch (error) {
      toast.show({
        title: "Error",
        description: error.response?.data?.message || error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        placement: "bottom",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack space="4">
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
          placeholder="Enter password"
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

      <Button
        style={styles.loginButton}
        colorScheme="blue"
        onPress={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
    </VStack>
  );
}

// 🧹 All styles here
const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
    fontSize: 16,
    fontWeight: "500",
  },
  required: {
    color: "red",
  },
  loginButton: {
    marginTop: 8,
  },
  toggleText: {
    paddingHorizontal: 12,
    color: "#3b82f6", // Tailwind's blue-500
    fontWeight: "500",
  },
});
