import * as React from "react";
import { Flex, Stack } from "@chakra-ui/react";

import socketIOClient from "socket.io-client";
import { ChatAPI, ChatLibrary, UserPacketBase, UserPacketLoginResponse, UserPacketResponse, UserPacketSendMsgResponse, UserSendMessagePacket } from "./State.Interface";
import { ChatMessages } from "./MessageList";
import { EScreenOrientation } from "../../App";
import { ChatControls } from "../chat/ChatControls";

interface ChatProps {
  orientation: EScreenOrientation;
}
export const Chat = ({ orientation }: ChatProps) => {
  const ENDPOINT: string = "http://127.0.0.1:5000";
  const socket: any = socketIOClient(ENDPOINT);
  const [messages, setMessages] = React.useState<any[]>([]);
  const [userName, setUserName] = React.useState("AnonymousUser");
  React.useEffect(() => {
    socket.emit(ChatAPI.API_CODE, {user_action: ChatLibrary.USER_ANONYMOUS, user_id: userName} as UserPacketBase);
    //activate messages receptor
    socket.on(ChatAPI.API_CODE, (sResponse: UserPacketResponse) => {
      switch (sResponse.user_action) {
        case ChatLibrary.USER_ANONYMOUS:
          let c1Response = sResponse as UserPacketLoginResponse;
          setUserName(c1Response.username);
          break;
        case ChatLibrary.USER_SEND_MSG_TO_ROOM:
          let c2Response = sResponse as UserPacketSendMsgResponse;
          setMessages(messages.concat(c2Response.user_name+ ": "+ c2Response.user_message));
          break;
      
        default:
          break;
      }
      console.log("Mensaje recibido:", sResponse);
    });
    //Login Receptor
    //socket.on(ChatLibrary.Anonymous, (_packet: boolean) => {});
    //Private Messeges Receptor
    //socket.on(ChatLibrary.SuperChatAPI, (_msg: any) => {});
    return () => socket.disconnect();
  });

  function handleSendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const MSGForm: HTMLFormElement = event.currentTarget;
    const MSG: string = MSGForm.MSGInput.value;
    const request:UserSendMessagePacket = {
      user_action: ChatLibrary.USER_SEND_MSG_TO_ROOM,
      user_id: userName,
      user_message: MSG,
      user_name: userName,
      message_room_id: 1
    }
    //capturamos mensaje a enviar
    socket.emit(ChatAPI.API_CODE, request);
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
