export interface Room {
    id: number,
    name: string,
    members: Array<string>,
    messages: Array<Message>,
}
export interface Message {
    authorId: number,
    authorName: string,
    body: string,
    time: Date,
}
