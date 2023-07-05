import { IStatus } from 'src/model';

export const status: IStatus = { requestError: 400, success: 200, redirect: 302, notFound: 404, unauthorized: 401, conflict: 409 };

export const messages = {
    requestError: 'Request error!',
    successRegister: 'Successfull registration :)',
    userExists: 'User already exists!',
    accessTokenExpired: 'Access token expired',
    refreshTokenExpired: 'Refresh token expired',
    userDoesntExist: "User doesn't exist",
    incorrectPassword: 'Incorrect password',
    needAuth: 'Login is necessary to visit this route',
    serverError: 'Server error!',
    userDataUpdated: "User's data updated",
    deleted: "User's successfully deleted",
    tokenRefreshed: 'Token refreshed',
} as const;
