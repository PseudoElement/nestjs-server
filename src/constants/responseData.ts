import { ResponseStatus } from 'src/model';
interface IStatus {
    requestError: 400;
    success: 200;
    redirect: 302;
    notFound: 404;
}
export const status: IStatus = { requestError: 400, success: 200, redirect: 302, notFound: 404 };
