import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { GAMES_REPOSITORY, WEB_APPS_REPOSITORY, productsApplications, productsGames } from 'src/constants';
import { Applications } from './apps.model';
import { IApplicationFromDB, IApplicationToDB, IGetWebApplicationsQueryParams } from 'src/model';
import * as fs from 'fs';
import { convertBufferToImg } from 'src/helpers';
import { Games } from './games.model';

@Injectable()
export class ProductsPageService implements OnModuleInit {
    private readonly attributes = { exclude: ['updatedAt', 'createdAt', 'id'] };
    private readonly routeToImagesInDocker = '/app/dist/assets/png/JokerCoinStartPage.png';

    constructor(
        @Inject(WEB_APPS_REPOSITORY) private readonly appsRepository: typeof Applications,
        @Inject(GAMES_REPOSITORY) private readonly gamesRepository: typeof Games,
    ) {}

    async onModuleInit() {}

    public async getAllWebApplications(): Promise<IApplicationFromDB[]> {
        const res = await this.appsRepository.findAll({ attributes: this.attributes, order: ['createdAt'] });
        const apps = res.map((val) => {
            const data = val.dataValues;
            const photo = convertBufferToImg(data.appPhoto);
            return { appPhotoSrcData: photo, authorLink: data.authorLink, title: data.title, description: data.description, url: data.url };
        });
        return apps;
    }

    public async getAllGames(): Promise<IApplicationFromDB[]> {
        const res = await this.gamesRepository.findAll({ attributes: this.attributes });
        const games = res.map((val) => {
            const data = val.dataValues;
            const photo = convertBufferToImg(data.appPhoto);
            return { appPhotoSrcData: photo, authorLink: data.authorLink, title: data.title, description: data.description, url: data.url };
        });
        return games;
    }

    public async getLimitedApplications({ _page, _limit }: IGetWebApplicationsQueryParams): Promise<IApplicationFromDB[]> {
        _page = _page - 1;
        const res = await this.appsRepository.findAndCountAll({ attributes: this.attributes, offset: _page * _limit, limit: _limit });
        const apps = res.rows.map((val) => {
            const data = val.dataValues;
            const photo = convertBufferToImg(val.dataValues.appPhoto);
            return { appPhotoSrcData: photo, authorLink: data.authorLink, title: data.title, description: data.description, url: data.url };
        });
        return apps;
    }
    public async getLimitedGames({ _page, _limit }: IGetWebApplicationsQueryParams): Promise<IApplicationFromDB[]> {
        _page = _page - 1;
        const res = await this.gamesRepository.findAndCountAll({ attributes: this.attributes, offset: _page * _limit, limit: _limit });
        const games = res.rows.map((val) => {
            const data = val.dataValues;
            const photo = convertBufferToImg(val.dataValues.appPhoto);
            return { appPhotoSrcData: photo, authorLink: data.authorLink, title: data.title, description: data.description, url: data.url };
        });
        return games;
    }

    private async _insertAllApps() {
        for (const app of productsApplications) {
            await this._addApp(app, 'apps');
        }
    }

    private async _insertAllGames() {
        for (const game of productsGames) {
            await this._addApp(game, 'games');
        }
    }

    private async _addApp(data: IApplicationToDB, type: 'games' | 'apps'): Promise<void> {
        const imageBuffer = fs.readFileSync(data.pathToAppPhoto);
        const dataObject = {
            authorLink: data.authorLink,
            description: data.description,
            title: data.title,
            url: data.url,
            appPhoto: imageBuffer,
        };
        switch (type) {
            case 'apps':
                await this.appsRepository.create(dataObject);
                break;
            case 'games':
                await this.gamesRepository.create(dataObject);
                break;
        }
    }
}
