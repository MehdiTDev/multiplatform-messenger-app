import React, { createContext, useContext, useState, useEffect } from "react";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {

  var storage = AsyncStorage

  if (Platform.OS === 'web') {
    storage = localStorage
  } else if (Platform.OS === 'ios') {
    storage = AsyncStorage
  } else if (Platform.OS === 'android') {
    storage = AsyncStorage

  }




  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [chats, setChats] = useState();
  const [notification, setNotification] = useState([]); // ✅ New state for notifications
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchUser = () => {
      const userInfo = storage.getItem("userInfo");
      if (userInfo) {
        setUser(JSON.parse(userInfo));
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification, // ✅ Include in context
        setNotification, // ✅ Include in context
        loading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => useContext(ChatContext);

export default ChatProvider;
