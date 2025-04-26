import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ChatPage({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      navigation.navigate("HomePage");
    } else {
      setUser(userInfo);
    }
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Welcome to the Chat Page, {user.name}!</Text>
      {/* Add your chat UI components here */}
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
