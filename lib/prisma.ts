import { PrismaClient } from '../generated/prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

// Required to fix WebSocket errors in Node.js (Vercel Serverless)
if (typeof window === 'undefined') {
    neonConfig.webSocketConstructor = ws;
}

const prismaClientSingleton = () => {
    const connectionString = `${process.env.DATABASE_URL}`;

    // Pass the pool configuration directly to PrismaNeon
    const adapter = new PrismaNeon({ connectionString });

    return new PrismaClient({ adapter });
}; 

declare const globalThis: {
  prisma: ReturnType<typeof prismaClientSingleton> | undefined;
} & typeof global;

export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
