export class UnverifiedUser {
    invite: Invite;
    unverifiedUserInfo: UnverifiedUserInfo;

    constructor() {
        this.invite = new Invite();
        this.unverifiedUserInfo = new UnverifiedUserInfo();
    }
}

export class Invite {
    receiverEmail: string;
    receiverPh: string;
    receiverUserId: string;
    receiverName: string;
    senderEmail: string;
    senderUserId: string;
    senderName: string;
    responseType = 'ACCEPTED';
    groupId: string;
    groupName: string;
    groupType: string;
    path: string;
    roles?: (string)[] | null;
    organisationId: string;
}

export class UnverifiedUserInfo {
    primaryType: string = 'email';
    userEntity: UserEntity;
    client_id: string;
    redirect_uri: string;
    response_type = 'token';

    constructor() {
        this.userEntity = new UserEntity();
    }
}

export class UserEntity {
    given_name: string;
    family_name: string;
    email: string;
    mobile_number: string;
    email_verified = true;
    password: string;
    userStatus = 'VERIFIED';
    provider = 'SELF';
    roles?: (string)[] | null = ['USER'];
    userGroups?: (UserGroupsEntity)[] | null;

    constructor() {
        this.userGroups = [];
    }
}

export class UserGroupsEntity {
    groupId: string;
    roles?: (string)[] | null;
}
