// lib/prisma.ts
import { PrismaClient } from '../generated/prisma'; // Ensure this matches your schema.prisma output
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool } from '@neondatabase/serverless';

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool);
  
  // Note: Prisma 7 requires the adapter in the constructor
  return new PrismaClient({ adapter });
};

// Use "prisma" instead of "prismaGlobal" for cleaner naming
declare const globalThis: {
  prisma: ReturnType<typeof prismaClientSingleton> | undefined;
} & typeof global;

// CHANGE: We are now exporting a NAMED constant 'prisma'
export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

// REMOVE: export default prisma; (if it was there)
