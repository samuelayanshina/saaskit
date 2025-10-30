import "dotenv/config";
import { defineConfig } from "@prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  output: {
    client: "./node_modules/.prisma/client",
  },
});
