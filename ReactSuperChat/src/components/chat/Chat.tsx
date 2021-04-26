import * as React from "react";
//import { Textarea, Flex, Container, Heading, ChakraProvider, Box, Text, Link, VStack, Stack, Code, Grid, theme, Input, FormControl, FormLabel, FormErrorMessage, FormHelperText, Button, ButtonGroup} from "@chakra-ui/react";
import {
  Flex,
  InputRightElement,
  InputGroup,
  Stack,
  Input,
  Button,
} from "@chakra-ui/react";
import { io } from "socket.io-client";
import { ChatLibrary } from "./State.Interface";
import { AnonymousForm } from "../forms/AnonymousForm";
import { MessageList } from "./MessageList";
import { Picker, Emoji } from "emoji-mart";

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
    };
    //Init Functions
    this.handleExitChat = this.handleExitChat.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.addEmoji = this.addEmoji.bind(this);
    this.showEmojiPicker = this.showEmojiPicker.bind(this);
  }

  componentDidMount() {
    //activate messages receptor
    this.socket.on(ChatLibrary.GeneralChatMessage, (message: string) => {
      this.messages.push(message);
      // We use an empty etState to rerender the component
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

  addEmoji(emojiObj: any) {}
  showEmojiPicker() {
    const visibilityValue: string =
      this.state.pickerVisibility === "none" ? "auto" : "none";
    this.setState({
      pickerVisibility: visibilityValue,
    });
    return undefined;
  }
  render() {
    if (this.state.value === "Joining") {
      return (
        // This should be an "EntryForm" that ask for either
        // a nickname (as an anonymous user) or login credentials (registered user)
        <AnonymousForm userSocket={this.socket} />
      );
    } else {
      return (
        <Flex
          w="75%"
          h="50%"
          justify="center"
          align="center"
          bgColor="white"
          border="solid 1px gray"
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
            <Flex h="10%" align="center">
              <form
                style={{ width: "100%", padding: "2%" }}
                onSubmit={this.handleSendMessage}
              >
                <Flex align="center">
                  <InputGroup size="md">
                    <Input
                      variant="flushed"
                      name="MSGInput"
                      id="MSGInput"
                      type="text"
                      size="xs"
                      w="90%"
                      placeholder="Type here to message others."
                      mr="1"
                    />
                    <InputRightElement position="relative" width="4.5rem">
                      <Flex
                        borderColor="blue"
                        display={this.state.pickerVisibility}
                        bottom="100"
                        position="absolute"
                        as="span"
                      >
                        <Picker
                          set="google"
                          title=""
                          emoji=""
                          showSkinTones={false}
                          showPreview={false}
                          onClick={undefined}
                        />
                      </Flex>
                      <Button
                        h="1.75rem"
                        bgColor="red"
                        size="sm"
                        onClick={this.showEmojiPicker}
                        value="ASD"
                      />
                    </InputRightElement>
                  </InputGroup>
                  <Button
                    variant="outline"
                    fontFamily="Indie Flower"
                    w="10%"
                    rounded="md"
                    type="submit"
                    size="xs"
                  >
                    Send
                  </Button>
                </Flex>
              </form>
              <Flex align="center" h="10%" p="2">
                <Button
                  fontFamily="Indie Flower"
                  variant="outline"
                  type="submit"
                  rounded="md"
                  onClick={this.handleExitChat}
                >
                  Exit Chat
                </Button>
              </Flex>
            </Flex>
          </Stack>
        </Flex>
      );
    }
  }
}
