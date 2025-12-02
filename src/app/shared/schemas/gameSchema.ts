import { z } from "zod";
import { createSelectSchema } from "drizzle-zod";
import { games } from "@/db/schema";


export const GameSchema = createSelectSchema(games);

export const gameWithIGDBSchema = z.object({
    gameId: z.number(),
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    coverImageUrl: z.string(),
    developers: z.array(z.string()),
    genres: z.array(z.string()),
    platforms: z.array(z.string()),
    rating: z.number().nullable()
});

export type Game = z.infer<typeof GameSchema>;
export type GameWithIGDB = z.infer<typeof GameSchema>;