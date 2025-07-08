import { initTRPC } from "@trpc/server";

// Generally context holds data that all of your tRPC procedures will have access to, and is a great place to put things like database connections or authentication information.
type ContextType = { username: string };
const t = initTRPC.context<ContextType>().create();
export const router = t.router;
export const publicProcedure = t.procedure;
