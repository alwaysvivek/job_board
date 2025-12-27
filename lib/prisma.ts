import { PrismaClient } from '../generated/prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

// 1. Mandatory WebSocket polyfill for Vercel/Node.js environment
// This prevents the "b.mask is not a function" error.
if (typeof window === 'undefined') {
  neonConfig.webSocketConstructor = ws;
}

const prismaClientSingleton = () => {
  // 2. Ensure the URL is treated strictly as a string
  const connectionString = `${process.env.DATABASE_URL}`;

  // 3. Initialize the adapter directly with the string
  // This bypasses the Pool vs PoolConfig type mismatch.
  const adapter = new PrismaNeon({ connectionString });

  return new PrismaClient({ adapter });
};

declare const globalThis: {
  prisma: ReturnType<typeof prismaClientSingleton> | undefined;
} & typeof global;

export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
