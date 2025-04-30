import React from "react";
import { Modal, Button, Text, Image, Pressable } from "native-base";
import { useDisclose } from "native-base";

export default function ProfileModal({ user, children }) {
  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <>
      <Pressable onPress={onOpen}>{children}</Pressable>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>{user.name}</Modal.Header>
          <Modal.Body style={{ alignItems: "center" }}>
            <Image
              source={user.pic}
              alt={user.name}
              style={{ borderRadius: 75, width: 150, height: 150 }}
            />
            <Text style={{ fontSize: 18, marginTop: 10 }}>
              Email: {user.email}
            </Text>
          </Modal.Body>
          <Modal.Footer>
            <Button onPress={onClose}>Close</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
