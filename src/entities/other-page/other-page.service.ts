import { Inject, Injectable } from '@nestjs/common';
import { RANDOM_WHEEL_RESULTS_REPOSITORY } from 'src/constants';
import { RandomWheelResults } from './results.model';
import { IWinResult } from 'src/model';
import { omitProp } from 'src/helpers';

@Injectable()
export class OtherPageService {
    private readonly attributes = { exclude: ['updatedAt', 'id'] };
    constructor(@Inject(RANDOM_WHEEL_RESULTS_REPOSITORY) private readonly randomWheelResultsRepo: typeof RandomWheelResults) {}

    public async addNewResultInDB(body: IWinResult): Promise<IWinResult> {
        const res = await this.randomWheelResultsRepo.create(body);
        const newResultBody = omitProp(['updatedAt', 'id'], res.dataValues);
        return newResultBody;
    }

    public async getLast20Results(): Promise<IWinResult[]> {
        const results = await this.randomWheelResultsRepo.findAll({ attributes: this.attributes, order: [['createdAt', 'DESC']], limit: 20 });
        return results;
    }
}
