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
}

export type IUserWithoutPass = Omit<IUser, "password">