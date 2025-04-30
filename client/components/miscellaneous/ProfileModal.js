import React from "react";
import {
  Modal,
  Button,
  Text,
  IconButton,
  Image,
  View,
  useDisclose,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileModal({ user, children }) {
  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <>
      {children ? (
        <Text onPress={onOpen}>{children}</Text>
      ) : (
        <IconButton
          icon={<Ionicons name="eye" size={24} color="black" />}
          onPress={onOpen}
        />
      )}

      {/* <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <Modal.Content style={{ width: "90%", maxHeight: 410, padding: 20 }}>
          <Modal.Header
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: 40, fontFamily: "Work Sans" }}>
              {user.name}
            </Text>
          </Modal.Header>
          <Modal.Body
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{ borderRadius: 75, width: 150, height: 150 }}
              source={{ uri: user.pic }}
              alt={user.name}
            />
            <Text
              style={{ fontSize: 28, fontFamily: "Work Sans", marginTop: 20 }}
            >
              Email: {user.email}
            </Text>
          </Modal.Body>
          <Modal.Footer>
            <Button onPress={onClose}>
              <Text>Close</Text>
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal> */}
    </>
  );
}
