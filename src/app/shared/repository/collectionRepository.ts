import {getDatabase} from "@/db";
import {and, eq} from "drizzle-orm";
import {collections, users} from "@/db/schema";
import {createSuccessResponse} from "@/app/shared/lib/response";
import {CollectionWithRelations, CollectionWithRelationsSchema} from "@/app/shared/schemas";


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
    findAllByUserId(userId: number): Promise<CollectionWithRelations[]>;
    findById(collectionId: number): Promise<CollectionWithRelations | null>;
    findBacklogByUser(userId: number): Promise<CollectionWithRelations | null>;
}

export function createCollectionRepository(): CollectionRepositoryProps {
    return {
        async findAllByUserId(userId: number): Promise<CollectionWithRelations[]> {
            const db = await getDatabase();
            const results = await db.query.collections.findMany({
                where: eq(collections.userId, userId),
                with: {
                    collectionEntries: {
                        with: {
                            game: true,
                            status: true,
                        }
                    },
                    tagsToCollection: {
                        with: {
                            tag: true
                        }
                    }
                },
            });

            return CollectionWithRelationsSchema.array().parse(results);
        },

        async findById(collectionId: number): Promise<CollectionWithRelations | null> {
            const db = await getDatabase();
            const results = await db.query.collections.findMany({
                where: eq(collections.collectionId, collectionId),
                with: {
                    collectionEntries: {
                        with: {
                            game: true,
                            status: true,
                        }
                    },
                    tagsToCollection: {
                        with: {
                            tag: true
                        }
                    }
                },
            });

            if (!results) {
                return null;
            }

            return CollectionWithRelationsSchema.parse(results);
        },

        async findBacklogByUser(userId: number): Promise<CollectionWithRelations | null> {
            const db = await getDatabase();
            const results = await db.query.collections.findFirst({
                where: and(
                    eq(users.userId, userId),
                    eq(collections.isBacklog, true)
                ),
                with: {
                    collectionEntries: {
                        with: {
                            game: true,
                            status: true,
                        }
                    },
                    tagsToCollection: {
                        with: {
                            tag: true,
                        }
                    }
                }
            });

            if (!results) {
                return null;
            }
            return CollectionWithRelationsSchema.parse(results);
        },
    }
}