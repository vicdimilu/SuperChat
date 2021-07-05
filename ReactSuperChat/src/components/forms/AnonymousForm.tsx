import * as React from "react";
import {
  Flex,
  Stack,
  Input,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import { ChatAPI, ChatLibrary, UserPacketBase } from "../chat/State.Interface";

export class AnonymousForm extends React.Component<any> {
  private socket: any = null;

  constructor(props: any) {
    super(props);
    this.socket = props.userSocket;
    this.handleJoin = this.handleJoin.bind(this);
  }

  handleJoin(event: any) {
    event.preventDefault();
    console.log(event.target.name);
    this.socket.emit(ChatAPI.API_CODE, {
      user_action: ChatLibrary.USER_ANONYMOUS,
      user_id: event.target.name.value
    } as UserPacketBase);
  }

  render() {
    return (
      <Flex bgColor="white" p="5" boxShadow="md" rounded="md">
        <form onSubmit={this.handleJoin}>
          <FormControl isRequired>
            <Stack>
              <Flex>
                <FormLabel mr="1" mb="0">
                  Name
                </FormLabel>
                <Input
                  variant="flushed"
                  name="name"
                  id="name"
                  type="text"
                  size="xs"
                  placeholder=""
                />
              </Flex>
              <Button
                fontFamily="Indie Flower"
                variant="outline"
                type="submit"
                size="md"
                bgColor="gray.700"
                color="white"
              >
                Join Chat
              </Button>
            </Stack>
          </FormControl>
        </form>
      </Flex>
    );
  }
}
