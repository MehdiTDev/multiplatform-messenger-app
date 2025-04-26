import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ChatPage({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual logic

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate("HomePage");
    }
    console.log("This is the startScreen");
  }, []);

  return (
    <View style={styles.container}>
      <Text>Checking login status...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
