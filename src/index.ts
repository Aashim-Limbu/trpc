import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { TRPCError } from "@trpc/server";

const todoInputType = z.object({
  title: z.string(),
  description: z.string(),
});
const signUpInputType = z.object({
  email: z.string(),
  password: z.string(),
});
const getTodoType = z.object({
  id: z.string(),
});
const appRouter = router({
  createTodo: publicProcedure.input(todoInputType).mutation(async (opts) => {
    const title = opts.input.title;
    const description = opts.input.description;
    const token = opts.ctx.username;
    return {
      status: "success",
      id: "1",
      title,
      description,
    };
  }),
  getTodo: publicProcedure.input(z.string()).query(async (opts) => {
    return {
      id: opts.input,
    };
  }),
  signUp: publicProcedure.input(signUpInputType).mutation(async (opts) => {
    const username = opts.ctx.username;
    const email = opts.input.email;
    const password = opts.input.password;
    let token = "123";
    if (username == token) {
      return {
        message: "success",
        token,
      };
    } else {
      return {
        message: "failes",
      };
    }
  }),
});
export type AppRouter = typeof appRouter;
const server = createHTTPServer({
  router: appRouter,
  createContext(opts) {
    let authHeaders = opts.req.headers["authorization"] as string;
    if (!authHeaders.startsWith("Bearer"))
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Missing Bearer token",
      });
    const token = authHeaders.split(" ")[1];
    console.log("Auth-Header", token);
    return {
      username: token,
    };
  },
});
server.listen(3000);
