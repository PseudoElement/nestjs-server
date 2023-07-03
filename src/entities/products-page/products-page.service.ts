import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { WEB_APPS_REPOSITORY } from 'src/constants';
import { Applications } from './apps.model';
import { IApplication, IGetWebApplicationsQueryParams } from 'src/model';
import * as fs from 'fs';
import { convertBufferToImg } from 'src/helpers';

@Injectable()
export class ProductsPageService {
    constructor(@Inject(WEB_APPS_REPOSITORY) private appsRepository: typeof Applications) {}

    attributes = { exclude: ['updatedAt', 'createdAt', 'id'] };

    public async getAllWebApplications(): Promise<IApplication[]> {
        const res = await this.appsRepository.findAll({ attributes: this.attributes });
        const apps = res.map((val) => {
            const photo = convertBufferToImg(val.dataValues.authorPhoto);
            return { ...val.dataValues, authorPhoto: photo };
        });
        return apps;
    }

    public async getLimitedApplications({ _page, _limit }: IGetWebApplicationsQueryParams): Promise<IApplication[]> {
        _page = _page - 1;
        const res = await this.appsRepository.findAndCountAll({ attributes: this.attributes, offset: _page * _limit, limit: _limit });
        const apps = res.rows.map((val) => {
            const photo = convertBufferToImg(val.dataValues.authorPhoto);
            return { ...val.dataValues, authorPhoto: photo };
        });
        return apps;
    }

    private async _addApp(data: IApplication): Promise<void> {
        const imageBuffer = fs.readFileSync(data.authorPhoto);
        const res = await this.appsRepository.create({
            authorLink: data.authorLink,
            description: data.description,
            title: data.title,
            url: data.url,
            authorPhoto: imageBuffer,
        });
    }
}
