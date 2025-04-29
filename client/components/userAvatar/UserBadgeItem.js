import { Pressable, HStack, Text, Icon, Badge } from "native-base";
import { Ionicons } from "@expo/vector-icons"; // Using Ionicons for the close icon

const UserBadgeItem = ({ user, handleFunction, admin }) => {
    return (
        <Pressable onPress={handleFunction}>
            <Badge
                colorScheme="purple"
                borderRadius="lg"
                px={2}
                py={1}
                mb={2}
                alignSelf="flex-start"
            >
                <HStack alignItems="center" space={1}>
                    <Text fontSize="xs" color="white">
                        {user.name}
                        {admin === user._id && " (Admin)"}
                    </Text>
                    <Icon as={Ionicons} name="close" size="xs" color="white" />
                </HStack>
            </Badge>
        </Pressable>
    );
};

export default UserBadgeItem;
