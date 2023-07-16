import NotFoundComp from "./NotFoundComp";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export default function ErrorComp({ isRouteErrorResponse, error }: any) {
  if (isRouteErrorResponse) {
    return (
      <NotFoundComp />
    );
  } else if (error instanceof Error) {
    return (
      <div className="h-[calc(100vh-64px)] mx-auto flex items-center">
        <Alert>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            <p>{error.message}</p>
            <p>The stack trace is:</p>
            <pre>{error.stack}</pre>
          </AlertDescription>
        </Alert>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
