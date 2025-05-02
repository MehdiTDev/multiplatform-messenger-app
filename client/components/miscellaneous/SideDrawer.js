import React, { useState } from "react";
import {
  Box,
  HStack,
  VStack,
  Icon,
  Text,
  Button,
  Avatar,
  Menu,
  Pressable,
  Input,
  Spinner,
  Divider,
  Actionsheet,
  useDisclose,
  Tooltip,
  Portal,
  Slide,
  useToast,
} from "native-base";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import ChatLoading from "../ChatLoading";
import UserListItem from "../userAvatar/UserListItem";
import axios from "axios";


export default function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclose();


  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast()



  const logoutHandler = () => {

    localStorage.removeItem("userInfo")

    navigation.navigate("HomePage");

  }

  const searchHandler = async () => {

    if (!search) {

      toast.show({

        title: "Failed",
        description: "Please type search words",
        status: "warning",
        duration: 1000,
        placement: "top-left"

      });

      return;
    }

    try {
      setLoading(true);


      const config = {

        headers: {
          Authorization: `Bearer ${user.token}`
        },
      };


      const { data } = await axios.get(`http://localhost:5000/api/user?search=${search}`, config)

      setLoading(false)



      setSearchResult(data)


    } catch (error) {

      console.log("failed to find search results")
      toast.show({

        title: "Error searching",
        description: "Failed to find results",
        status: "error",
        duration: 1000,
        placement: "bottom-left"

      });

    }












  }


  const accessChat = async (userId) => {

    console.log("the user has been clicked")

    try {
      setLoadingChat(true)

      const config = {

        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`
        },
      };

      const { data } = await axios.post(`http://localhost:5000/api/chat`, { userId }, config);

      //      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]); // va behövs den till ? om chaten redan finns ? 

      setSelectedChat(data);
      setLoadingChat(false);
      console.log(selectedChat)
      // when printing the selected chat it gives undefined the first time it is created. 
      onClose();






    } catch (error) {

      setLoadingChat(false)

      toast.show({

        title: "error",
        description: "chat not found",
        status: "error",
        duration: 1000,
        placement: "top-left"
      });

    }







  }



  return (
    <>
      {/* Header */}
      <Box style={styles.header}>
        {/* Search Button with Tooltip */}
        <Tooltip label="Search Users to chat" placement="bottom right">
          <Pressable onPress={onOpen}>
            <HStack alignItems="center" space={2}>
              <Icon as={FontAwesome} name="search" size="sm" color="black" />
              <Text display={{ base: "none", md: "flex" }}>Search User</Text>
            </HStack>
          </Pressable>
        </Tooltip>

        {/* Title */}
        <Text style={styles.title}>Talk-A-Tive</Text>

        {/* Right Menu */}
        <HStack space={4} alignItems="center">
          {/* Notification Bell */}
          <Menu
            trigger={(triggerProps) => (
              <Pressable {...triggerProps}>
                <HStack alignItems="center">
                  <Box style={styles.notificationDot} />
                  <Icon as={Ionicons} name="notifications" size="lg" />
                </HStack>
              </Pressable>
            )}
          >
            <Menu.Item>No New Messages</Menu.Item>
            <Divider />
          </Menu>

          {/* Profile Dropdown */}
          <Menu
            trigger={(triggerProps) => (
              <Pressable {...triggerProps}>
                <HStack alignItems="center">
                  <Avatar size="sm" name={user.name} source={user.pic} />
                  <Icon
                    as={MaterialIcons}
                    name="keyboard-arrow-down"
                    size="md"
                  />
                </HStack>
              </Pressable>
            )}
          >
            <Menu.Item>
              <ProfileModal user={user}>
                <Text>My Profile33</Text>
              </ProfileModal>
            </Menu.Item>

            <Divider />
            <Menu.Item onPress={logoutHandler} >Logout</Menu.Item>
          </Menu>
        </HStack>
      </Box>

      {/* ActionSheet */}



      <Slide in={isOpen} placement="left" duration={300}>
        <Box
          w="300px"
          h="100%"
          bg="white"
          shadow={9}
          p="5"
          safeArea
        >
          <Text fontSize="xl" mb="4">search users</Text>

          <HStack space={2} w="100%" px={4} mb={3}>


            <Input
              h={10}
              placeholder="Search by name or email"
              value={search}
              bg="red"
              marginBottom={3}
              onChangeText={(text) => setSearch(text)}
            />

            <Button h={10} onPress={searchHandler}>Go</Button>

          </HStack>

          {loading ?

            <ChatLoading /> : searchResult?.map(user => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => accessChat(user._id)}
              />
            ))}

          {loadingChat && <Spinner ml="auto" d="flex" />}



          <Button onPress={onClose} position="absolute" bottom={5} width="50%">Close</Button>
        </Box>
      </Slide>








    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    padding: 8,
    borderBottomWidth: 1,
    borderColor: "#E2E8F0", // gray.200
  },
  title: {
    fontSize: 20,
    fontFamily: "sans-serif-medium",
  },
  notificationDot: {
    backgroundColor: "#EF4444", // red.500
    borderRadius: 9999,
    width: 12,
    height: 12,
    position: "absolute",
    top: -2,
    right: -2,
    zIndex: 1,
  },
  drawerHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

/*

<Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Text style={styles.drawerHeader}>Search Users</Text>
          <HStack space={2} w="100%" px={4} mb={3}>
            <Input
              flex={1}
              placeholder="Search by name or email"
              value={search}
              onChangeText={(text) => setSearch(text)}
            />
            <Button>Go</Button>
          </HStack>

          <VStack w="100%" px={4}>
            <Spinner />
          </VStack>
        </Actionsheet.Content>
      </Actionsheet>





*/