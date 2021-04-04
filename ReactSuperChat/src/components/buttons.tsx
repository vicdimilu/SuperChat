// FINISH THIS FILE IT DOES NOT WORK AT ALL !!!
import { Flex, Box, Stack, Input, Button } from "@chakra-ui/react";
import * as React from 'react';

enum ButtonVariants {
    Exit = "Exit",
    Send = "Send",
    Join = "Join"
}

export class ChatButton extends React.Component<{variant: ButtonVariants}, {}> {
    SendButton: any = 
            <Button  
                variant="outline"
                fontFamily="Indie Flower"
                w="10%"
                rounded="md"
                type="submit" 
                size="xs"
            >
                Send
            </Button>;
    selectButton()

    render() {
        return this.selectButton(this.props.variant);
    }
}
