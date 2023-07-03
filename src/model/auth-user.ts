export enum Genders {
    MALE = 'Male',
    FEMALE = 'Female',
}

export interface IUser {
    password: string;
    email: string;
    id: number;
}

export interface ICreateUserResponse {
    status: number;
    access_token?: string;
    user?: IUserWithoutPass;
    message?: string;
}

export type ILoginUserResponse = ICreateUserResponse;

export type IGetUserResponse = Omit<ILoginUserResponse, 'access_token'>;

export type IUserWithoutPass = Omit<IUser, 'password'>;

export type IDeleteUserResponse = Required<Pick<ILoginUserResponse, 'message' | 'status'>>;

export type IUpdateUserResponse = IDeleteUserResponse;
