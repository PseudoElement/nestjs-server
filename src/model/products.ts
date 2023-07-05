export interface IApplicationToDB {
    pathToAppPhoto: string;
    authorLink: string;
    title: string;
    description: string;
    url: string;
}
export interface IApplicationFromDB {
    appPhotoSrcData: string;
    authorLink: string;
    title: string;
    description: string;
    url: string;
}

export interface IGetWebApplicationsQueryParams {
    _page: number;
    _limit: number;
}
