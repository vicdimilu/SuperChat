export interface FriendResponse {
    friendList: Array<Friend>,
    result: boolean,
}
export interface Friend {
    nick: string
    state: 0 | 1; 
}
