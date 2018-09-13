export module Carbook {

    export class InviteModel {
        id: string;
        receiverEmail: string;
        receiverPh: string;
        receiverUserId: string;
        receiverName: string;
        senderEmail: string;
        senderUserId: string;
        senderName: string;
        responseType: string;
        createTime: Date;
        updateTime: Date;
        groupId: string;
        groupName: string;
        path: string;
        roles: string[];
        groupType: string;
        organisationId: string;
    }

    export const roles = [
        {label: 'Admin', value: 'CB_ADMIN', de: 'Admin'},
        {label: 'Accountant', value: 'ACCOUNTANT', de: 'Buchhalter'},
        {label: 'Manager', value: 'MANAGER', de: 'Manager'},
        {label: 'Driver', value: 'DRIVER', de: 'Fahrer'}
    ]

}

