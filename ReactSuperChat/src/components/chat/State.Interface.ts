export interface ChatState {
    value: string,
    msgCount: number,
    nick: string,
    message: string
}

export enum ChatLibrary {
    Anonymous = "0x00",
    Register = "0x01",
    Login = "0x02",
    RecoveryPass = "0x03",
    ActivateAccount = "0x04",
    GeneralChatMessage = "1x00",
    PrivateChatMessage = "1x01"
}