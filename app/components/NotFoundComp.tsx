import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export default function NotFoundComp() {
  return (
    <div className="h-[calc(100vh-64px)] mx-auto flex items-center">
      <Alert>
        <AlertTitle>404 Not Found</AlertTitle>
        <AlertDescription>
          <p>Sorry, the page you requested could not be found.</p>
        </AlertDescription>
      </Alert>
    </div>
  );
}
