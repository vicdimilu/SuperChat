import { Flex, Stack } from "@chakra-ui/react";
import { ChatMessages } from "./MessageList";
import { EScreenOrientation } from "../../App";
import { ChatControls } from "../chat/ChatControls";
import { useState, useEffect } from "react";
import { ChatLibrary, UserPacketBase, UserProfile, UserSendMessagePacket } from "../../controllers/State.Interface";
import { _UserSocketSendRequest, _UserSocketSubscribe } from "../../controllers/UserSocketController";
import { _UserGetSelectedIdRoom, _UserGetUsername, _UserIsAuthenticated } from "../../controllers/UserController";

interface ChatProps {
  orientation: EScreenOrientation;
}
export const Chat = ({ orientation }: ChatProps) => {

  const [chatRoomMsg, setChatRoomMsg] = useState([""]);

  useEffect(() => {
    //Only test Anonymous
    if(!_UserIsAuthenticated()){
      _UserSocketSendRequest({user_action: ChatLibrary.USER_ANONYMOUS, user_id: "anonymous"} as UserPacketBase);
      _UserSocketSubscribe(ChatLibrary.USER_ANONYMOUS, handleRecvMsgToChat);
      _UserSocketSubscribe(ChatLibrary.USER_SEND_MSG_TO_ROOM, handleRecvMsgToChat);
    }
    return;
  });

  function handleSendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const MSGForm: HTMLFormElement = event.currentTarget;
    const MSG: string = MSGForm.MSGInput.value;
    const request:UserSendMessagePacket = {
      user_action: ChatLibrary.USER_SEND_MSG_TO_ROOM,
      user_id: _UserGetUsername(),
      user_message: MSG,
      user_name: _UserGetUsername(),
      message_room_id: +_UserGetSelectedIdRoom()
    }
    //enviamos mensaje
    _UserSocketSendRequest(request);
    MSGForm.MSGInput.value = "";
  }

  function handleRecvMsgToChat(err: string, user:UserProfile){
    setChatRoomMsg(user.rooms[+user.selectedRoomId].msgs);
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
        <ChatMessages messages={chatRoomMsg} />
        <ChatControls handleSendMessage={handleSendMessage} />
      </Stack>
    </Flex>
  );
};
