import {games} from "@/db/schema";
import {getDatabase} from "@/db";
import {eq, inArray} from "drizzle-orm";
import {Game, GameSchema} from "@/app/shared/schemas/gameSchema";
import result from "*?url";

export interface GameRepositoryProps {
    findById(gameId: string): Promise<Game | null>;
    findByIds(gameId: string[]): Promise<Game[]>;
}

/*export function createGameRepository(): GameRepositoryProps {
    return {
        async findById(gameId: string): Promise<Game | null> {
            const db = await getDatabase();
            const results = await db.query.gamesAlt.findFirst({
                where: eq(games.gameId, gameId)
            });

            if (!result) {
                return null;
            }

            return GameSchema.parse(results);
        },
        async findByIds(gameId: string[]): Promise<Game[]> {
            const db = await getDatabase();
            const results = await db.query.gamesAlt.findMany({
                where: inArray(games.gameId, gameId)
            });

            return GameSchema.array().parse(results);
        },
    }
} */