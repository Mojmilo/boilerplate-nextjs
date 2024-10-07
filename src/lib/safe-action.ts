import {createServerActionProcedure} from "zsa";
import {getCurrentUser} from "@/lib/session";

export const authedProcedure = createServerActionProcedure()
  .handler(async () => {
    const user = await getCurrentUser();

    return { user };
  });