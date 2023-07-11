import { IApplicationToDB, IDeveloperCardToDB, IDeveloperPageInfoToDB } from 'src/model';

export const developerCards: IDeveloperCardToDB[] = [
    {
        name: 'Artur',
        post: 'C#-developer',
        info: 'OOP-king, he knows about design-patterns more than you about yourself.',
        photoPath: '/app/dist/assets/jpg/Artur.jpg',
        pathToPage: '/developer/artur',
    },
    {
        name: 'Pavel',
        post: 'Fullstack-developer',
        info: 'Angular/React-expert, from time to time has practice in bff-building.',
        photoPath: '/app/dist/assets/jpg/Sintol.jpg',
        pathToPage: '/developer/pavel',
    },
    {
        name: 'Alexandr',
        post: 'Phaser3/Unity-developer',
        info: "Phaser3-owner, there is nothing all over the world he couldn't implement on Phaser3.",
        photoPath: '/app/dist/assets/jpg/Sashka.jpg',
        pathToPage: '/developer/alexandr',
    },
];

export const productsApplications: IApplicationToDB[] = [
    {
        pathToAppPhoto: '/app/dist/assets/png/LarosPreview.png',
        title: 'Laros',
        url: 'https://laros.ch/',
        description: 'Swiss travel agency web-app for booking tickets to Greece and Cyprus',
        authorLink: '/developer/sintol',
    },
    {
        pathToAppPhoto: '/app/dist/assets/png/BorsPreview.png',
        title: 'Borsjakten',
        url: 'https://www.borsjakten.se/',
        description: 'Sweden stock-market, provides an opportunity to put in, withdraw, trade crypto-money',
        authorLink: '/developer/sintol',
    },
    {
        pathToAppPhoto: '/app/dist/assets/png/ManoManoPreview.png',
        title: 'ManoMano',
        url: 'https://www.manomano.fr ',
        description: 'French commercial marketplace, provides almost every house/building devices',
        authorLink: '/developer/sintol',
    },
    {
        pathToAppPhoto: '/app/dist/assets/png/MyLittleParisPreview.png',
        title: 'My Little Paris',
        url: 'https://www.mylittleparis.com',
        description: 'French web-app with articles and info about interesting landmarks, restaurants, cultural places in french capital',
        authorLink: '/developer/sintol',
    },
    {
        pathToAppPhoto: '/app/dist/assets/png/ClipsPreview.png',
        title: 'Clips',
        url: 'https://clips-tau-tawny.vercel.app/',
        description: 'Web-app uses firebase-auth and firebase-storage, let yoy add, store, change, delete mp4-videos from PC.',
        authorLink: '/developer/sintol',
    },
    {
        pathToAppPhoto: '/app/dist/assets/png/HackerNewsPreview.png',
        title: 'Hacker News',
        url: 'https://hacker-news-red.vercel.app/news',
        description: "Portal with all actual news and user's-comments",
        authorLink: '/developer/sintol',
    },
    {
        pathToAppPhoto: '/app/dist/assets/png/QuizPreview.png',
        title: 'Quiz',
        url: 'https://quiz-eight-pearl.vercel.app/',
        description: 'Quiz with 20+ topic for choose, 3 levels of difficulty and broad configurable number of questions per try.',
        authorLink: '/developer/sintol',
    },
    {
        pathToAppPhoto: '/app/dist/assets/png/WildberriesPreview.png',
        title: 'Wildberries Template',
        url: 'https://wild-berries-clone-yg62.vercel.app/',
        description: 'Basic app with shopping basket, random items and yandex-map with available stores',
        authorLink: '/developer/sintol',
    },
    {
        pathToAppPhoto: '/app/dist/assets/png/FindYourCoursePreview.png',
        title: 'Find Your Course',
        url: 'https://find-your-course.vercel.app/',
        description: 'Just cute pixel-perfect template',
        authorLink: '/developer/sintol',
    },
];

export const productsGames: IApplicationToDB[] = [
    {
        pathToAppPhoto: '/app/dist/assets/png/JokerCoinStartPage.png',
        title: "Joker's Coins",
        url: 'https://playson.com/games/run/joker-s-coins-hold-and-win',
        description: 'Slots with bonus game and jackpot spin',
        authorLink: '/developer/alexandr',
    },
    {
        pathToAppPhoto: '/app/dist/assets/png/BoongoPreview.png',
        title: 'Green Chilly',
        url: 'https://booongo.com/game/green_chilli/?lang=en',
        description: 'Online casino in mexican style',
        authorLink: '/developer/alexandr',
    },
];

export const developers: IDeveloperPageInfoToDB[] = [
    {
        id: 'artur',
        name: 'Artur',
        info: [
            'Good knowledge of OOP, SOLID, design pattern and common web application architectures',
            'Practical experience in the fields of healthcare and transport',
            'Good writing, communication and problem-solving skills',
        ],
        pathToPhoto: '/app/dist/assets/jpg/Artur.jpg',
        skills: [
            '.Net .NET Core and Framework (Asp.Net, Asp.Net.Core)',
            'ORM Entity Framework Core',
            'MS SQL Server , PostgreSQL , MongoDB(basic)',
            'RabbitMQ',
            'HTML, CSS, JavaScript, TypeScript, Angular',
            'Git, Trello, Jira',
            'Docker',
        ],
        socials: {
            linkedin: 'https://www.linkedin.com/in/arthur-haidul',
            github: 'https://github.com/dakamakat',
            vk: 'https://vk.com/keepcalmandstudyhardnow',
            telegram: 'https://t.me/dakamakat',
        },
    },
    {
        id: 'alexandr',
        name: 'Alexandr',
        info: [
            'Experienced in creating games on Unity and Phaser3',
            'Write clean, maintainable, and reusable code using HTML, HTML5, JavaScript, Phaser3, and C#',
            'Develop and implement software solutions that meet business requirements and adhere to industry standards',
            'Created custom C# scripts to automate repetitive tasks and increase development efficiency',
        ],
        pathToPhoto: '/app/dist/assets/jpg/Sashka.jpg',
        skills: [
            'C#, JavaScript(TS)',
            'Unity, Phaser3, Babyllon',
            'HTML, CSS, SCSS, PUG',
            'PostgreSQL, MS SQL Server',
            'React, Angular',
            'Azure devops, GitHub, GitLab',
            'Postman',
        ],
        socials: {
            linkedin: 'https://www.linkedin.com/in/alex-tkachuk-154563233',
            github: 'https://github.com/AlexTkachuk1',
            vk: 'https://vk.com/id508669194',
            telegram: 'https://t.me/YuukiAsunaAlf',
        },
    },
    {
        id: 'pavel',
        name: 'Pavel',
        info: [
            'Strong knowledge of Angular and React',
            'Experienced in creating API on NestJS and Express',
            'Participated in agile development methodologies',
            'Wide experience in creation, maintenance, debugging web-services for travel agency, b2b-marketplaces, stock-markets',
        ],
        pathToPhoto: '/app/dist/assets/jpg/Sintol.jpg',
        skills: [
            'TypeScript, JS',
            'Angular, NgRx',
            'React, Next.js, Redux, MobX',
            'Angular Material, MUI, Materialize, Ant Design, Atlaskit',
            'Node.js, NestJS, Express',
            'PostgreSQL, MySQL, MongoDB',
            'HTML, CSS, SCSS, WebPack',
            'Docker',
            'Postman, Swagger',
            'Azure, Git, Jira',
        ],
        socials: {
            linkedin: 'https://www.linkedin.com/in/pavel-davidovich',
            github: 'https://github.com/PseudoElement',
            vk: 'https://vk.com/id186995949',
            telegram: 'https://t.me/BigChad',
        },
    },
];
