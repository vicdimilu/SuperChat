import * as React from "react";
import { extendTheme, ChakraProvider, Flex } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { Chat } from "./components/chat/Chat";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ChatMenu } from "./components/ChatMenu";
import "emoji-mart/css/emoji-mart.css";
import * as IO from "./controllers/SocketController";
type AppProps = {
  children: any;
};

export var _SocketController: IO.SocketController = new IO.SocketController("http://127.0.0.1:5000");

export enum EScreenOrientation {
  LANDSCAPE = 1,
  PORTRAIT = 2,
}
export const getScreenOrientation: () => EScreenOrientation = () =>
  window.innerWidth < window.innerHeight
    ? EScreenOrientation.PORTRAIT
    : EScreenOrientation.LANDSCAPE;
export const App = ({ children = null }: AppProps) => {
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
              bg: mode("#333", "#333")(props),
            },
          }),
        },
      })}
    >
      <HelmetProvider>
        <Helmet title="Super Chat" />
        <Flex
          w="100%"
          align="center"
          direction="column"
          justify="center"
          h="100vh"
        >
          <ChatMenu />
          <Chat orientation={getScreenOrientation()} socketController={_SocketController}/>
        </Flex>
      </HelmetProvider>
    </ChakraProvider>
  );
};
