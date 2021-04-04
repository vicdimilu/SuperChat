import * as React from "react"
//import { Logo } from "./Logo"
//import { BsFillPersonLinesFill } from 'react-icons/bs';
//import { Textarea, Flex, Container, Heading, ChakraProvider, Box, Text, Link, VStack, Stack, Code, Grid, theme, Input, FormControl, FormLabel, FormErrorMessage, FormHelperText, Button, ButtonGroup} from "@chakra-ui/react"
import { extendTheme, Heading, ChakraProvider, Box, VStack, Flex, theme} from "@chakra-ui/react"
import { mode } from '@chakra-ui/theme-tools';
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Chat } from "./components/chat/Chat";
import { Helmet } from "react-helmet";

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
    <ChakraProvider
        theme={extendTheme({
            fonts: {
                heading:"Fredoka One",
                body: "Raleway",
                flex: "Raleway",
                button: "Indie Flower",
            },
            styles: {
                global: (props: any) => ({
                    body: {
                        bg: mode('#ffe', 'gray.800')(props),
                    },
                }),
            },
        })}
    >
        <Helmet
            title="Super Chat"
        />
        <Flex
            justify="flex-end"
            align="center"
            h="10vh"
        >
            <ColorModeSwitcher
                m="0"
                p="0"
            />
        </Flex>
        <Flex
            align="center"
            direction="column"
            justify="center"
            h="90vh"
        >
            <Heading
                fontFamily="Fredoka One"
                as="h1"
            >
                SuperChat
            </Heading>
            <Chat/>
        </Flex>
    </ChakraProvider>
)
