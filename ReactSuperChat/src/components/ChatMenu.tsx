import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import * as React from "react";

export const ChatMenu = () => {
  return (
    <Menu isLazy>
      <MenuButton
        w="100%"
        as={IconButton}
        color="white"
        icon={<FiMenu />}
        aria-label="Options"
        variant="outline"
      />
      <MenuList>
        <MenuItem children={"Register or Login"} />
        <MenuItem children={"Users(#N)"} />
        <MenuItem children={"Contacts"} />
      </MenuList>
    </Menu>
  );
};
