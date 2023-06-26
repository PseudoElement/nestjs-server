import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';
import * as path from 'path';
import * as fs from 'fs';
import { DeveloperCardDto } from './dto';
import { DeveloperCards } from './about-page.model';

@Injectable()
export class AboutPageService implements OnModuleInit {
    private pool: Pool;

    constructor(@Inject('DEVELOPER_CARDS_REPOSITORY') private readonly developerCardsRepo: typeof DeveloperCards) {
        this.pool = new Pool({
            user: 'postgres',
            host: 'nestjs-postgres',
            database: 'nestjs-db',
            password: 'root',
            port: 5432,
        });
    }

    onModuleInit() {
        // this.insertPhoto({
        //     info: 'OOP-king, he knows about design-patterns more than you about yourself.',
        //     imagePath: '../../../../../Angular/BooBook.Root.Web/root-web/src/assets/img/jpg/Artur.jpg',
        //     name: 'Artur',
        //     path_to_page: '/developer/artur',
        //     post: 'C#-developer',
        // });
    }

    async insertPhoto(data: DeveloperCardDto): Promise<any> {
        console.log(path);
        const imageBuffer = fs.readFileSync(data.imagePath);
        const values = [data.name, data.post, data.info, data.path_to_page, 'PHOTO PATH'];

        await this.developerCardsRepo.create({
            name: data.name,
            info: data.info,
            path_to_page: data.path_to_page,
            post: data.post,
            photo: imageBuffer,
        });
    }

    public getData() {}
}
