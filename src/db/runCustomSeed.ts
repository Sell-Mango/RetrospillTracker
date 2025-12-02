import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";
import { users } from "./schema/users-schema";
import { collectionEntries, collections, games, playingStatus, reviews, roles } from "./schema";
import { dbCollections, dbCollectionsEntries, dbGames, dbRoles, dbStatuses, dbUsers } from "@/app/data/dbTestData";

export async function runCustomSeed(db: D1Database) {
    const ctx = drizzle(db);
    return await addData(ctx);
}

export async function addData(db: DrizzleD1Database) {
    await db.delete(collectionEntries);
    await db.delete(collections);
    await db.delete(playingStatus);
    await db.delete(reviews);

    await db.delete(games);
    await db.delete(users);
    await db.delete(roles);

    await db.insert(roles).values(dbRoles);

    for (const obj of dbUsers) {
        await db.insert(users).values(obj);
    }

    for (const game of dbGames) {
        await db.insert(games).values(game);
    }

    await db.insert(playingStatus).values(dbStatuses);

    for (const obj of dbCollections) {
        await db.insert(collections).values(obj);
    }

    for (const obj of dbCollectionsEntries) {
        await db.insert(collectionEntries).values(obj);
    }
 
 const result = await db.select().from(users).all();
  return { ok: true, result, count: result.length };
}