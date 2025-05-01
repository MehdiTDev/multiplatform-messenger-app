import React from "react";
import { Box, Text, HStack, Avatar, Pressable } from "native-base";
import { ChatState } from "../../Context/ChatProvider";

const UserListItem = ({

    userId,
    user,

    handleFunction }) => {
    //const { user } = ChatState();

    return (
        <Pressable onPress={handleFunction}>
            {({ isPressed }) => (
                <Box
                    bg={isPressed ? "#38B2AC" : "#E8E8E8"}
                    px={3}
                    py={2}
                    mb={2}
                    borderRadius="lg"
                    w="100%"
                >
                    <HStack alignItems="center" space={3}>
                        <Avatar
                            size="sm"
                            source={{ uri: user.pic }}
                            name={user.name}
                        />
                        <Box>
                            <Text color={isPressed ? "white" : "black"}>{user.name}</Text>
                            <Text fontSize="xs" color={isPressed ? "white" : "black"}>
                                <Text bold>Email: </Text>{user.email}
                            </Text>
                        </Box>
                    </HStack>
                </Box>
            )}
        </Pressable>
    );
};

export default UserListItem;
