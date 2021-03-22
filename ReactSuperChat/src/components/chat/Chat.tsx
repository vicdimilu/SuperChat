import * as React from 'react';
//import { Textarea, Flex, Container, Heading, ChakraProvider, Box, Text, Link, VStack, Stack, Code, Grid, theme, Input, FormControl, FormLabel, FormErrorMessage, FormHelperText, Button, ButtonGroup} from "@chakra-ui/react";
import { Flex, Box, Stack, Input, FormControl, FormLabel, Button } from "@chakra-ui/react";
import { io } from "socket.io-client";
import { ChatLibrary } from './State.Interface';

export class Chat extends React.Component< any > {

    messages: any = [];
    nick: string = "Ex: Lucas";
    message: string = "Write Msg to Send";
    url: string = "http://127.0.0.1:5000";
    socket: any = io(this.url);
    //const socket: any = io(url, { autoConnect : false });
    /*socket.onAny((event: any, ...args: any) => {
      console.log(event, args);
      console.log("socket onAny");
    });*/
    constructor(props: any) {
        super(props);
        this.state = {
            value: 'Joining',
            msgCount: 0
        };
        //Init Functions
        this.join = this.join.bind(this);
        this.exit = this.exit.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    componentDidMount(){
        //activate messages receptor
        this.socket.on(ChatLibrary.GeneralChatMessage, (msg: any) => {
            this.messages.push(<p> { msg } </p>);
            this.setState({});//probar con this.render()
        });
    }

    componentWillUnmount(){
    }

    //Join METHOD
    join(event: any) {
        event.preventDefault();
        this.updateState({value: 'Joined'});
        this.nick = (document.getElementById('nick') as HTMLInputElement).value;
        this.socket.emit(ChatLibrary.Anonymous, this.nick);
        alert(this.nick + ' Joined');
    }

    //Exit METHOD
    exit() {
        this.updateState({value: 'Joining'});
        this.props.socket.disconnect();
    }

    //Send Message METHOD
    sendMessage(event: any) {
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
                <form onSubmit={this.join}>
                    <FormControl isRequired>
                            <Stack>
                                <Flex>
                                    <FormLabel>Nickname</FormLabel>
                                    <Input name="nick" id="nick" type="text" size="xs" placeholder="Ex: Lucas"/>
                                </Flex>
                                <Button  type="submit" size="md">Join Chat</Button>
                            </Stack>
                    </FormControl>
                </form>
            )
        }
        else {
            return (
                <>
                <Box>
                    <Stack spacing={8}>
                        <Flex direction="column" border="1px" borderColor="gray.200">{this.messages}</Flex>
                        <Flex>
                            <FormLabel>Message</FormLabel>
                            <Input name="msg" id="msg" type="text" size="xs" placeholder="write message to send"/>
                            <Button  type="submit" size="xs" onClick={this.sendMessage}>Send</Button>
                        </Flex>
                    </Stack>
                    <Button  type="submit" isFullWidth={true} onClick={this.exit}>Exit Chat</Button>
                </Box>
                </>
                   )
        }
    }
}