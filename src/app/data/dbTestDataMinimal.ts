
import {Collection, CollectionEntry, Game, PlayingStatus, User} from "@/app/shared/schemas";
import {CollectionEntriesMin, collectionEntriesMin, Role} from "@/db/schema";


/*export const dbRoles: Role[] = [
    { id: 1, roleName: "USER" },
    { id: 2, roleName: "MODERATOR" },
    { id: 3, roleName: "ADMIN" }
];

export const dbUsers: User[] = [
    { userId: 1, userName: "Sell_Mango", slug: "sell-mango", email: "kjellmal@hiof.no", firstName: "Kjell-Magne", lastName: "Larsen", biography: "Jeg liker pepsi max", isActive: true, profileBanner: null, profilePicture: null, createdAt: new Date("2024-01-15T10:30:00.000Z"), updatedAt: new Date("2024-10-20T14:22:00.000Z"), roleId: 1},
    { userId: 2, userName: "PixelHunter", slug: "pixelhunter", email: "sarah.j@example.com", firstName: "Sarah", lastName: "Johnson", biography: "Retro gaming enthusiast and speedrunner", isActive: true, profileBanner: null, profilePicture: null, createdAt: new Date("2024-02-10T08:15:00.000Z"), updatedAt: new Date("2024-10-19T11:45:00.000Z"), roleId: 2},
    { userId: 3, userName: "NordicGamer", slug: "nordicgamer", email: "erik.hansen@example.no", firstName: "Erik", lastName: "Hansen", biography: "RPG lover fra Bergen", isActive: true, profileBanner: null, profilePicture: null, createdAt: new Date("2024-03-05T13:20:00.000Z"), updatedAt: new Date("2024-10-21T09:30:00.000Z"), roleId: 2},
    { userId: 4, userName: "Luna_Plays", slug: "luna-plays", email: "luna.martinez@example.com", firstName: "Luna", lastName: "Martinez", biography: "Indie games and cozy vibes", isActive: true, profileBanner: null, profilePicture: null, createdAt: new Date("2024-03-22T16:45:00.000Z"), updatedAt: new Date("2024-10-20T18:10:00.000Z"), roleId: 2},
    { userId: 5, userName: "TechnoViking88", slug: "technoviking88", email: "andreas.berg@example.se", firstName: "Andreas", lastName: "Berg", biography: "Competitive FPS player", isActive: true, profileBanner: null, profilePicture: null, createdAt: new Date("2024-04-12T12:00:00.000Z"), updatedAt: new Date("2024-10-18T20:15:00.000Z"), roleId: 2},
    { userId: 6, userName: "StardustDreamer", slug: "stardustdreamer", email: "maria.silva@example.com", firstName: "Maria", lastName: "Silva", biography: "JRPG fan and trophy hunter", isActive: true, profileBanner: null, profilePicture: null, createdAt: new Date("2024-05-08T09:30:00.000Z"), updatedAt: new Date("2024-10-21T07:20:00.000Z"), roleId: 2},
    { userId: 7, userName: "RetroKing", slug: "retroking", email: "james.wilson@example.co.uk", firstName: "James", lastName: "Wilson", biography: "Collecting games since 1989", isActive: false, profileBanner: null, profilePicture: null, createdAt: new Date("2024-06-14T14:25:00.000Z"), updatedAt: new Date("2024-09-30T16:40:00.000Z"), roleId: 2},
    { userId: 8, userName: "ValkyrieQuest", slug: "valkyriequest", email: "ingrid.olsen@example.no", firstName: "Ingrid", lastName: "Olsen", biography: "Norse mythology and action adventures", isActive: true, profileBanner: null, profilePicture: null, createdAt: new Date("2024-07-01T11:10:00.000Z"), updatedAt: new Date("2024-10-20T13:55:00.000Z"), roleId: 2},
    { userId: 9, userName: "CyberNinja_X", slug: "cyberninja-x", email: "kenji.tanaka@example.jp", firstName: "Kenji", lastName: "Tanaka", biography: "Fighting games and anime", isActive: true, profileBanner: null, profilePicture: null, createdAt: new Date("2024-07-19T15:40:00.000Z"), updatedAt: new Date("2024-10-21T10:05:00.000Z"), roleId: 2},
    { userId: 10, userName: "GreenShell_Racer", slug: "greenshell-racer", email: "claire.dubois@example.fr", firstName: "Claire", lastName: "Dubois", biography: "Mario Kart champion 2023", isActive: true, profileBanner: null, profilePicture: null, createdAt: new Date("2024-08-03T10:20:00.000Z"), updatedAt: new Date("2024-10-19T15:30:00.000Z"), roleId: 2},
    { userId: 11, userName: "DragonSlayer_92", slug: "dragonslayer-92", email: "marcus.lee@example.com", firstName: "Marcus", lastName: "Lee", biography: "Dark Souls veteran, no summons", isActive: true, profileBanner: null, profilePicture: null, createdAt: new Date("2024-08-25T17:50:00.000Z"), updatedAt: new Date("2024-10-20T12:25:00.000Z"), roleId: 2}
]

export const dbGames: Game[] = [
    { gameId: "the-legend-of-zelda-ocarina-of-time", title: "The Legend of Zelda: Ocarina of Time" },
    { gameId: "super-mario-64", title: "Super Mario 64" },
    { gameId: "the-last-of-us", title: "The Last of Us" },
    { gameId: "halo-combat-evolved", title: "Halo: Combat Evolved"},
    { gameId: "sonic-the-hedgehog-2", title: "Sonic the Hedgehog 2" },
    { gameId: "half-life-2", title: "Half-Life 2" },
    { gameId: "metroid-prime", title: "Metroid Prime"},
    { gameId: "god-of-war-2018", title: "God of War" },
    { gameId: "gears-of-war", title: "Gears of War" },
    { gameId:  "streets-of-rage-2", title: "Streets of Rage 2" },
    { gameId:  "the-witcher-3-wild-hunt", title: "The Witcher 3: Wild Hunt" },
    { gameId:  "mario-kart-8-deluxe", title: "Mario Kart 8 Deluxe" },
    { gameId:  "uncharted-4-a-thiefs-end", title: "Uncharted 4: A Thief's End" },
    { gameId:  "forza-horizon-5", title: "Forza Horizon 5" },
    { gameId:  "phantasy-star-iv", title: "Phantasy Star IV" },
    { gameId:  "portal-2", title: "Portal 2" },
    { gameId:  "super-smash-bros-ultimate", title: "Super Smash Bros. Ultimate" },
    { gameId:  "bloodborne", title: "Bloodborne" },
    { gameId:  "halo-3", title: "Halo 3" },
    { gameId:  "shenmue", title: "Shenmue" },
    { gameId:  "doom-eternal", title: "DOOM Eternal"}
]

export const dbCollections: Collection[] = [
    { collectionId: 1, userId: 1, name: null, createdAt: "2024-01-15T10:30:00.000Z", isBacklog: true, isPublic: true, likes: 0, description: null },
    { collectionId: 2, userId: 2, name: "My Favorites", createdAt: "2024-02-10T08:15:00.000Z", isBacklog: false, isPublic: true, likes: 15, description: "Games that changed my life" },
    { collectionId: 3, userId: 3, name: null, createdAt: "2024-03-05T13:20:00.000Z", isBacklog: true, isPublic: false, likes: 0, description: null },
    { collectionId: 4, userId: 4, name: "Cozy Collection", createdAt: "2024-03-22T16:45:00.000Z", isBacklog: false, isPublic: true, likes: 8, description: "Games for relaxing evenings" }
]

export const dbCollectionsEntries: CollectionEntries[] = [
    { gameId: "the-legend-of-zelda-ocarina-of-time", collectionId: 1, entryId: 123, statusId: 2, score: 8, priority: null, playTime: 50, finishedAt: "2024-08-15T18:30:00.000Z" },
    { gameId: "the-last-of-us", collectionId: 2, entryId: 124, statusId: 3, score: 10, priority: null, playTime: 35, finishedAt: "2024-07-22T20:15:00.000Z" },
    { gameId: "half-life-2", collectionId: 3, entryId: 125, statusId: 1, score: null, priority: 1, playTime: 0, finishedAt: null },
    { gameId: "the-witcher-3-wild-hunt", collectionId: 4, entryId: 126, statusId: 2, score: 9, priority: null, playTime: 120, finishedAt: null },
    { gameId: "halo-combat-evolved", collectionId: 1, entryId: 127, statusId: 3, score: 9, priority: null, playTime: 28, finishedAt: "2024-09-10T16:45:00.000Z" },
    { gameId: "the-witcher-3-wild-hunt", collectionId: 2, entryId: 128, statusId: 5, score: 8, priority: 2, playTime: 65, finishedAt: null },
    // Collection 1 - 3 more entries
    { gameId: "metroid-prime", collectionId: 1, entryId: 129, statusId: 3, score: 10, priority: null, playTime: 42, finishedAt: "2024-06-18T21:30:00.000Z" },
    { gameId: "forza-horizon-5", collectionId: 1, entryId: 130, statusId: 1, score: null, priority: 3, playTime: 0, finishedAt: null },
    { gameId: "halo-3", collectionId: 1, entryId: 131, statusId: 4, score: 6, priority: null, playTime: 12, finishedAt: null },
    // Collection 2 - 3 more entries
    { gameId: "god-of-war-2018", collectionId: 2, entryId: 132, statusId: 3, score: 10, priority: null, playTime: 48, finishedAt: "2024-05-30T19:20:00.000Z" },
    { gameId: "uncharted-4-a-thiefs-end", collectionId: 2, entryId: 133, statusId: 3, score: 9, priority: null, playTime: 25, finishedAt: "2024-08-05T14:10:00.000Z" },
    { gameId: "bloodborne", collectionId: 2, entryId: 134, statusId: 2, score: null, priority: null, playTime: 38, finishedAt: null },
    // Collection 3 - 3 more entries
    { gameId: "super-mario-64", collectionId: 3, entryId: 135, statusId: 1, score: null, priority: 2, playTime: 0, finishedAt: null },
    { gameId: "gears-of-war", collectionId: 3, entryId: 136, statusId: 1, score: null, priority: 4, playTime: 0, finishedAt: null },
    { gameId: "portal-2", collectionId: 3, entryId: 137, statusId: 5, score: 8, priority: null, playTime: 15, finishedAt: null },
    // Collection 4 - 3 more entries
    { gameId: "sonic-the-hedgehog-2", collectionId: 4, entryId: 138, statusId: 3, score: 8, priority: null, playTime: 8, finishedAt: "2024-09-25T12:40:00.000Z" },
    { gameId: "streets-of-rage-2", collectionId: 4, entryId: 139, statusId: 3, score: 9, priority: null, playTime: 6, finishedAt: "2024-07-14T17:55:00.000Z" },
    { gameId: "super-smash-bros-ultimate", collectionId: 4, entryId: 140, statusId: 2, score: null, priority: null, playTime: 95, finishedAt: null }
]

export const dbStatuses: PlayingStatus[] = [
    { statusId: 1, status: "BACKLOG" },
    { statusId: 2, status: "PLAYING" },
    { statusId: 3, status: "COMPLETED" },
    { statusId: 4, status: "DROPPED" },
    { statusId: 5, status: "PAUSED" }
] */