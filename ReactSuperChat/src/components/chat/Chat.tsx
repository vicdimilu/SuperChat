import * as React from "react";
import { Flex, Stack, Input, Button } from "@chakra-ui/react";
import { io } from "socket.io-client";
import { ChatLibrary } from "./State.Interface";
import { MessageList } from "./MessageList";
import { EScreenOrientation } from "../../App";

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
          justify="center"
          backgroundColor="gray.700"
          align="center"
        >
          <form onSubmit={handleSendMessage}>
            <Flex w="100%" align="center">
              <Flex
                fontSize={{ base: "10px", md: "12px" }}
                children={userName}
              />
              <Input
                _placeholder={{ color: "white" }}
                variant="flushed"
                name="MSGInput"
                id="MSGInput"
                type="text"
                size="md"
                placeholder="Type here to message others."
                mr="1"
              />
              <Button
                variant="outline"
                fontFamily="Indie Flower"
                rounded="md"
                type="submit"
                size="md"
                children={"Send"}
              />
            </Flex>
          </form>
        </Flex>
      </Stack>
    </Flex>
  );
};
