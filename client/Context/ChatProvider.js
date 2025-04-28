import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// local storage for React Native
import { useNavigation } from "@react-navigation/native";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await AsyncStorage.getItem("userInfo");
      if (userInfo) {
        setUser(JSON.parse(userInfo));
      } else {
        navigation.navigate("HomePage"); // or "Login" if you have a login page
      }
    };

    fetchUser();
  }, []);

  return (
    <ChatContext.Provider value={{ user, setUser }}>
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
