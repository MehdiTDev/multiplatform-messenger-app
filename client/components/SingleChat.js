import { useState, useEffect } from "react";
import { Box, Text, Spinner, IconButton, Input, useToast } from "native-base";
import { Ionicons } from "@expo/vector-icons"; // For back icon
import { ChatState } from "../Context/ChatProvider";
import { getSender, getSenderFull } from "../config/ChatLogics";
import axios from "axios";
import io from "socket.io-client";
import LottieView from "lottie-react-native";
import ScrollableChat from "./ScrollableChat"; // You will need to adjust this too if it's web-based
import ProfileModal from "./miscellaneous/ProfileModal";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";

const ENDPOINT = "http://localhost:5000"; // change after deploy
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);

    const toast = useToast();
    const { selectedChat, setSelectedChat, user, notification, setNotification } = ChatState();

    const fetchMessages = async () => {
        if (!selectedChat) return;
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            setLoading(true);
            const { data } = await axios.get(`/api/message/${selectedChat._id}`, config);
            setMessages(data);
            setLoading(false);
            socket.emit("join chat", selectedChat._id);
        } catch (error) {
            toast.show({
                title: "Error Occurred!",
                description: "Failed to Load the Messages",
                status: "error",
            });
        }
    };

    const sendMessage = async () => {
        if (newMessage.trim() === "") return;
        socket.emit("stop typing", selectedChat._id);
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post(
                "/api/message",
                {
                    content: newMessage,
                    chatId: selectedChat,
                },
                config
            );
            setNewMessage("");
            socket.emit("new message", data);
            setMessages([...messages, data]);
        } catch (error) {
            toast.show({
                title: "Error Occurred!",
                description: "Failed to send the Message",
                status: "error",
            });
        }
    };

    const typingHandler = (text) => {
        setNewMessage(text);

        if (!socketConnected) return;

        if (!typing) {
            setTyping(true);
            socket.emit("typing", selectedChat._id);
        }

        let lastTypingTime = new Date().getTime();
        let timerLength = 3000;

        setTimeout(() => {
            let timeNow = new Date().getTime();
            let timeDiff = timeNow - lastTypingTime;

            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedChat._id);
                setTyping(false);
            }
        }, timerLength);
    };

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on("connected", () => setSocketConnected(true));
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));
    }, []);

    useEffect(() => {
        fetchMessages();
        selectedChatCompare = selectedChat;
    }, [selectedChat]);

    useEffect(() => {
        socket.on("message received", (newMessageReceived) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
                if (!notification.includes(newMessageReceived)) {
                    setNotification([newMessageReceived, ...notification]);
                    setFetchAgain(!fetchAgain);
                }
            } else {
                setMessages([...messages, newMessageReceived]);
            }
        });
    });

    return (
        <Box flex={1} bg="white" p={2}>
            {selectedChat ? (
                <>
                    <Box flexDirection="row" alignItems="center" justifyContent="space-between" mb={2}>
                        <IconButton
                            icon={<Ionicons name="arrow-back" size={24} />}
                            onPress={() => setSelectedChat("")}
                            display={{ base: "flex", md: "none" }}
                        />
                        {messages && !selectedChat.isGroupChat ? (
                            <>
                                <Text fontSize="xl" fontFamily="heading">{getSender(user, selectedChat.users)}</Text>
                                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
                            </>
                        ) : (
                            <>
                                <Text fontSize="xl" fontFamily="heading">{selectedChat.chatName.toUpperCase()}</Text>
                                <UpdateGroupChatModal fetchMessages={fetchMessages} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
                            </>
                        )}
                    </Box>

                    <Box flex={1} bg="gray.100" borderRadius="lg" p={2}>
                        {loading ? (
                            <Spinner size="lg" alignSelf="center" />
                        ) : (
                            <ScrollableChat messages={messages} />
                        )}
                    </Box>

                    {istyping && (
                        <Box mt={2}>
                            <LottieView
                                source={require("../animations/typing.json")}
                                autoPlay
                                loop
                                style={{ width: 70, height: 50 }}
                            />
                        </Box>
                    )}

                    <Box mt={3}>
                        <Input
                            placeholder="Enter a message..."
                            value={newMessage}
                            onChangeText={typingHandler}
                            onSubmitEditing={sendMessage}
                            bg="gray.200"
                            variant="filled"
                            borderRadius="full"
                            px={4}
                            py={3}
                        />
                    </Box>
                </>
            ) : (
                <Box flex={1} justifyContent="center" alignItems="center">
                    <Text fontSize="2xl" fontFamily="heading">
                        Click on a user to start chatting
                    </Text>
                </Box>
            )}
        </Box>
    );
};

export default SingleChat;
