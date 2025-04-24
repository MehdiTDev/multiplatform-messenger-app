import React from "react";
import { Box, Button, Input, Text, VStack, Pressable } from "native-base";
import { StyleSheet, Image } from "react-native";

export default function Signup({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  onSignup,
  onPickImage,
  image,
}) {
  return (
    <VStack space="4">
      <Box>
        <Text style={styles.label}>
          Name <Text color="red.500">*</Text>
        </Text>
        <Input
          placeholder="Enter Your Name"
          value={name}
          onChangeText={setName}
        />
      </Box>

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
          placeholder="Enter Password"
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

      <Box>
        <Text style={styles.label}>
          Confirm Password <Text color="red.500">*</Text>
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
              <Text px="3" color="blue.500">
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
          onPress={onPickImage}
        >
          Choose File
        </Button>
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 100, height: 100, marginTop: 10, borderRadius: 50 }}
          />
        )}
      </Box>

      <Button style={styles.signUpButton} colorScheme="blue" onPress={onSignup}>
        Sign Up
      </Button>
    </VStack>
  );
}

const styles = StyleSheet.create({
  label: { marginBottom: 4 },
  uploadButton: { marginTop: 4 },
  signUpButton: { marginTop: 8 },
});
