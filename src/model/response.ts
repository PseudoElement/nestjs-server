export type ResponseStatus = 400 | 200 | 404 | 302;
export interface IStatus {
    requestError: 400;
    success: 200;
    redirect: 302;
    notFound: 404;
    unauthorized: 401;
    conflict: 409;
}
