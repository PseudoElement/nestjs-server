import { IsString } from 'class-validator';

export class DeveloperCardDto {
    @IsString()
    name: string;

    @IsString()
    post: string;

    @IsString()
    info: string;

    @IsString()
    path_to_page: string;

    @IsString()
    imagePath: string;
}
