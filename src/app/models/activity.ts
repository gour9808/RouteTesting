export enum CarbookBaseType {
    LOCATION_PREDICTION_TASK, VEHICLE_HANDOVER_TASK, VEHICLE_HANDOVER_ACTIVITY, LOGBOOK_PRINT_ACTIVITY, ADD_VEHICLE_TO_FLEET_TASK, INSURANCE_REMINDER_ACTIVITY, SERVICE_REMINDER_ACTIVITY, DRIVER_INVITE_TASK, DRIVER_INVITE_ACTIVITY, OBD_DEVICE_STARTED, OBD_TRIP_ENDED, DEALER_PRMOTION_ACTIVITY, REMOVE_DRIVER_ACTIVITY, OPEN_REQUEST_TASK, OPEN_REQUEST_ACTIVITY, CAMPAIGN_PUSH, CAMPAIGN_STORY, INVITE_REQUEST_TASK, VEHICLE_TRACKER_ACTIVITY, HANDSHAKE_ABORT_ACTIVITY
}

export enum HandShakeCategory {
    VEHICLEHANDOVER_FROM_NEWOWNER_TO_EXISTINGOWNER, VEHICLEHANDOVER_FROM_EXISTINGOWNER_TO_NEWOWNER, DRIVERINVITATION_FROM_OWNER_TO_DRIVER, DRIVERINVITATION_FROM_DRIVER_TO_OWNER
}

export enum HandShakeType {
    REQUEST, RESPONSE
}

export enum ResponseType {
    PENDING, ACCEPTED, REJECTED, ABORTED, DELETED
}

export enum ActivityStatus {
    ACTIVTY_ACCEPTED, ACTIVITY_REJECTED, ACTIVITY_ABORTED
}

class Geopoint {
    lon: number;
    lat: number;
    alt: number;
}

class CarbookBaseActivity {
    actor: string;
    verb: string;
    object: string;
    target: string;
    time: string;
    to: string[];
    acted: boolean;
    timeToLive: number;
    score: number;
    foreign_id: string;
    carbookBaseType: CarbookBaseType;
}

export class DriverInviteActivity extends CarbookBaseActivity {
    handshakeId: string;
    vehicleId: string;
    handshakeCategory: HandShakeCategory;
    handshakeType: HandShakeType;
    responseType: ResponseType;
    mailLocale: any;
    createTime: string;
    vehicleMake: string;
    vehicleModel: string;
    vehicleVariant: string;
    vehiclePictureUrl: string;
    senderEmail: string;
    senderName: string;
    receiverEmail: string;
    receiverName: string
}

export class DriverInviteTask extends CarbookBaseActivity {
    handshakeId: string;
    vehicleId: string;
    handshakeCategory: HandShakeCategory;
    handshakeType: HandShakeType;
    responseType: ResponseType;
    senderEmail: string;
    senderName: string;
    receiverMember: boolean;
    receiverEmail: string;
    receiverName: string;
    mailLocale: any;
    createTime: string;
    vehicleMake: string;
    vehicleModel: string;
    vehicleVariant: string;
    vehiclePictureUrl: string;
}

export class HandshakeAbortActivity extends CarbookBaseActivity {
    handshakeId: string;
    vehicleId: string;
    handshakeCategory: HandShakeCategory;
    responseType: ResponseType;
    senderEmail: string;
    senderName: string;
    receiverMember: boolean;
    receiverEmail: string;
    receiverName: string;
    mailLocale: any;
    vehicleMake: string;
    vehicleModel: string;
    vehicleVariant: string;
    vehiclePictureUrl: string;
}

export class Invite {
    id: string;
    receiverEmail: string;
    receiverPh: string;
    receiverUserId: string;
    receiverName: string;
    senderEmail: string;
    senderUserId: string;
    senderName: string;
    responseType: ResponseType;
    createTime: string;
    updateTime: string;
    groupId: string;
    groupName: string;
    groupType: string;
    path: string;
    roles: string[];
    organisationId: string;
}

export class InviteRequest extends CarbookBaseActivity {
    invite: Invite;
    responseType: ResponseType;
}

export class IActivityUpdateRequest {
    userId: string;
    activityId: string;
    baseType: string;
    status: string;
    activityIds: any[];
}

export const ActivityUpdateRequest = IActivityUpdateRequest;
export type ActivityUpdateRequest = IActivityUpdateRequest;
