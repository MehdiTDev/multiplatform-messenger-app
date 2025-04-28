import React from "react";
import {
  Modal,
  Button,
  IconButton,
  Text,
  Image,
  useDisclosure,
  Box,
} from "native-base";
import { Ionicons } from "@expo/vector-icons"; // For the ViewIcon

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <Box onPress={onOpen}>{children}</Box>
      ) : (
        <IconButton
          icon={<Ionicons name="ios-eye" size={24} />}
          onPress={onOpen}
        />
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content maxWidth="400px">
          <Modal.Header justifyContent="center">
            <Text fontSize="2xl" fontFamily="heading">
              {user.name}
            </Text>
          </Modal.Header>
          <Modal.CloseButton />
          <Modal.Body>
            <Box alignItems="center">
              <Image
                source={{ uri: user.pic }}
                alt={user.name}
                size="xl"
                borderRadius="full"
              />
              <Text fontSize="lg" mt={2}>
                Email: {user.email}
              </Text>
            </Box>
          </Modal.Body>
          <Modal.Footer>
            <Button onPress={onClose}>Close</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default ProfileModal;
