export interface IDeveloperCardToDB {
    name: string;
    info: string;
    post: string;
    photoPath: string;
    pathToPage: string;
}

export interface IDeveloperCardFromDB {
    name: string;
    info: string;
    post: string;
    photoSrcData: string;
    pathToPage: string;
}
