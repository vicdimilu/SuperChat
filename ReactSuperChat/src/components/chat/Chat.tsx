import * as React from "react";
import { Flex, InputGroup, Stack, Input, Button } from "@chakra-ui/react";
import { io } from "socket.io-client";
import { ChatLibrary } from "./State.Interface";
import { MessageList } from "./MessageList";

export class Chat extends React.Component<any, any> {
  messages: any = [];
  nick: string = "Ex: Lucas";
  url: string = "http://127.0.0.1:5000";
  socket: any = io(this.url);
  constructor(props: any) {
    super(props);
    this.state = {
      value: "Joining",
      msgCount: 0,
      userSocket: null,
      pickerVisibility: "none",
      userName: "AnonymousUser",
    };
    //Init Functions
    this.handleExitChat = this.handleExitChat.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
  }

  componentDidMount() {
    this.socket.emit(ChatLibrary.Anonymous, this.state.userName);
    //activate messages receptor
    this.socket.on(ChatLibrary.GeneralChatMessage, (message: string) => {
      this.messages.push(message);
      // We use an empty setState to rerender the component
      this.setState({});
    });
    //Login Receptor
    this.socket.on(ChatLibrary.Anonymous, (packet: boolean) => {
      if (packet) {
        this.setState({ value: "Joined" });
      }
    });
    //Private Messeges Receptor
    this.socket.on(ChatLibrary.PrivateChatMessage, (msg: any) => {
      console.log("Chat: <componentDidMount> ", msg);
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  handleExitChat() {
    this.updateState({ value: "Joining" });
    this.socket.disconnect();
  }

  //Send Message METHOD
  handleSendMessage(event: any) {
    event.preventDefault();
    const MSGForm: HTMLFormElement = event.target;
    //capturamos mensaje a enviar
    this.socket.emit(ChatLibrary.GeneralChatMessage, MSGForm.MSGInput.value);
    MSGForm.MSGInput.value = "";
  }

  updateState(value: any) {
    this.setState(value);
    console.log("UPDATE STATE: ", this.state);
  }

  handleJoin(event: any) {
    event.preventDefault();
  }
  render() {
    return (
      <Flex
        w="95%"
        h="95%"
        justify="center"
        align="center"
        bgColor="white"
        boxShadow="md"
        rounded="lg"
      >
        <Stack
          h="100%"
          w="100%"
          direction="column"
          justify="space-between"
          spacing={0}
        >
          <MessageList messages={this.messages} />
          <Flex
            h="10%"
            justify="center"
            backgroundColor="gray.700"
            align="center"
          >
            <form onSubmit={this.handleSendMessage}>
              <Flex w="100%" align="center">
                <Flex
                  fontSize={{ base: "10px", md: "12px" }}
                  children={this.state.userName}
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
  }
}
