import React, { useState } from "react";
import {
  Modal,
  Button,
  FormControl,
  Input,
  IconButton,
  Spinner,
  Box,
  Text,
  useToast,
  VStack,
  HStack,
  Pressable,
  Icon,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { ViewIcon } from "native-base"; // Assuming custom icon. Replace with `Ionicons` or `MaterialIcons` if needed.
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import UserListItem from "../userAvatar/UserListItem";

const UpdateGroupChatModal = ({ fetchMessages, fetchAgain, setFetchAgain }) => {
  const [showModal, setShowModal] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);
  const toast = useToast();

  const { selectedChat, setSelectedChat, user } = ChatState();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) return;

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`http://localhost:5000/api/user?search=${query}`, config);
      setSearchResult(data);
    } catch (error) {
      toast.show({
        title: "Failed",
        description: "Failed to load search results",
        status: "warning",
        duration: 1000,
        placement: "bottom",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:5000/api/chat/rename`,
        { chatId: selectedChat._id, chatName: groupChatName },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      toast.show({
        description: error.response?.data?.message || "Rename failed",
        bgColor: "red.500",
      });
    } finally {
      setRenameLoading(false);
      setGroupChatName("");
    }
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      return toast.show({ description: "User already in group", bgColor: "red.500" });
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      return toast.show({ description: "Only admins can add", bgColor: "red.500" });
    }

    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.put(
        `http://localhost:5000/api/chat/groupadd`,
        { chatId: selectedChat._id, userId: user1._id },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      toast.show({ description: error.response?.data?.message, bgColor: "red.500" });
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      return toast.show({
        title: "Failed",
        description: "Only Admin can remove",
        status: "warning",
        duration: 1000,
        placement: "bottom"
      });
    }

    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.put(
        `http://localhost:5000/api/chat/groupremove`,
        { chatId: selectedChat._id, userId: user1._id },
        config
      );
      user1._id === user._id ? setSelectedChat(null) : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
    } catch (error) {
      //toast.show({ description: error.response?.data?.message, bgColor: "red.500" });

      toast.show({
        title: "Failed",
        description: "something went wrong",
        status: "warning",
        duration: 10000,
        placement: "bottom",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      { /* <IconButton icon={<ViewIcon />} onPress={() => setShowModal(true)} />*/}

      <Pressable onPress={() => setShowModal(true)}>

        <Icon as={MaterialIcons} name="visibility" size={6} />

      </Pressable>


      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>
            <Text fontSize="xl" fontWeight="bold">
              {selectedChat.chatName}
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Box flexWrap="wrap" flexDirection="row" mb={3}>
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  admin={selectedChat.groupAdmin}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>
            <HStack space={2} mb={3}>
              <FormControl flex={1}>
                <Input
                  placeholder="Chat Name"
                  value={groupChatName}
                  onChangeText={setGroupChatName}
                />
              </FormControl>
              <Button
                onPress={handleRename}
                isLoading={renameloading}
                colorScheme="teal"
              >
                Update
              </Button>
            </HStack>
            <FormControl mb={2}>
              <Input
                placeholder="Add User to group"
                onChangeText={handleSearch}
              />
            </FormControl>
            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResult.map((u) => (
                <UserListItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleAddUser(u)}
                />
              ))
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              colorScheme="red"
              onPress={() => handleRemove(user)}
            >
              Leave Group
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
