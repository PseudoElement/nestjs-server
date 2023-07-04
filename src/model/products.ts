export interface IApplicationToDB {
    pathToAuthorPhoto: string;
    authorLink: string;
    title: string;
    description: string;
    url: string;
}
export interface IApplicationFromDB {
    authorPhotoSrcData: string;
    authorLink: string;
    title: string;
    description: string;
    url: string;
}

export interface IGetWebApplicationsQueryParams {
    _page: number;
    _limit: number;
}
