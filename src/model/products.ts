export interface IApplicationFromDB {
    id: string | number;
    authorPhoto: Buffer;
    authorLink: string;
    title: string;
    description: string;
    url: string;
}
export interface IAppToDB {
    authorPhoto: string;
    authorLink: string;
    title: string;
    description: string;
    url: string;
}
