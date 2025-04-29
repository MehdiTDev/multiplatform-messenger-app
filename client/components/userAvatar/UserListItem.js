import { Box, HStack, Avatar, Text, Pressable } from "native-base";
import { ChatState } from "../../Context/ChatProvider";

const UserListItem = ({ handleFunction }) => {
    const { user } = ChatState();

    return (
        <Pressable onPress={handleFunction}>
            {({ isPressed }) => (
                <Box
                    bg={isPressed ? "teal.500" : "coolGray.200"}
                    px={3}
                    py={2}
                    mb={2}
                    borderRadius="lg"
                >
                    <HStack space={3} alignItems="center">
                        <Avatar
                            size="sm"
                            source={{ uri: user.pic }}
                        >
                            {user.name[0]}
                        </Avatar>
                        <Box>
                            <Text color={isPressed ? "white" : "black"}>
                                {user.name}
                            </Text>
                            <Text fontSize="xs" color={isPressed ? "white" : "black"}>
                                <Text bold>Email: </Text>
                                {user.email}
                            </Text>
                        </Box>
                    </HStack>
                </Box>
            )}
        </Pressable>
    );
};

export default UserListItem;
