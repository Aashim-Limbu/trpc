import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../src/index";
const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000",
      async headers() {
        return {
          Authorization: "Bearer 123",
        };
      },
    }),
  ],
});

async function main() {
  let response = await trpc.createTodo.mutate({
    title: "Go to GYM",
    description: "Healthy Habit",
  });
  //   let response = await trpc.getTodo.query("Aashim");
  //   const token = await trpc.signUp.mutate({
  //     email: "test@gmail.com",
  //     password: "password",
  //   });

  console.log(response);
  //   console.log(token);
}
main();
