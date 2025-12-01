import {Game, games} from "@/db/schema";
import {getDatabase} from "@/db";
import {eq, inArray} from "drizzle-orm";
import {GameSchema} from "@/app/shared/schemas/gameSchema";
import result from "*?url";

export interface GameRepositoryProps {
    findByIds(apiKey: string[]): Promise<Game[]>;
    findById(apiKey: string): Promise<Game | null>;
}

export function createGameRepository(): GameRepositoryProps {
    return {
        async findByIds(apiKeys: string[]): Promise<Game[]> {
            const db = await getDatabase();
            const results = await db.query.games.findMany({
                where: inArray(games.apiKey, apiKeys)
            });

            return GameSchema.array().parse(results);
        },

        async findById(apiKey: string): Promise<Game | null> {
            const db = await getDatabase();
            const results = await db.query.games.findFirst({
                where: eq(games.apiKey, apiKey)
            });

            if (!result) {
                return null;
            }

            return GameSchema.parse(results);
        }

    }
}