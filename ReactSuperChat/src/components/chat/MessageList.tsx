import * as React from "react";
import { Flex } from "@chakra-ui/react";

export class MessageList extends React.Component<any> {

    messages: Array<string> = [];

    constructor(props: any){
        super(props);
        this.messages = props.messages;
    }

    render() {
        const listMessages = this.messages.map( (msg, index)=> 
            <Flex direction="column" border="1px" borderColor="gray.200" key={index}>{msg}</Flex>
        );

        return listMessages;
    }

}