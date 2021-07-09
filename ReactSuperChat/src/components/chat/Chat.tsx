import * as React from "react";
import { Flex, Stack } from "@chakra-ui/react";

import { ChatLibrary, UserPacketBase, UserPacketLoginResponse, UserPacketResponse, UserPacketSendMsgResponse, UserProfile, UserSendMessagePacket } from "../../controllers/State.Interface";
import { ChatMessages } from "./MessageList";
import { EScreenOrientation } from "../../App";
import { ChatControls } from "../chat/ChatControls";
import { SocketController } from "../../controllers/SocketController";

interface ChatProps {
  orientation: EScreenOrientation;
  socketController: SocketController
}
export const Chat = ({ orientation, socketController }: ChatProps) => {
  React.useEffect(() => {
    socketController.setChat.bind(this);
    socketController.sendRequest({user_action: ChatLibrary.USER_ANONYMOUS, user_id: "anonymous"} as UserPacketBase);
    return () => socketController.disconnect();
  });

  function handleSendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const MSGForm: HTMLFormElement = event.currentTarget;
    const MSG: string = MSGForm.MSGInput.value;
    const request:UserSendMessagePacket = {
      user_action: ChatLibrary.USER_SEND_MSG_TO_ROOM,
      user_id: socketController.accountProfile.username,
      user_message: MSG,
      user_name: socketController.accountProfile.username,
      message_room_id: +socketController.accountProfile.selectedRoomId
    }
    //capturamos mensaje a enviar
    socketController.sendRequest(request);
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
        <ChatMessages messages={socketController.accountProfile.rooms[+socketController.accountProfile.selectedRoomId].msgs} />
        <ChatControls handleSendMessage={handleSendMessage} />
      </Stack>
    </Flex>
  );
};
