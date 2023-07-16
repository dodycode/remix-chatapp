import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { Form, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import ErrorComp from "~/components/ErrorComp";
import { Button } from "~/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { authenticator } from "~/services/auth.server";

export async function loader({ request }: LoaderArgs) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/messages",
  });
}

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Remix Chat App" },
    { name: "description", content: "Welcome to Remix ChatApp!" },
  ];
};

export function ErrorBoundary() {
  const error = useRouteError();

  return <ErrorComp
    isRouteErrorResponse={isRouteErrorResponse(error)}
    error={error} />;
}

export default function Index() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] py-2">
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Welcome to Re<span className="text-blue-500">mix</span> Chat!</CardTitle>
            <CardDescription>Please Login to use Chat!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              {/* Login with Github */}
              <Form method="post" action="/auth/github" className="flex items-center">
                <Button type="submit" className="w-full" size="lg">Login with Github</Button>
              </Form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
