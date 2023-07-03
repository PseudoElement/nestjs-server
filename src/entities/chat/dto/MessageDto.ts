import { IsDate, IsEmail, IsString } from 'class-validator';

export class MessagesDto {
    @IsString()
    id: string;

    @IsString()
    @IsEmail()
    authorEmail: string;

    @IsDate()
    createdAt: Date;

    @IsString()
    text: string;
}
