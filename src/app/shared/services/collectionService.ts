import {igdbFetchByGameId} from "@/app/shared/utils/igdbFetch";
import {createErrorResponse, createSuccessResponse} from "@/app/shared/lib/response";


export async function getTestIgdb(slugs: string[]): Promise<Response> {
    const result = await igdbFetchByGameId(slugs);
    if (!result.success) {
        return createErrorResponse(result.error, 404)
    }

    return createSuccessResponse(result.data);

}