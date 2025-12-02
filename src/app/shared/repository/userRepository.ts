import { getDatabase } from "@/db";
import { users } from '@/db/schema';
import { UserSchema, User } from "@/app/shared/schemas/userSchema";
import { eq } from 'drizzle-orm';

export interface UserRepository {
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    findBySlug(slug: string): Promise<User | null>;
}

export function createUserRepository(): UserRepository {
    return {
        async findAll():Promise<User[]> {
            const db = await getDatabase();
            const results = await db.query.users.findMany();

            if(results.length < 1) {
                return [];
            }

            return UserSchema.array().parse(results);
        },


        async findById(id: number):Promise<User | null> {
            const db = await getDatabase();
            const results = await db.query.users.findFirst({
                where: eq(users.userId, id),
            });

            if (!results) {
                return null;
            }

            return UserSchema.parse(results)
        },

        async findBySlug(slug: string): Promise<User | null> {
            const db = await getDatabase();
            const results = await db.query.users.findFirst({
                where: eq(users.slug, slug),
            });
            if (!results) {
                return null;
            }
            return UserSchema.parse(results);
        }
    }
}
