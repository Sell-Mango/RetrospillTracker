import { z } from 'zod'
import {createSelectSchema} from "drizzle-zod";
import {tags, tagsToCollections} from "@/db/schema";

export const TagSchema = createSelectSchema(tags);
export const TagToCollectionSchema = createSelectSchema(tagsToCollections);


export const TagsToCollectionWithTagSchema = TagToCollectionSchema.extend({
    tag: TagSchema
});


export type Tag = z.infer<typeof TagSchema>;
export type TagToCollection = z.infer<typeof TagToCollectionSchema>;
export type TagToCollectionWithTag = z.infer<typeof TagsToCollectionWithTagSchema>;
