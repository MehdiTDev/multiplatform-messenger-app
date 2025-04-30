import React, { useState } from "react";
import { Box, Text, Tooltip, Icon, HStack } from "native-base";
import { Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  return (
    <Box>
      <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
        <Pressable>
          <HStack alignItems="center">
            <Icon as={FontAwesome} name="search" size={5} color="black" />
            <Text
              display={{
                base: "none",
                md: "flex",
              }}
              px={4}
            >
              Search User
            </Text>
          </HStack>
        </Pressable>
      </Tooltip>
    </Box>
  );
};

export default SideDrawer;
