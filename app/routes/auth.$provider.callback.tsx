import type { LoaderArgs } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export async function loader({ params, request }: LoaderArgs) {
  if (typeof params.provider !== "string") {
    return new Error("Invalid Provider");
  }

  return authenticator.authenticate(params.provider, request, {
    successRedirect: "/messages",
    failureRedirect: "/"
  });
}
