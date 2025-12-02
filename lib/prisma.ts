// import {PrismaClient} from "@prisma/client";

// const globalForPrisma = globalThis as unknown as {prisma?: PrismaClient};

// const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     log: ["query"],
//   });

// if(process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// export default prisma;


// import {PrismaClient} from "@prisma/client";

// const prisma = new PrismaClient();
// export default prisma;


// lib/prisma.ts
import {PrismaClient} from "@prisma/client";

declare global {
  var __prisma__: PrismaClient | undefined;
}

const getPrisma = ()=> {
  if (process.env.NODE_ENV === "production") {
    return new PrismaClient();
  }
  if (!global.__prisma__) global.__prisma__ = new PrismaClient();
  return global.__prisma__;
};

export default getPrisma();
