import {createSelectSchema} from "drizzle-zod";
import {collectionEntries, collections, users} from "@/db/schema";
import { z } from "zod";

export const CollectionSchema = createSelectSchema(collections);
export const CollectionEntrySchema = createSelectSchema(collectionEntries);

export const CollectionWithEntriesSchema = CollectionSchema.extend({
    collectionEntries: z.array(CollectionEntrySchema),
})

export type Collection = z.infer<typeof CollectionSchema>;
export type CollectionEntry = z.infer<typeof CollectionEntrySchema>;
export type CollectionWithEntries = z.infer<typeof CollectionWithEntriesSchema>;