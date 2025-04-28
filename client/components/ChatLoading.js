import React from "react";
import { Stack, Skeleton } from "native-base";

const ChatLoading = () => {
  return (
    <Stack space={3}>
      <Skeleton h="45px" />
      <Skeleton h="45px" />
      <Skeleton h="45px" />
      <Skeleton h="45px" />
      <Skeleton h="45px" />
      <Skeleton h="45px" />
      <Skeleton h="45px" />
      <Skeleton h="45px" />
      <Skeleton h="45px" />
      <Skeleton h="45px" />
      <Skeleton h="45px" />
      <Skeleton h="45px" />
    </Stack>
  );
};

export default ChatLoading;
