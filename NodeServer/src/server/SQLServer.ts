export class SQLServer{
    private tableName: string;
    constructor(chatServerID:number){
        this.tableName = "ChatServer_"+chatServerID;
    }

    getTableName(){//test, eliminar al verificar que funciona la clase
        return this.tableName;
    }
}