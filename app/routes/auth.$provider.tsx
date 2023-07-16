import { redirect, type ActionArgs, LoaderArgs } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

import ErrorComp from "~/components/ErrorComp";

export async function action({ params, request }: ActionArgs) {
  if (typeof params.provider !== "string") {
    return new Error("Invalid Provider");
  }

  return authenticator.authenticate(params.provider, request, {
    successRedirect: "/messages",
    failureRedirect: "/"
  });
}

export async function loader({ params, request }: LoaderArgs) {
  return redirect('/');
}

export function ErrorBoundary() {
  const error = useRouteError();

  return <ErrorComp
    isRouteErrorResponse={isRouteErrorResponse(error)}
    error={error} />;
}




