import { Inject, Injectable } from '@nestjs/common';
import { WEB_APPS_REPOSITORY } from 'src/constants';
import { Applications } from './apps.model';
import { IApplicationFromDB, IApplicationToDB, IGetWebApplicationsQueryParams } from 'src/model';
import * as fs from 'fs';
import { convertBufferToImg } from 'src/helpers';

@Injectable()
export class ProductsPageService {
    private readonly attributes = { exclude: ['updatedAt', 'createdAt', 'id'] };

    constructor(@Inject(WEB_APPS_REPOSITORY) private appsRepository: typeof Applications) {}

    public async getAllWebApplications(): Promise<IApplicationFromDB[]> {
        const res = await this.appsRepository.findAll({ attributes: this.attributes });
        const apps = res.map((val) => {
            const data = val.dataValues;
            const photo = convertBufferToImg(data.authorPhoto);
            return { authorPhotoSrcData: photo, authorLink: data.authorLink, title: data.title, description: data.description, url: data.url };
        });
        return apps;
    }

    public async getLimitedApplications({ _page, _limit }: IGetWebApplicationsQueryParams): Promise<IApplicationFromDB[]> {
        _page = _page - 1;
        const res = await this.appsRepository.findAndCountAll({ attributes: this.attributes, offset: _page * _limit, limit: _limit });
        const apps = res.rows.map((val) => {
            const data = val.dataValues;
            const photo = convertBufferToImg(val.dataValues.authorPhoto);
            return { authorPhotoSrcData: photo, authorLink: data.authorLink, title: data.title, description: data.description, url: data.url };
        });
        return apps;
    }

    private async _addApp(data: IApplicationToDB): Promise<void> {
        const imageBuffer = fs.readFileSync(data.pathToAuthorPhoto);
        const res = await this.appsRepository.create({
            authorLink: data.authorLink,
            description: data.description,
            title: data.title,
            url: data.url,
            authorPhoto: imageBuffer,
        });
    }
}
