import * as React from "react";
import { Flex, Stack } from "@chakra-ui/react";

import { io } from "socket.io-client";
import { ChatLibrary } from "./State.Interface";
import { ChatMessages } from "./MessageList";
import { EScreenOrientation } from "../../App";
import { ChatControls } from "../chat/ChatControls";

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
      h="94.5%"
      justify="center"
      align="center"
      bgColor="white"
      boxShadow="md"
      rounded="lg"
      color="white"
      mb="2.5vw"
    >
      <Stack
        h="100%"
        w="100%"
        direction="column"
        justify="space-between"
        spacing={0}
      >
        <ChatMessages messages={messages} />
        <ChatControls handleSendMessage={handleSendMessage} />
      </Stack>
    </Flex>
  );
};
