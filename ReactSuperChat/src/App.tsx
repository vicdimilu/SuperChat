import * as React from "react"
import { Logo } from "./Logo"
import { BsFillPersonLinesFill } from 'react-icons/bs';
import {
    Textarea,
    Flex,
    Container,
    Heading,
    ChakraProvider,
    Box,
    Text,
    Link,
    VStack,
    Stack,
    Code,
    Grid,
    theme,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Button,
    ButtonGroup,
} from "@chakra-ui/react"
import { io } from "socket.io-client";
import { ColorModeSwitcher } from "./ColorModeSwitcher"
/* SEND MESSAGES
   socket.emit('chat message', "hola");

   CONNECTION
   const socket = io("http://127.0.0.1:5000");
   READ MESSAGES
   let messages : Array <string> = [];
   socket.on("chat message", (msg : any) => {
   messages.push(msg);
   console.log(msg);
   let showMsg = messages.map( msg => { <li>{msg}</li> })
   })
 */

const url: string = "http://127.0.0.1:5000";
const socket: any = io(url);
//const socket: any = io(url, { autoConnect : false});
socket.onAny((event: any, ...args: any) => {
  console.log(event, args);
});
class Chat extends React.Component< any > {
    constructor(props: any) {
        super(props);
        this.state = {value: 'Joining', msgCount: 0};
        this.join = this.join.bind(this);
        this.exit = this.exit.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }
    messages: any = [];
    join(event: any) {
        event.preventDefault();
        this.setState( {value: 'Joined'});
        // @ts-ignore
        const nick: string = document.getElementById("nick").value;
        alert( nick + ' Joined');
        //socket.auth = nick;
        //socket.connect();
    }
    exit() {
        this.setState({value: 'Joining'})
        socket.disconnect();
    }
    sendMessage(event: any) {
        event.preventDefault();
        // @ts-ignore
        const message: string = document.getElementById("msg").value;
        socket.emit("testChannel", message);
        // @ts-ignore
        this.messages.push(<p> { message } </p>);
        // no funciona conectarme al canal test
        socket.on("testChannel", (msg: any) => {
            console.log(msg); // world
        });
        console.log("message sent")
        this.setState({});
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
                            <Input name="msg" id="msg" type="text" size="xs"/>
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
export const App = () => (

    <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
            <Grid minH="100vh" p={3}>
                <ColorModeSwitcher justifySelf="flex-end" />
                <VStack spacing={8}>
                    <Heading as="h1" size="4xl">SuperChat</Heading>
                    <Chat />
                </VStack>
            </Grid>
        </Box>
    </ChakraProvider>
)
