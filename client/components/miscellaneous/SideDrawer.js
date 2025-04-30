import React, { useState } from "react";
import { Box, HStack, Icon, Input, Text } from "native-base";
import { FontAwesome } from "@expo/vector-icons";

export default function SideDrawer() {
  const [search, setSearch] = useState("");

  return (
    <Box
      bg="white"
      w="100%"
      px={4}
      py={2}
      borderBottomWidth={1}
      borderColor="gray.200"
    >
      <HStack
        alignItems="center"
        bg="gray.100"
        borderRadius="md"
        px={3}
        py={1}
        w="100%"
      >
        <Icon as={FontAwesome} name="search" size={4} color="gray.500" />

        {/* Responsive Text (Hidden on small screens) */}
        <Text
          ml={2}
          color="gray.500"
          display={{
            base: "none", // Hidden on small screens
            md: "flex", // Shown on medium+ screens
          }}
        >
          Search User
        </Text>
        <Text> Multi Chat</Text>
      </HStack>
      <Text> Multi Chat</Text>
    </Box>
  );
}
