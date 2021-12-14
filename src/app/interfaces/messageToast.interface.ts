export enum msgType { error, success };

export interface MessageToast {
    text: string;
    messageType: msgType;
    iat?: Date;
};