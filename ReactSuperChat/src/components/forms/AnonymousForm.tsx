import * as React from "react";
import { Flex, Stack, Input, FormControl, FormLabel, Button } from "@chakra-ui/react";
import { ChatLibrary } from "../chat/State.Interface";

export class AnonymousForm extends React.Component<any> {

    private socket: any = null;
    //private nick: string = "";

    constructor(props: any){
        super(props);
        this.socket = props.userSocket;
        this.handleJoin = this.handleJoin.bind(this);
        //this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleJoin(event: any){
        event.preventDefault();
        console.log(event.target.nick);
        this.socket.emit(ChatLibrary.Anonymous, event.target.name.value);
        //console.log("AnonymousForm: <handleJoin> " + this.nick);
    }

    //handleOnChange(event: any){
        //this.nick = event.target.value;
        //console.log("AnonymousForm: <handleOnCHange> " + this.nick);
    //}

    render(){
        return (
            <form onSubmit={this.handleJoin}>
                <FormControl isRequired>
                    <Stack>
                        <Flex>
                            <FormLabel mr="1" mb="0">Name</FormLabel>
                            <Input 
                                variant="flushed"
                                name="name" 
                                id="name" 
                                type="text" 
                                size="xs" 
                                placeholder=""
                                //onChange={this.handleOnChange}
                            />
                        </Flex>
                        <Button  
                            fontFamily="Indie Flower"
                            variant="outline"
                            type="submit" 
                            size="md"
                        >
                            Join Chat
                        </Button>
                    </Stack>
                </FormControl>
            </form>
        );
    };
}
