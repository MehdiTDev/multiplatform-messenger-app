import React, { useState } from 'react';
import {
  Box,
<<<<<<< HEAD
=======
  HStack,
  VStack,
  Icon,
  Text,
>>>>>>> e5d527302e56eca399e4a16662224f196d4fc884
  Button,
  Avatar,
<<<<<<< HEAD
  Spinner,
  useToast,
  Badge,
  Menu,
  Pressable,
  Actionsheet,
  useDisclose,
  Text,
=======
  Menu,
  Pressable,
  Input,
  Spinner,
  Divider,
  Actionsheet,
  useDisclose,
  Tooltip,
>>>>>>> e5d527302e56eca399e4a16662224f196d4fc884
} from "native-base";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { ChatState } from "../../Context/ChatProvider";
<<<<<<< HEAD
=======
import ProfileModal from "./ProfileModal";
>>>>>>> e5d527302e56eca399e4a16662224f196d4fc884

export default function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
<<<<<<< HEAD

  const { isOpen, onOpen, onClose } = useDisclose();

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
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setSearchResult(data || []); // Fallback to empty array
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
      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
      onClose();
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
        borderWidth={1} // Changed from 2 to 1 for better scaling
      >
        <Button
          variant="ghost"
          onPress={onOpen}
          leftIcon={<Ionicons name="search" size={24} color="black" />}
        >
          <Text px={4}>Search User</Text>
        </Button>
=======
  const { isOpen, onOpen, onClose } = useDisclose();

  const { user } = ChatState();

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
>>>>>>> e5d527302e56eca399e4a16662224f196d4fc884

        {/* Title */}
        <Text style={styles.title}>Talk-A-Tive</Text>

<<<<<<< HEAD
        <Menu
          trigger={(triggerProps) => (
            <Pressable {...triggerProps}>
              <Box position="relative">
                <Ionicons name="notifications" size={28} />
                {notification?.length > 0 && (
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
          )}
        >
          <Menu.Item>No new notifications</Menu.Item>
        </Menu>

        <Menu
          trigger={(triggerProps) => (
            <Pressable {...triggerProps}>
              <Avatar size="sm" source={{ uri: user.pic }} />
            </Pressable>
          )}
        >
          <Menu.Item onPress={() => navigation.navigate("Profile")}>
            <ProfileModal user={user} />
          </Menu.Item>
          <Menu.Item onPress={logoutHandler}>Logout</Menu.Item>
        </Menu>
      </Box>

      <Actionsheet isOpen={isOpen} onClose={onClose} disableOverlay={false}>
        <Actionsheet.Content>
          <Text fontSize="md" fontWeight="bold" mb={3}>
            Search Users
          </Text>
          <Box flexDirection="row" px={3} pb={2} width="100%">
            <Input
              flex={1}
              placeholder="Search by name or email"
              mr={2}
              value={search}
              onChangeText={(text) => setSearch(text)}
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
=======
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
                <Text>My Profile</Text>
              </ProfileModal>
            </Menu.Item>

            <Divider />
            <Menu.Item>Logout</Menu.Item>
          </Menu>
        </HStack>
      </Box>

      {/* ActionSheet */}
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
>>>>>>> e5d527302e56eca399e4a16662224f196d4fc884
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}

<<<<<<< HEAD
export default SideDrawer;
=======
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
>>>>>>> e5d527302e56eca399e4a16662224f196d4fc884
