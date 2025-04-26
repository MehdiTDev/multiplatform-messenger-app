import React from "react";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  Pressable,
  useToast,
} from "native-base";
import { StyleSheet } from "react-native";
import axios from "axios";

export default function Login({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  onGuest,
  setLoading,
  navigation,
}) {
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

      toast.show({
        title: "Success",
        description: "Logged in successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        placement: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));

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
          Email Address <Text color="red.500">*</Text>
        </Text>
        <Input
          placeholder="Enter Your Email Address"
          value={email}
          onChangeText={setEmail}
        />
      </Box>

      <Box>
        <Text style={styles.label}>
          Password <Text color="red.500">*</Text>
        </Text>
        <Input
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          type={showPassword ? "text" : "password"}
          InputRightElement={
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Text px="3" color="blue.500">
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
      >
        Login
      </Button>

      <Button style={styles.guestButton} colorScheme="red" onPress={onGuest}>
        Get Guest User Credentials
      </Button>
    </VStack>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
  },
  loginButton: {
    marginTop: 8,
  },
  guestButton: {
    marginTop: 8,
  },
});
