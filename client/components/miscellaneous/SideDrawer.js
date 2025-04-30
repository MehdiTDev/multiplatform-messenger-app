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
} from "native-base";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";

export default function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
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
            <ProfileModal user={user}>
              <Menu.Item>My Profile</Menu.Item>
            </ProfileModal>
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
        </Actionsheet.Content>
      </Actionsheet>
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
