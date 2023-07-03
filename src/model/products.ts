export interface IApplication {
    authorPhoto: string;
    authorLink: string;
    title: string;
    description: string;
    url: string;
}

export interface IGetWebApplicationsQueryParams {
    _page: number;
    _limit: number;
}
