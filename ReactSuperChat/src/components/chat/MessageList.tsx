import * as React from "react";
import { Flex } from "@chakra-ui/react";
import { Message } from '../Msg';

export class MessageList extends React.Component<{messages: [any]}, {}> {

    render() {
        const messageList: any = 
            <Flex 
                direction="column" 
                fontFamily="raleway"
            > 
                {this.props.messages.map(m => {
                    return <Message message={m}/>
                })}
            </Flex>
            return messageList;
    }

}
