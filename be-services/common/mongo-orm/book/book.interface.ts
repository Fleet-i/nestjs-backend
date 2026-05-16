import { Document } from 'mongoose';
export interface IBook extends Document{
    readonly email: string;
    readonly name: string;
    readonly fromPinCode: number;
    readonly toPinCode: number;
    readonly fromAddress: string;
    readonly toAddress: string;
    readonly status: string;
}