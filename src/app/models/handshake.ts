export module HandShake {

    type HandshakeCategory = 'VEHICLEHANDOVER_FROM_NEWOWNER_TO_EXISTINGOWNER' |
        'VEHICLEHANDOVER_FROM_EXISTINGOWNER_TO_NEWOWNER' |
        'DRIVERINVITATION_FROM_OWNER_TO_DRIVER' |
        'DRIVERINVITATION_FROM_DRIVER_TO_OWNER';

    type HandshakeType = 'REQUEST' | 'RESPONSE' | 'ABORT';

    export class HandshakeRequest {
        handshakeId: string;
        vehicleId: string;
        handshakeCategory: string | HandshakeCategory;
        handshakeType: string | HandshakeType;
        string;
        senderEmail: string;
        senderName: string;
        createTime: string;
        fleetId: string;
        senderUserId: string;
        receiverUserId: string;
        receiverMember: boolean;
        receiverEmail: string;
        receiverName: string;
        vehicleMake: string;
        vehicleModel: string;
        vehicleVariant: string;
        vehiclePictureUrl: string
    }
}
