import React from "react";
import { VStack, Skeleton } from "native-base";

const ChatLoading = () => {
    return (
        <VStack space={3} p={4}>
            {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} h="45px" rounded="md" />
            ))}
        </VStack>
    );
};

export default ChatLoading;
