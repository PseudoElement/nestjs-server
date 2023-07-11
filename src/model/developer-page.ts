export interface IDeveloperPageInfoToDB {
    id: string;
    name: string;
    info: string[];
    pathToPhoto: string;
    skills: string[];
    socials: ISocialLink;
}

export interface IDeveloperPageInfoFromDB {
    name: string;
    info: string[];
    photoSrcData: string;
    skills: string[];
    socials: ISocialLink;
}

export interface ISocialLink {
    linkedin: string;
    github: string;
    vk: string;
    telegram: string;
}
