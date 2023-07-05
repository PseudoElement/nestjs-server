import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { messages, status } from 'src/constants';
import { IVerifyTokenRes } from 'src/model';

@Injectable()
export class TokenService {
    private readonly ACCESS_TOKEN_SECRET = 'access_token_secret';
    private readonly REFRESH_TOKEN_SECRET = 'refresh_token_secret';

    constructor(private jwtService: JwtService) {}

    public async verifyAccessToken(token: string): Promise<string | { [key: string]: any }> {
        return await this.jwtService.verifyAsync(token, { secret: this.ACCESS_TOKEN_SECRET });
    }

    private async _verifyRefreshToken(token: string): Promise<string | { [key: string]: any }> {
        return await this.jwtService.verifyAsync(token, { secret: this.REFRESH_TOKEN_SECRET });
    }

    public async handleVerifyingRefreshToken(token: string, userID: string): Promise<IVerifyTokenRes> {
        try {
            await this._verifyRefreshToken(token);
            const newAccessToken = await this.createAccessToken(userID);
            return { access_token: newAccessToken, status: status.success, message: messages.tokenRefreshed };
        } catch (err) {
            return { status: status.unauthorized, message: messages.refreshTokenExpired };
        }
    }

    public async createAccessToken(id: number | string): Promise<string> {
        const tokenPayload = { id };
        const token = await this.jwtService.signAsync(tokenPayload, { secret: this.ACCESS_TOKEN_SECRET, expiresIn: '15s' });
        return token;
    }

    public async createRefreshToken(id: number): Promise<string> {
        const tokenPayload = { id };
        const token = await this.jwtService.signAsync(tokenPayload, { secret: this.REFRESH_TOKEN_SECRET, expiresIn: '7d' });
        return token;
    }
}
