import React, { useState } from "react";
import {
  Box,
  Text,
  Button,
  Input,
  Menu,
  MenuItem,
  Avatar,
  Spinner,
  IconButton,
  useToast,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import ProfileModal from "./ProfileModal";
import UserListItem from "../userAvatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";
import { getSender } from "../../config/ChatLogics";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigation.navigate("Home");
  };

  const handleSearch = async () => {
    if (!search) {
      toast.show({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        placement: "top",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.show({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        placement: "bottom",
      });
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      setIsOpen(false);
    } catch (error) {
      toast.show({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        placement: "bottom",
      });
    }
  };

  return (
    <>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        p={3}
        borderWidth={2}
      >
        <Button
          variant="ghost"
          onPress={() => setIsOpen(true)}
          leftIcon={<Ionicons name="search" size={24} color="black" />}
        >
          <Text display={{ base: "none", md: "flex" }} px={4}>
            Search User
          </Text>
        </Button>

        <Text fontSize="2xl" fontFamily="Work sans">
          Talk-A-Tive
        </Text>

        <Menu>
          <Menu.Item>
            <NotificationBadge
              count={notification.length}
              effect={Effect.SCALE}
            />
            <IconButton
              icon={<Ionicons name="notifications" size={24} color="black" />}
              onPress={() => {}}
            />
          </Menu.Item>
          <Menu.Item>
            <Avatar size="sm" source={{ uri: user.pic }} />
            <Menu.Item onPress={logoutHandler}>Logout</Menu.Item>
            <Menu.Item>
              <ProfileModal user={user} />
            </Menu.Item>
          </Menu.Item>
        </Menu>
      </Box>

      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Search Users</DrawerHeader>
          <DrawerBody>
            <Box flexDirection="row" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChangeText={(value) => setSearch(value)}
              />
              <Button onPress={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <Spinner />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner size="lg" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
