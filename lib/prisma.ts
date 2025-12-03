import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool } from '@neondatabase/serverless';

const prismaClientSingleton = () => {
  // 1. Create a connection pool using your Env Var
  const connectionString = process.env.DATABASE_URL;
  const pool = new Pool({ connectionString });

  // 2. Initialize the Neon adapter
  const adapter = new PrismaNeon(pool);

  // 3. Pass the adapter to the Prisma Client
  return new PrismaClient({ adapter });
};

// Standard Next.js singleton pattern to prevent too many connections
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
