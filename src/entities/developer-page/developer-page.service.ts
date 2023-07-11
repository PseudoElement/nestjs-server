import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Developers } from './developer-page.model';
import { IDeveloperPageInfoFromDB, IDeveloperPageInfoToDB } from 'src/model';
import * as fs from 'fs';
import { DEVELOPERS_REPOSITORY, developers } from 'src/constants';
import { convertBufferToImg } from 'src/helpers';

@Injectable()
export class DeveloperPageService implements OnModuleInit {
    private readonly attributes = { exclude: ['updatedAt', 'createdAt', 'id'] };
    constructor(@Inject(DEVELOPERS_REPOSITORY) private readonly developersRepository: typeof Developers) {}

    async onModuleInit() {}

    private async _addAllDevelopers() {
        for (const developer of developers) {
            await this._addDeveloperInDB(developer);
        }
    }

    private async _addDeveloperInDB(data: IDeveloperPageInfoToDB) {
        const imageBuffer = fs.readFileSync(data.pathToPhoto);
        const dataObject = {
            id: data.id,
            name: data.name,
            info: data.info,
            photo: imageBuffer,
            skills: data.skills,
            socials: data.socials,
        };
        await this.developersRepository.create(dataObject);
    }

    public async getDeveloperInfo(id: string): Promise<IDeveloperPageInfoFromDB> {
        const res = await this.developersRepository.findOne({ where: { id }, attributes: this.attributes });
        const data = res.dataValues;
        const developer = {
            info: data.info,
            name: data.name,
            skills: data.skills,
            socials: data.socials,
            photoSrcData: convertBufferToImg(res.dataValues.photo),
        };
        console.log('DEVELOPER', developer);
        return developer;
    }
}
