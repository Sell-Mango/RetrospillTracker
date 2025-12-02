import { z } from "zod";
import {createSelectSchema} from "drizzle-zod";
import { collections } from "@/db/schema";
import {CollectionEntrySchema, CollectionEntryWithStatusSchema} from "@/app/shared/schemas/collectionEntrySchema";
import { TagsToCollectionWithTagSchema } from "@/app/shared/schemas/tagSchemas";


export const CollectionSchema = createSelectSchema(collections);


export const CollectionWithRelationsSchema = CollectionEntrySchema.extend({
    collectionEntries: z.array(CollectionEntryWithStatusSchema),
    tagsToCollections: z.array(TagsToCollectionWithTagSchema),
});

export type Collection = z.infer<typeof CollectionSchema>;
export type CollectionWithRelations = z.infer<typeof CollectionWithRelationsSchema>;