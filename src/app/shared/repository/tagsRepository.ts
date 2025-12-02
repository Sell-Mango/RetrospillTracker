import {Tag, tags} from "@/db/schema";
import {getDatabase} from "@/db";
import {TagSchema} from "@/app/shared/schemas";
import {eq} from "drizzle-orm";

export interface TagsRepository {
    findAll(): Promise<Tag[]>;
    findBySlug(slug: string): Promise<Tag | null>;
}

export function createTagRepository(): TagsRepository {
    return {
        async findAll(): Promise<Tag[]> {
            const db = await getDatabase();
            const results = await db.query.tags.findMany();

            return TagSchema.array().parse(results);
        },
        async findBySlug(slug: string): Promise<Tag | null> {
            const db = await getDatabase();
            const results = await db.query.tags.findFirst({
                where: eq(tags.tagSlug, slug),
            });

            if (!results) {
                return null;
            }
            return results;
        }
    }
}