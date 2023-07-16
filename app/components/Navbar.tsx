import { Form } from "@remix-run/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

//user type of loader
export default function Navbar({ user }: any) {
  return (
    <nav className="bg-white border-b">
      <div className="mx-auto max-w-[calc(100%-32px)]">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <a href="/" className="text-black text-3xl font-bold">
                Re<span className="text-blue-500">mix</span> <span>Chat</span>
              </a>
            </div>
          </div>
          <div className="flex items-center ml-6">
            {user ? (
              <Form method="post" action="/logout" className="flex items-center">
                <Avatar>
                  <AvatarImage src={user?.imageUrl} />
                  <AvatarFallback>{user?.username}</AvatarFallback>
                </Avatar>
                <Button type="submit" className="ml-2">Logout</Button>
              </Form>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}