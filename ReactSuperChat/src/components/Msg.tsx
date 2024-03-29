import * as React from "react";
import { Flex } from "@chakra-ui/react";

export class Message extends React.Component<{ message: string }, {}> {
  render() {
    return (
      <Flex
        justify="start"
        color="gray.700"
        fontSize="xs"
        pl="2"
        borderBottom="solid 1px #BBB"
        borderBottomStyle="dashed"
        rounded="sm"
      >
        {this.props.message}
      </Flex>
    );
  }
}
