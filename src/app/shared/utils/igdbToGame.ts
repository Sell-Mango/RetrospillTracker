import {Game} from "@/app/shared/types/game"
import {slugify} from "@/app/shared/utils/slugify";

export interface IGDBGame {
    id: number;
    name: string;
    slug: string;
    cover?: {
        url: string;
    };
    summary?: string;
    developers?: {
        name: string;
    }[];
    genres?: {
        name: string;
    }[]
    platforms?: {
        abbreviation: string;
    }[];
    rating?: number;
}

export type IGDBData = {
    data: IGDBGame[];
    success: boolean;
}


type jsonData<T> = T[]

export function igdbToGame(igdbData:IGDBData):Game[] {
    return igdbData.data.map((game: IGDBGame) => {
        return {
            id: game.id.toString(),
            title: game.name,
            imgUrl: game.cover?.url.replace("t_thumb", "t_cover_big"),
            slug: slugify(game.name),
        }
    })
}

