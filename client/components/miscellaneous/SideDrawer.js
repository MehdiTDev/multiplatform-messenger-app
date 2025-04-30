import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  Box,
  Text,
  Button,
  Tooltip,
  Icon,
  Avatar,
  Menu,
  Divider,
  Input,
  Spinner,
  HStack,
  VStack,
  Pressable,
  Drawer,
  Badge,
} from "native-base";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

export default function SideDrawer() {
  const [search, setSearch] = useState("");

  return (
    <>
      {/* Header Bar */}
      <Box style={styles.headerBar}>
        {/* Search Button */}
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" style={styles.ghostButton}>
            <HStack style={styles.searchStack}>
              <Icon as={FontAwesome} name="search" style={styles.searchIcon} />
              <Text style={styles.searchText}>Search User</Text>
            </HStack>
          </Button>
        </Tooltip>

        {/* App Title */}
        <Text style={styles.appTitle}>Talk-A-Tive</Text>

        {/* Notification and Profile */}
        <HStack style={styles.rightIconsStack}>
          {/* Notification */}
          <Menu
            trigger={(triggerProps) => (
              <Pressable {...triggerProps}>
                <Box style={styles.notificationBox}>
                  <Badge style={styles.notificationBadge}>3</Badge>
                  <Icon
                    as={MaterialIcons}
                    name="notifications"
                    style={styles.notificationIcon}
                  />
                </Box>
              </Pressable>
            )}
          >
            <Menu.Item>No New Messages</Menu.Item>
            <Menu.Item>New Message in Group</Menu.Item>
            <Menu.Item>New Message from User</Menu.Item>
          </Menu>

          {/* Profile */}
          <Menu
            trigger={(triggerProps) => (
              <Pressable {...triggerProps}>
                <HStack style={styles.profileStack}>
                  <Avatar
                    size="sm"
                    source={{ uri: "https://example.com/profile.jpg" }}
                    style={styles.avatar}
                  >
                    User
                  </Avatar>
                  <Icon
                    as={MaterialIcons}
                    name="arrow-drop-down"
                    style={styles.dropdownIcon}
                  />
                </HStack>
              </Pressable>
            )}
          >
            <Menu.Item>My Profile</Menu.Item>
            <Divider />
            <Menu.Item>Logout</Menu.Item>
          </Menu>
        </HStack>
      </Box>

      {/* Search Drawer */}
      <Drawer isOpen={false} onClose={() => {}}>
        <Drawer.Content style={styles.drawerContent}>
          <Drawer.Header style={styles.drawerHeader}>
            Search Users
          </Drawer.Header>
          <Drawer.Body style={styles.drawerBody}>
            <HStack style={styles.searchInputStack}>
              <Input
                flex={1}
                placeholder="Search by name or email"
                style={styles.searchInput}
              />
              <Button style={styles.searchButton}>Go</Button>
            </HStack>

            {/* User List Placeholder */}
            <VStack style={styles.userList}>
              <Box style={styles.userItem}>User 1</Box>
              <Box style={styles.userItem}>User 2</Box>
            </VStack>

            <Spinner style={styles.spinner} />
          </Drawer.Body>
        </Drawer.Content>
      </Drawer>
    </>
  );
}

const styles = StyleSheet.create({
  // Header Styles
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  ghostButton: {
    backgroundColor: "transparent",
  },
  searchStack: {
    alignItems: "center",
  },
  searchIcon: {
    fontSize: 16,
  },
  searchText: {
    display: "none", // Will be overridden for medium+ screens
  },
  appTitle: {
    fontSize: 24,
    fontFamily: "Work sans",
  },
  rightIconsStack: {
    alignItems: "center",
    gap: 8,
  },

  // Notification Styles
  notificationBox: {
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    backgroundColor: "red",
    borderRadius: 999,
    top: -8,
    right: -4,
    zIndex: 1,
  },
  notificationIcon: {
    fontSize: 24,
    margin: 4,
  },

  // Profile Styles
  profileStack: {
    alignItems: "center",
  },
  avatar: {
    cursor: "pointer",
  },
  dropdownIcon: {
    fontSize: 20,
  },

  // Drawer Styles
  drawerContent: {
    width: "80%",
  },
  drawerHeader: {
    borderBottomWidth: 1,
  },
  drawerBody: {
    padding: 8,
  },
  searchInputStack: {
    paddingBottom: 8,
    gap: 8,
  },
  searchInput: {
    flex: 1,
  },
  searchButton: {
    // Button styles if needed
  },
  userList: {
    gap: 8,
  },
  userItem: {
    padding: 8,
    backgroundColor: "#f1f1f1",
    borderRadius: 4,
  },
  spinner: {
    marginTop: 8,
    alignSelf: "center",
  },
});
