import React from "react";
import { Badge, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

export default function UserBadgeItem({ user, handleFunction, admin }) {
  return (
    <Badge
      style={{
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        margin: 4,
        marginBottom: 8,
        backgroundColor: "#00BFFF", // Purple color equivalent
        fontSize: 12,
        cursor: "pointer",
      }}
      onClick={handleFunction}
    >
      {user.name}
      {admin === user._id}
      <Icon
        as={MaterialIcons}
        name="close"
        style={{ paddingLeft: 4 }}
        color="red.200"
      />
    </Badge>
  );
}
