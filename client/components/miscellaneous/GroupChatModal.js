import React, { useState } from "react";
import {
  Modal,
  Button,
  FormControl,
  Input,
  useToast,
  Box,
  Spinner,
} from "native-base";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import UserListItem from "../userAvatar/UserListItem";

const GroupChatModal = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const { user, chats, setChats } = ChatState();

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast.show({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        placement: "top",
      });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

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
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.show({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        placement: "bottom-left",
      });
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers.length) {
      toast.show({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        placement: "top",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      setIsOpen(false);
      toast.show({
        title: "New Group Chat Created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        placement: "bottom",
      });
    } catch (error) {
      toast.show({
        title: "Failed to Create the Chat!",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        placement: "bottom",
      });
    }
  };

  return (
    <>
      <Box onPress={() => setIsOpen(true)}>{children}</Box>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.Header justifyContent="center">
            <Text fontSize="2xl" fontFamily="heading">
              Create Group Chat
            </Text>
          </Modal.Header>
          <Modal.CloseButton />
          <Modal.Body>
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChangeText={setGroupChatName}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users (e.g., John, Piyush, Jane)"
                mb={1}
                value={search}
                onChangeText={handleSearch}
              />
            </FormControl>
            <Box w="100%" flexWrap="wrap" flexDirection="row">
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>
            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button onPress={handleSubmit} colorScheme="blue">
              Create Chat
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default GroupChatModal;
