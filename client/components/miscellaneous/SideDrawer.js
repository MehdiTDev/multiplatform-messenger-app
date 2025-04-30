import React from "react";
import { Box, Text, Tooltip } from "native-base";
import { Pressable } from "react-native";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  return (
    <Box>
      <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
        <Pressable varient="ghost">
          <i class="fas fa-search"></i>
        </Pressable>
      </Tooltip>
    </Box>
  );
};

export default SideDrawer;
