export interface Room {
    rId: string,
    rName: string,
    rChat: Array<string>,
    rOwnerId: string,
    rAdminsId: Array<string>,
    rMembers: Array<string>
}