import { z } from "zod";
import {createSelectSchema} from "drizzle-zod";
import {games} from "@/db/schema";


export const GameSchema = createSelectSchema(games);

export type Game = z.infer<typeof GameSchema>;