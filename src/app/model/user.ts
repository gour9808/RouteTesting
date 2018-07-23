export class CreateUser {
    DebugLevelId: string;
    ExpirationDate: Date;
    LogType: string;
    TracedEntityId: string;

    constructor() {
        this.DebugLevelId = "";
        this.ExpirationDate =new  Date()
        this.LogType = "";
        this.TracedEntityId = "";
    }
}

export class clearUsername
{
    userName: string;
    devName: string
}
