// lib/prisma.ts
import { PrismaClient } from '../generated/prisma/client'; 
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

// Required for the serverless driver to work in Node environments
neonConfig.webSocketConstructor = ws;

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL;
  
  // Create the pool directly with the connection string
  const pool = new Pool({ connectionString });

  // If the error persists, try passing the pool instance directly 
  // ensuring types match the adapter's expectations
    const adapter = new PrismaNeon({
        connectionString: process.env.DATABASE_URL as string
    });

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
