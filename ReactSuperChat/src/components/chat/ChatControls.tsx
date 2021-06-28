import {
  Input,
  Button,
  InputGroup,
  InputRightAddon,
  Flex,
} from "@chakra-ui/react";
import * as React from "react";
import { GrEmoji } from "react-icons/gr";
export const ChatControls = ({ handleSendMessage }: any) => {
  return (
    <Flex
      h="10%"
      width="100%"
      justify="center"
      backgroundColor="gray.700"
      align="center"
    >
      <form style={{ width: "100%" }} onSubmit={handleSendMessage}>
        <Flex w="100%" p="1" align="center">
          <InputGroup size="xs">
            <Input
              _placeholder={{ color: "white" }}
              variant="flushed"
              name="MSGInput"
              id="MSGInput"
              type="text"
              width="100%"
              placeholder="Type here to message others."
              mr="1"
            />
            <InputRightAddon
              bgColor="transparent"
              color="inherit"
              border="none"
              children={<GrEmoji color="white" size="24" />}
              onClick={() => alert("works")}
            />
            <Button
              variant="outline"
              fontFamily="Indie Flower"
              rounded="md"
              type="submit"
              children={"Send"}
            />
          </InputGroup>
        </Flex>
      </form>
    </Flex>
  );
};
