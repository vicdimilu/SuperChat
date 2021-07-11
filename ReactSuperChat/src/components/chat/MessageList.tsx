import * as React from "react";
import { Flex } from "@chakra-ui/react";
import { Message } from "../Msg";

export class ChatMessages extends React.Component<{ messages: any[] }, {}> {
  render() {
    const messageList: any = (
      <Flex direction="column" fontFamily="raleway">
        {this.props.messages.map((m) => {
          return <Message key={m+Math.round(1000000)+Math.round(1000000)} message={m} />;
        })}
      </Flex>
    );
    return messageList;
  }
}
