export enum Genders {
    MALE = 'Male',
    FEMALE = 'Female',
}

export interface IUser{
    nameLast: string
    nameFirst: string
    password: string
    email: string
    birthDate: Date
    gender: Genders
    id:number
}

export interface ICreateUserResponse{
    status: number,
    access_token: string
    user: IUserWithoutPass
}

export interface ILoginUserResponse {
    status: number
    message?: string
    access_token?: string
    user?: IUserWithoutPass
} 

export type IUserWithoutPass = Omit<IUser, "password">