import { IUserWithoutPass } from './auth-user';

export interface IChangeUserPhotoRes {
    photoSrc?: string;
    message?: string;
    status: number;
}
export interface IChangeUserPhotoRequestBody {
    id: string;
    newPhoto: Buffer;
}
export interface IChangeUserEmailRequestBody {
    id: number;
    email: string;
}

export interface IChangeUserEmailRes {
    user?: IUserWithoutPass;
    status: number;
    message?: string;
}
