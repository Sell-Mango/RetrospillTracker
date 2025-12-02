import {CollectionEntrySchema, CollectionWithRelations, CollectionWithRelationsSchema} from "@/app/shared/schemas";
import {collectionEntries} from "@/db/schema";
import {eq} from "drizzle-orm";
import {getDatabase} from "@/db";


export interface CollectionWithRelationsProps {
    findById(entryId: number): Promise<CollectionWithRelations | null>;
    findAllByCollectionId(collectionId: number): Promise<CollectionWithRelations[]>;
}

export function createCollectionEntryRepository(): CollectionWithRelationsProps {
    return {
        async findById(entryId: number): Promise<CollectionWithRelations | null> {
            const db = await getDatabase();
            const results = await db.query.collectionEntries.findFirst({
                where: eq(collectionEntries.entryId, entryId),
                with: {
                    game: true,
                    status: true,
                }
            });

            if (!results) {
                return null;
            }

            return CollectionWithRelationsSchema.parse(results);
        },

        async findAllByCollectionId(collectionId: number): Promise<CollectionWithRelations[]> {
            const db = await getDatabase();
            const results = await db.query.collectionEntries.findMany({
                where: eq(collectionEntries.entryId, collectionId),
                with: {
                    game: true,
                    status: true,
                }
            });

            if (results.length < 1) {
                return [];
            }

            return CollectionWithRelationsSchema.array().parse(results);
        }
    }
}