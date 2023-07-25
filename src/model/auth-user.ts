export enum Genders {
    MALE = 'Male',
    FEMALE = 'Female',
}

export interface IUser {
    password: string;
    email: string;
    id: number;
}

export interface IUserWithoutPass extends Omit<IUser, 'password'> {
    photoSrc: string | null;
}

export interface ICreateUserResponse {
    status: number;
    access_token?: string;
    refresh_token?: string;
    user?: IUserWithoutPass;
    message?: string;
}

export type ILoginUserResponse = ICreateUserResponse;

export type IGetUserResponse = Omit<ILoginUserResponse, 'access_token' | 'refresh_token'>;

export type IDeleteUserResponse = Required<Pick<ILoginUserResponse, 'message' | 'status'>>;
