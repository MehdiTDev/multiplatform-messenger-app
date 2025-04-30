import React, { useState } from "react";
import { Box, Text, Tooltip, Icon } from "native-base";
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
          <Icon as={FontAwesome} name="search" size={5} color="black" />
        </Pressable>
      </Tooltip>
    </Box>
  );
};

export default SideDrawer;
