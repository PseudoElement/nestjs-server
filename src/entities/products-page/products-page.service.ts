import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { WEB_APPS_REPOSITORY } from 'src/constants';
import { Applications } from './apps.model';
import { IAppToDB, IApplicationFromDB } from 'src/model';
import * as fs from 'fs';

@Injectable()
export class ProductsPageService implements OnModuleInit {
    constructor(@Inject(WEB_APPS_REPOSITORY) private appsRepository: typeof Applications) {}

    async onModuleInit() {
        await this.addApp({
            authorPhoto: '../../../../../Angular/BooBook.Root.Web/root-web/src/assets/img/png/LarosPreview.png',
            title: 'Laros',
            url: 'https://laros.ch/',
            description: 'Swiss travel agency web-app for booking tickets to Greece and Cyprus',
            authorLink: '/developer/sintol',
        });
    }

    public async getAllWebApplications(): Promise<IApplicationFromDB[]> {
        const res = await this.appsRepository.findAll({ attributes: { exclude: ['updatedAt'] } });
        return res;
    }
    public async addApp(data: IAppToDB): Promise<any> {
        const photoBuffer = fs.readFileSync(data.authorPhoto);
        console.log('PHOTO_BUFFER', photoBuffer);
        const res = await this.appsRepository.create({
            authorLink: data.authorLink,
            authorPhoto: photoBuffer,
            title: data.title,
            description: data.description,
            url: data.url,
        });
        console.log('RESPONSE', res);
    }
}
