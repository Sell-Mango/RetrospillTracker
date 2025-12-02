import {GameWithIGDB} from "@/app/shared/schemas";

export interface IGDBRawCollectionEntry {
    name: string;
    slug: string;
    summary?: string;
    rating?: number;
    cover?: {
        url: string;
    };
    involved_companies?: {
        company: {
            name: string;
        };
    }[];
    genres?: {
        name: string;
    }[];
    platforms?: {
        name: string;
    }[];
}

export function igdbToCollectionEntry(igdbGame: IGDBRawCollectionEntry): GameWithIGDB {
    return {
        gameId: igdbGame.slug,
        title: igdbGame.name,
        description: igdbGame.summary ?? null,
        coverImageUrl: igdbGame.cover?.url.replace("t_thumb", "t_cover_big") ?? null,
        developers: igdbGame.involved_companies?.map(company => company?.company.name) ?? [],
        genres: igdbGame.genres?.map(genre => genre.name) ?? [],
        platforms: igdbGame.platforms?.map(platform => platform.name) ?? [],
        rating: igdbGame.rating ?? null,
    }
}