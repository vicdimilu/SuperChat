import * as React from "react";
import { Flex } from "@chakra-ui/react";
/**
 * This component should handle user private chat switching and exiting
 * It also must show which private chat has new messages,
 */
export const ChatPrivateChatsControl = ({}) => {
  return (
    <Flex
      ml="1"
      justify="center"
      align="center"
      fontSize="xs"
      color="white"
      rounded="md"
      w="100%"
      border="1px solid white"
      bgColor="gray.700"
      children={"Private Chats"}
    />
  );
};
