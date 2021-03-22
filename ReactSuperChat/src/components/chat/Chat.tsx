import * as React from 'react';
//import { Textarea, Flex, Container, Heading, ChakraProvider, Box, Text, Link, VStack, Stack, Code, Grid, theme, Input, FormControl, FormLabel, FormErrorMessage, FormHelperText, Button, ButtonGroup} from "@chakra-ui/react";
import { Flex, Box, Stack, Input, FormLabel, Button } from "@chakra-ui/react";
import { io } from "socket.io-client";
import { ChatLibrary } from './State.Interface';
import { AnonymousForm } from '../forms/AnonymousForm';
import { MessageList } from './MessageList';

export class Chat extends React.Component<any> {

    messages: any = [];
    nick: string = "Ex: Lucas";
    message: string = "Write Msg to Send";
    url: string = "http://127.0.0.1:5000";
    socket:any = io(this.url);
    //const socket: any = io(url, { autoConnect : false });
    /*socket.onAny((event: any, ...args: any) => {
      console.log(event, args);
      console.log("socket onAny");
    });*/
    constructor(props: any) {
        super(props);
        this.state = {
            value: 'Joining',
            msgCount: 0,
            userSocket: null
        };
        //Init Functions
        this.handleExitChat = this.handleExitChat.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);
    }

    componentDidMount(){
        //activate messages receptor
        this.socket.on(ChatLibrary.GeneralChatMessage, (msg: any) => {
            this.messages.push(<p> { msg } </p>);
            this.setState({});//probar con this.render()
        });
        //Login Receptor
        this.socket.on(ChatLibrary.Anonymous, (packet: boolean) => {
            if(packet){
                this.setState({value: 'Joined'});
            }
        });
        //Private Messeges Receptor
        this.socket.on(ChatLibrary.PrivateChatMessage, (msg: any) => {
            console.log("Chat: <componentDidMount> ", msg);
        })
    }

    componentWillUnmount(){
        this.socket.disconnect();//revisar
    }

    //Exit METHOD
    handleExitChat() {
        this.updateState({value: 'Joining'});
        this.props.socket.disconnect();
    }

    //Send Message METHOD
    handleSendMessage(event: any) {
        event.preventDefault();
        //capturamos mensaje a enviar
        this.message = (document.getElementById('msg') as HTMLInputElement).value;
        (document.getElementById('msg') as HTMLInputElement).value = "";
        this.socket.emit(ChatLibrary.GeneralChatMessage, this.message);
    }

    updateState(value:any){
        this.setState(value);
        console.log("UPDATE STATE: ", this.state);
    }

    render() {
        // @ts-ignore
        if (this.state.value === 'Joining') {
            return (
                <AnonymousForm userSocket={this.socket}/>
            )
        }
        else {
            return (
                <Box>
                    <Stack spacing={8}>
                        <MessageList messages={this.messages}/>
                        <Flex>
                            <FormLabel>Message</FormLabel>
                            <Input name="msg" id="msg" type="text" size="xs" placeholder="write message to send"/>
                            <Button  type="submit" size="xs" onClick={this.handleSendMessage}>Send</Button>
                        </Flex>
                    </Stack>
                    <Button  type="submit" isFullWidth={true} onClick={this.handleExitChat}>Exit Chat</Button>
                </Box>
            );
        }
    }
}