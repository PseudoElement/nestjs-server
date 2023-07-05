import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import { DeveloperCards } from './about-page.model';
import { DEVELOPER_CARDS_REPOSITORY } from 'src/constants';
import { IDeveloperCardFromDB, IDeveloperCardToDB } from 'src/model';
import { convertBufferToImg } from 'src/helpers';

@Injectable()
export class AboutPageService {
    private readonly attributes = { exclude: ['updatedAt', 'createdAt', 'id'] };

    constructor(@Inject(DEVELOPER_CARDS_REPOSITORY) private readonly developerCardsRepo: typeof DeveloperCards) {}
    private async _insertPhoto(data: IDeveloperCardToDB): Promise<void> {
        const imageBuffer = fs.readFileSync(data.photoPath);
        await this.developerCardsRepo.create({
            name: data.name,
            info: data.info,
            pathToPage: data.pathToPage,
            post: data.post,
            photo: imageBuffer,
        });
    }

    public async getDeveloperCards(): Promise<IDeveloperCardFromDB[]> {
        const res = await this.developerCardsRepo.findAll({ attributes: this.attributes });
        const developerCards = res.map((val) => {
            const data = val.dataValues;
            const photo = convertBufferToImg(data.photo);
            return { photoSrcData: photo, info: data.info, pathToPage: data.pathToPage, post: data.post, name: data.name };
        });
        return developerCards;
    }
}
