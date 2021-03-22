import * as React from "react"
//import { Logo } from "./Logo"
//import { BsFillPersonLinesFill } from 'react-icons/bs';
//import { Textarea, Flex, Container, Heading, ChakraProvider, Box, Text, Link, VStack, Stack, Code, Grid, theme, Input, FormControl, FormLabel, FormErrorMessage, FormHelperText, Button, ButtonGroup} from "@chakra-ui/react"
import { Heading, ChakraProvider, Box, VStack, Grid, theme} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Chat } from "./components/chat/Chat";

/*SEND MESSAGES
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

export const App = () => (
    <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
            <Grid minH="100vh" p={3}>
                <ColorModeSwitcher justifySelf="flex-end" />
                <VStack spacing={8}>
                    <Heading as="h1" size="4xl">SuperChat</Heading>
                    <Chat/>
                </VStack>
            </Grid>
        </Box>
    </ChakraProvider>
)
