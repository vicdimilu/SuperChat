import fs = require('fs');
import { ChatServerModel, RoomModel, UserModel } from "../database/models/ChatServerModel";

export class SQLServer{
    private _PrefixName = "ChatServer_";
    private _PathDatabase = "";
    private _ServerList: Array<string>;

    constructor(pathDatabase: string){
        this._PathDatabase = pathDatabase;
        this._LoadServerList();
    }

    private _LoadServerList(){
        this._ServerList = fs.readdirSync(this._PathDatabase);
        console.log("SQLServer.ts       > _LoadServerList(): ", this._ServerList);
        console.log("SQLServer.ts       > totalServers(): ", this._ServerList.length);
    }

    private _ChatServerDatabase(chatId: string): ChatServerModel{
        let chatServerModel = JSON.parse(fs.readFileSync(this._PathDatabase+this._ServerList[+chatId], {encoding: 'utf8'})) as ChatServerModel;
        console.log("SQLServer.ts       > _ChatServerDatabase(): Datos cargados a Chat ID:", "0x"+chatServerModel.sChatId);
        return chatServerModel;
    }
    
    public get totalServers() : number {
        return this._ServerList.length;
    }
    
    _GetRooms(chatId: string) : Array<RoomModel> {
        return this._ChatServerDatabase(chatId).sChatRooms;
    }

    _GetUserData(chatId: string, uId: string): UserModel{
        try {
            return this._ChatServerDatabase(chatId).sChatUsers.find(userModel => userModel.uId == uId);
        } catch (error) {
            return null;
        }
    }

    _CreateChatServer(): boolean{
        let mChatServer =  {
            sChatId: ""+(this.totalServers),
            sChatUsers: [],
            sChatRooms: [{
                rId: "0",
                rName: "General",
                rChat: [""],
                rOwnerId: "",
                rAdminsId: [],
                rMembers: []
            }]
        } as ChatServerModel;
        this._SaveChatServer(mChatServer);
        this._LoadServerList();
        return true;
    }

    _SaveChatServer(modelChatServer: ChatServerModel){
        const fileName = this._PrefixName+modelChatServer.sChatId.split("0x")[1]+".json";
        fs.writeFileSync(this._PathDatabase+fileName,JSON.stringify(modelChatServer),{encoding: 'utf8'});
    }
}