import React, { useState } from "react";
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
  Modal,
  Drawer,
  Badge,
} from "native-base";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

export default function SideDrawer() {
  const [search, setSearch] = useState("");

  return (
    <>
      {/* Header Bar */}
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        width="100%"
        padding="5px 10px"
        borderWidth={1}
      >
        {/* Search Button */}
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost">
            <HStack alignItems="center">
              <Icon as={FontAwesome} name="search" size={4} />
              <Text display={{ base: "none", md: "flex" }} px={2}>
                Search User
              </Text>
            </HStack>
          </Button>
        </Tooltip>

        {/* App Title */}
        <Text fontSize="2xl" fontFamily="Work sans">
          Multi Chat
        </Text>

        {/* Notification and Profile */}
        <HStack space={2} alignItems="center">
          {/* Notification */}
          <Menu
            trigger={(triggerProps) => (
              <Pressable {...triggerProps}>
                <Box>
                  <Badge
                    colorScheme="danger"
                    rounded="full"
                    mb={-4}
                    mr={-2}
                    zIndex={1}
                  >
                    3{/* Notification count */}
                  </Badge>
                  <Icon
                    as={MaterialIcons}
                    name="notifications"
                    size={6}
                    m={1}
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
                <HStack alignItems="center">
                  <Avatar
                    size="sm"
                    source={{ uri: "https://example.com/profile.jpg" }}
                  >
                    User
                  </Avatar>
                  <Icon as={MaterialIcons} name="arrow-drop-down" size={5} />
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
        <Drawer.Content>
          <Drawer.Header borderBottomWidth={1}>Search Users</Drawer.Header>
          <Drawer.Body>
            <HStack space={2} pb={2}>
              <Input flex={1} placeholder="Search by name or email" />
              <Button>Go</Button>
            </HStack>

            {/* User List Placeholder */}
            <VStack space={2}>
              <Box p={2} bg="gray.100" rounded="md">
                User 1
              </Box>
              <Box p={2} bg="gray.100" rounded="md">
                User 2
              </Box>
            </VStack>

            <Spinner mt={2} alignSelf="center" />
          </Drawer.Body>
        </Drawer.Content>
      </Drawer>
    </>
  );
}
