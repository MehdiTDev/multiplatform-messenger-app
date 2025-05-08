import React, { useState } from "react";
import {
    Button,
    Modal,
    Input,
    FormControl,
    Box,
    useToast,
    useDisclose,
    Pressable,
} from "native-base";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import UserListItem from "../userAvatar/UserListItem";
import { getENDPOINT } from "../../config/ChatLogics";
import { Platform } from "react-native";

export default function GroupChatModal({ children }) {
    const { isOpen, onOpen, onClose } = useDisclose();
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const { user, chats, setChats } = ChatState();
    const ENDPOINT = getENDPOINT(Platform)


    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            toast.show({
                title: "User already added",
                status: "warning",
                duration: 5000,
                placement: "top",
            });
            return;
        }

        setSelectedUsers([...selectedUsers, userToAdd]);
    };

    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get(
                `${ENDPOINT}/api/user?search=${query}`,
                config
            );
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast.show({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                placement: "bottom-left",
            });
        }
    };

    const handleDelete = (delUser) => {
        console.log("this user should be deleted");
        setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
    };

    const resetValues = () => {
        setGroupChatName("");
        setSelectedUsers([]);
        setSearch("");
        setSearchResult([]);
    };

    const handleSubmit = async () => {
        if (!groupChatName || !selectedUsers) {
            toast.show({
                title: "Please fill all the fields",
                status: "warning",
                duration: 5000,
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
                `${ENDPOINT}/api/chat/group`,
                {
                    name: groupChatName,
                    users: JSON.stringify(selectedUsers.map((u) => u._id)),
                },
                config
            );
            setChats([data, ...chats]);
            onClose();
            toast.show({
                title: "New Group Chat Created!",
                status: "success",
                duration: 5000,
                placement: "bottom",
            });

            resetValues();
        } catch (error) {
            toast.show({
                title: "Failed to Create the Chat!",
                description: error.response.data,
                status: "error",
                duration: 5000,
                placement: "bottom",
            });
        }
    };

    return (
        <>
            <Pressable onPress={onOpen}>{children}</Pressable>

            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <Modal.Content>
                    <Modal.Header>Create Group Chat</Modal.Header>
                    <Modal.CloseButton />
                    <Modal.Body>
                        <FormControl>
                            <Input
                                placeholder="Chat Name"
                                mb={3}
                                onChangeText={(text) => setGroupChatName(text)}
                            />
                        </FormControl>
                        <FormControl mb={2}>
                            <Input
                                placeholder="Add Users"
                                onChangeText={handleSearch}
                            />
                        </FormControl>
                        <Box w="100%" flexDirection="row" flexWrap="wrap">
                            {selectedUsers.map((u) => (
                                <UserBadgeItem
                                    key={u._id}
                                    user={u}
                                    handleFunction={() => handleDelete(u)}
                                />
                            ))}
                        </Box>
                        {loading ? (
                            <span>Loading...</span>
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
                        <Button
                            onPress={handleSubmit}
                            bg="#A1DBF1"
                            _text={{ color: "black" }}
                        >
                            Create Group
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </>
    );
}
