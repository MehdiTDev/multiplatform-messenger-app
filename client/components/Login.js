import React from "react";
import { Box, Button, Input, Text, VStack, Pressable } from "native-base";
import { StyleSheet } from "react-native";

export default function Login({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  onLogin,
  onGuest,
}) {
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

      <Button style={styles.loginButton} colorScheme="blue" onPress={onLogin}>
        Login
      </Button>
      <Button style={styles.guestButton} colorScheme="red" onPress={onGuest}>
        Get Guest User Credentials
      </Button>
    </VStack>
  );
}

const styles = StyleSheet.create({
  label: { marginBottom: 4 },
  loginButton: { marginTop: 8 },
  guestButton: { marginTop: 8 },
});
