import {createErrorResponse, createSuccessResponse, Errors, Result} from "@/app/shared/lib/response";
import {QUERY} from "@/app/shared/config/IGDBQueries";
import {GameWithIGDB} from "@/app/shared/schemas";
import {
    IGDBRawCollectionEntry,
    igdbToCollectionEntry
} from "@/app/shared/utils/igdbToCollectionEntry";

export const IGDB_GAMES_API = "https://api.igdb.com/v4/games";

export async function igdbFetch(query:string, endpoint:string = IGDB_GAMES_API):Promise<Response> {
    try {
        const response:Response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Client-ID": process.env.TWITCH_API_ID as string,
                Authorization: `Bearer ${process.env.OAUTH_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: query,
        });

        if (!response.ok) {
            console.error(response);
            return createErrorResponse(response.statusText, response.status);
        }

        const data = await response.json();
        return createSuccessResponse(data);
    } catch (err) {
        if (err instanceof Error) {
            return createErrorResponse(err.message, 500);
        }
        return createErrorResponse("En ukjent feil oppstod", 500);
    }
}


export async function igdbFetchByGameId(
    slugsAsIds: string[],
    endpoint:string = IGDB_GAMES_API)
    :Promise<Result<GameWithIGDB[]>> {

    if (slugsAsIds.length < 1) {
        return { success: true, data: [] }
    }

    const slugString = slugsAsIds.join(",");
    const query = QUERY.COLLECTION_ENTRIES(slugString);

    try {
        const response:Response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Client-ID": process.env.TWITCH_API_ID as string,
                Authorization: `Bearer ${process.env.OAUTH_TOKEN}`,
                "Content-Type": "text/plain",
            },
            body: query,
        });

        if (!response.ok) {
            return {
                success: false,
                errorCode: Errors.INTERNAL_SERVER_ERROR,
                error: `IGDB API returned and error: ${response.statusText}`,
            }
        }

        const data: IGDBRawCollectionEntry[] = await response.json();

        return {
            success: true,
            data: data.map(game => igdbToCollectionEntry(game))
        }

    } catch (err) {
        return {
            success: false,
            errorCode: "INTERNAL_SERVER_ERROR",
            error: err instanceof Error ? err.message : "An unknown error occurred"
        };
    }
}