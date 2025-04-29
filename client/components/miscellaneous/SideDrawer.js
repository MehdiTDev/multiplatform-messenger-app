import React, { useState } from "react";
import {
  Box,
  Text,
  Button,
  Input,
  Avatar,
  Spinner,
  IconButton,
  useToast,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
  Badge,
  Menu,
  Pressable,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
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
  const [isOpen, setIsOpen] = useState(false);

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const toast = useToast();
  const navigation = useNavigation();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigation.navigate("Home");
  };

  const handleSearch = async () => {
    if (!search) {
      toast.show({
        title: "Please enter something in search",
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

      setSearchResult(data);
    } catch (error) {
      toast.show({
        title: "Error occurred!",
        description: "Failed to load search results",
        status: "error",
        duration: 5000,
        placement: "bottom",
      });
    } finally {
      setLoading(false);
    }
  };

  const accessChat = async (userId) => {
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
      setIsOpen(false);
    } catch (error) {
      toast.show({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        placement: "bottom",
      });
    } finally {
      setLoadingChat(false);
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

        <Menu
          trigger={(triggerProps) => {
            return (
              <Pressable {...triggerProps}>
                <Box position="relative">
                  <Ionicons name="notifications" size={28} />
                  {notification.length > 0 && (
                    <Badge
                      colorScheme="danger"
                      rounded="full"
                      position="absolute"
                      top={-1}
                      right={-2}
                      zIndex={1}
                      variant="solid"
                      _text={{ fontSize: 10 }}
                    >
                      {notification.length}
                    </Badge>
                  )}
                </Box>
              </Pressable>
            );
          }}
        >
          {/* You can map over notifications here */}
          <Menu.Item>No new notifications</Menu.Item>
        </Menu>

        <Menu
          trigger={(triggerProps) => {
            return (
              <Pressable {...triggerProps}>
                <Avatar size="sm" source={{ uri: user.pic }} />
              </Pressable>
            );
          }}
        >
          <Menu.Item onPress={() => navigation.navigate("Profile")}>
            <ProfileModal user={user} />
          </Menu.Item>
          <Menu.Item onPress={logoutHandler}>Logout</Menu.Item>
        </Menu>
      </Box>

      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Search Users</DrawerHeader>
          <DrawerBody>
            <Box flexDirection="row" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                flex={1}
                value={search}
                onChangeText={(value) => setSearch(value)}
              />
              <Button onPress={handleSearch}>Go</Button>
            </Box>

            {loading ? (
              <Spinner />
            ) : (
              searchResult?.map((u) => (
                <UserListItem
                  key={u._id}
                  user={u}
                  handleFunction={() => accessChat(u._id)}
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
