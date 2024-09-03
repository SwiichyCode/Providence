import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";
import { getServerAuthSession } from "@/config/server/auth";

export class ServerActionError extends Error {}

export const adminAction = createSafeActionClient({
  handleReturnedServerError: (error) => {
    if (error instanceof ServerActionError) {
      return error.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
}).use(async ({ next, clientInput }) => {
  console.log("adminAction", clientInput);
  const session = await getServerAuthSession();

  if (session?.user.role !== "ADMIN") {
    throw new ServerActionError("Unauthorized");
  }

  return next();
});
