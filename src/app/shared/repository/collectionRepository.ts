import {getDatabase} from "@/db";
import {and, eq} from "drizzle-orm";
import {collections, users} from "@/db/schema";
import {createSuccessResponse} from "@/app/shared/lib/response";
import {CollectionWithEntries, CollectionWithEntriesSchema} from "@/app/shared/schemas/CollectionSchema";

export async function fetchCollectionsByUser(userId: number, isBacklog: boolean = false): Promise<Response> {
    const db = await getDatabase();
    const results = await db.query.collections.findMany({
        where: and(
            eq(users.userId, userId),
            eq(collections.isBacklog, isBacklog)
        ),
        with: {
            tagsToCollection: true,
            collectionEntries: {
                columns: {
                   gameId: true
                }
            }
        },
    });

    return createSuccessResponse(results);
}


export interface CollectionRepositoryProps {
    findByUserId(userId: number, isBacklog: boolean): Promise<CollectionWithEntries[]>;
    findById(collectionId: number): Promise<CollectionWithEntries | null>;
}

export function createCollectionRepository(): CollectionRepositoryProps {
    return {
        async findByUserId(userId: number, isBacklog: boolean): Promise<CollectionWithEntries[]> {
            const db = await getDatabase();
            const results = await db.query.collections.findMany({
                where: and(
                    eq(collections.userId, userId),
                    eq(collections.isBacklog, isBacklog),
                ),
                with: {
                    collectionEntries: true,
                }
            });

            return CollectionWithEntriesSchema.array().parse(results);
        },

        async findById(collectionId: number): Promise<CollectionWithEntries | null> {
            const db = await getDatabase();
            const results = await db.query.collections.findFirst({
                where: eq(collections.collectionId, collectionId),
                with: {
                    collectionEntries: true,
                }
            });

            return CollectionWithEntriesSchema.parse(results);
        }
    }
}