import {z} from "zod";
import {createSelectSchema} from "drizzle-zod";
import {collectionEntries, playingStatus} from "@/db/schema";


export const CollectionEntrySchema = createSelectSchema(collectionEntries);
export const PlayingStatusSchema = createSelectSchema(playingStatus);


export const CollectionEntryWithStatusSchema = CollectionEntrySchema.extend({
    status: PlayingStatusSchema.nullable()
}) ;

export const CollectionEntryWithGameSchema = CollectionEntrySchema.extend({
    status: PlayingStatusSchema.nullable()
});


export type CollectionEntry = z.infer<typeof CollectionEntrySchema>;
export type PlayingStatus = z.infer<typeof PlayingStatusSchema>;

export type CollectionEntryWithStatus = z.infer<typeof CollectionEntryWithStatusSchema>;
export type CollectionEntryWithGame = z.infer<typeof CollectionEntryWithGameSchema>;