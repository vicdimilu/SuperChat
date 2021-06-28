import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { MdContacts } from "react-icons/md";
import { MdCreditCard } from "react-icons/md";
import { BsHouse } from "react-icons/bs";
import * as React from "react";

export const ChatMenu = ({
  userIsAuthenticated,
  currentRoom,
  roomUsersNumber,
}: any) => {
  const iconSize: number = 24;
  return (
    <Menu placement="auto" isLazy>
      <MenuButton
        bgColor="gray.700"
        _active={{ backgroundColor: "gray.500", border: "none" }}
        mt="2.5vw"
        mb="1vw"
        w="95%"
        as={IconButton}
        color="white"
        icon={<FiMenu />}
        aria-label="Options"
        variant="outline"
      />
      <MenuList
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        border=""
        fontSize="xs"
        shadow="md"
        w="90vw"
      >
        {userIsAuthenticated ? (
          <MenuItem
            w="90%"
            icon={<MdContacts size={iconSize} />}
            children={"Contacts"}
          />
        ) : (
          <MenuItem
            w="90%"
            icon={<MdCreditCard size={iconSize} />}
            children={"Register or Login"}
          />
        )}
        <MenuItem
          w="90%"
          icon={<BsHouse size={iconSize} />}
          className="whitespace-pre"
          children={`Rooms\nCurrent: ${currentRoom} (Users: ${roomUsersNumber})`}
        />
      </MenuList>
    </Menu>
  );
};
