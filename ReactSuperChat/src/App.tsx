import * as React from "react";
import { extendTheme, Heading, ChakraProvider, Flex } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Chat } from "./components/chat/Chat";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "emoji-mart/css/emoji-mart.css";
type AppProps = {
  children: any;
};
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
        <Flex align="center" justify="center" h="100vh">
          <Chat />
        </Flex>
      </HelmetProvider>
    </ChakraProvider>
  );
};
