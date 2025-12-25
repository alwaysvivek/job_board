// lib/prisma.ts
import { PrismaClient } from '../generated/prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

// 1. Mandatory fix for the "b.mask" error in Node.js/Vercel
if (typeof window === 'undefined') {
    neonConfig.webSocketConstructor = ws;
}

const prismaClientSingleton = () => {
    const connectionString = process.env.DATABASE_URL;

    // 2. Create the pool with the connection string
    const pool = new Pool({ connectionString });

    // 3. IMPORTANT: Pass the POOL to the adapter, not just the string.
    // This ensures the adapter uses the WebSocket config defined above.
    const adapter = new PrismaNeon(pool);

    return new PrismaClient({ adapter });
};

declare const globalThis: {
    prisma: ReturnType<typeof prismaClientSingleton> | undefined;
} & typeof global;

export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;