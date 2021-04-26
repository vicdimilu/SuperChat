import * as React from "react";
import { extendTheme, Heading, ChakraProvider, Flex } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Chat } from "./components/chat/Chat";
import { Helmet } from "react-helmet";
import "emoji-mart/css/emoji-mart.css";

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

export class App extends React.Component<any, any> {
  render() {
    return (
      <ChakraProvider
        theme={extendTheme({
          fonts: {
            heading: "Fredoka One",
            body: "Raleway",
            flex: "Raleway",
            button: "Indie Flower",
          },
          styles: {
            global: (props: any) => ({
              body: {
                bg: mode("gray.100", "#333")(props),
              },
            }),
          },
        })}
      >
        <Helmet title="Super Chat" />
        <Flex position="absolute" top="1" right="1">
          <ColorModeSwitcher m="0" p="0" />
        </Flex>
        <Flex align="center" direction="column" justify="center" h="100vh">
          <Flex h="25%" justify="center">
            <Heading textAlign="center" fontFamily="Fredoka One" as="h1">
              SuperChat
            </Heading>
          </Flex>
          <Chat />
        </Flex>
      </ChakraProvider>
    );
  }
}
