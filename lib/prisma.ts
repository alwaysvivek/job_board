// lib/prisma.ts
import { PrismaClient } from '../generated/prisma/client'; 
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

// Mandatory fix for the "b.mask" error in Node.js environments
if (typeof window === 'undefined') {
  neonConfig.webSocketConstructor = ws;
}

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL;
  const pool = new Pool({ connectionString });

  // Use 'any' to bypass the PoolConfig vs Pool type mismatch in v7
  // This allows the runtime to use the pool while satisfying the build-time type checker
  const adapter = new PrismaNeon(pool as any);

  return new PrismaClient({ adapter });
};

declare const globalThis: {
  prisma: ReturnType<typeof prismaClientSingleton> | undefined;
} & typeof global;

export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
