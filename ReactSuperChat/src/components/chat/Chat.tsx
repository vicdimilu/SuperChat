import * as React from "react";
import {
  Flex,
  Stack,
  Input,
  Button,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";

import { io } from "socket.io-client";
import { ChatLibrary } from "./State.Interface";
import { MessageList } from "./MessageList";
import { EScreenOrientation } from "../../App";
import { GrEmoji } from "react-icons/gr";

interface ChatProps {
  orientation: EScreenOrientation;
}
export const Chat = ({ orientation }: ChatProps) => {
  let url: string = "http://127.0.0.1:5000";
  let socket: any = io(url);
  const [messages, setMessages] = React.useState<any[]>([]);
  const [userName, setUserName] = React.useState("AnonymousUser");
  React.useEffect(() => {
    socket.emit(ChatLibrary.Anonymous, userName);
    //activate messages receptor
    socket.on(ChatLibrary.GeneralChatMessage, (message: string) => {
      setMessages(messages.concat(message));
    });
    //Login Receptor
    socket.on(ChatLibrary.Anonymous, (_packet: boolean) => {});
    //Private Messeges Receptor
    socket.on(ChatLibrary.PrivateChatMessage, (_msg: any) => {});
    return () => socket.disconnect();
  });

  function handleSendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const MSGForm: HTMLFormElement = event.currentTarget;
    const MSG: string = MSGForm.MSGInput.value;
    //capturamos mensaje a enviar
    socket.emit(ChatLibrary.GeneralChatMessage, MSG);
    MSGForm.MSGInput.value = "";
  }
  return (
    <Flex
      w="95%"
      h="95%"
      justify="center"
      align="center"
      bgColor="white"
      boxShadow="md"
      rounded="lg"
      color="white"
    >
      <Stack
        h="100%"
        w="100%"
        direction="column"
        justify="space-between"
        spacing={0}
      >
        <MessageList messages={messages} />
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
      </Stack>
    </Flex>
  );
};
