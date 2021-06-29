import * as React from "react";
import { Flex } from "@chakra-ui/react";
/**
 * This component should handle user room switching, joining and exiting
 * and display room names, which rooms have new messages and
 * which the user is in
 */
export const ChatRoomsControl = ({ currentRoom, roomUsersNumber }: any) => {
  return (
    <Flex
      mr="1"
      justify="center"
      fontSize="xs"
      align="center"
      color="white"
      rounded="md"
      w="100%"
      border="1px solid white"
      bgColor="gray.700"
      className="whitespace-pre"
      children={`Rooms\nCurrent: ${currentRoom} (Users: ${roomUsersNumber})`}
    />
  );
};
