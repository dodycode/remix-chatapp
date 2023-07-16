import { json, redirect, type LoaderArgs } from "@remix-run/node";
import { Outlet, isRouteErrorResponse, useLocation, useRouteError } from "@remix-run/react";

import ChatNavigation from "~/components/ChatNavigation";
import ErrorComp from "~/components/ErrorComp";
import { db } from "~/db.server";
import { authenticator } from "~/services/auth.server";

export function ErrorBoundary() {
  const error = useRouteError();

  return <ErrorComp
    isRouteErrorResponse={isRouteErrorResponse(error)}
    error={error} />;
}

export async function loader({ request }: LoaderArgs) {
  const user = await authenticator.isAuthenticated(request);

  if (!user) {
    return redirect("/");
  }

  //get registered users where id is not equal to the current user id
  const users = await db.user.findMany({
    where: {
      id: {
        not: user?.id,
      },
    },
    select: {
      id: true,
      username: true,
      createdAt: true,
      imageUrl: true,
    },
    take: 3,
  });

  const chattingWith = await db.user.findUnique({
    where: {
      id: user.id
    },
    include: {
      sentMessages: {
        include: {
          receiver: true
        },
        orderBy: {
          createdAt: "desc"
        },
        take: 1
      },
      receivedMessages: {
        include: {
          sender: true
        },
        orderBy: {
          createdAt: "desc"
        },
        take: 1
      }
    }
  })

  const chattingUsers = [
    ...chattingWith?.sentMessages.map((message) => ({
      user: message.receiver,
      lastMessage: message,
    })) || [],
    ...chattingWith?.receivedMessages.map((message) => ({
      user: message.sender,
      lastMessage: message,
    })) || [],
  ];

  const uniqueChattingUsers = Array.from(new Map(chattingUsers.map((user) => [user.user.id, user])).values());

  return json({ users, chattingWith: uniqueChattingUsers, loggedInUser: user });
}

export default function Messages() {
  //check current route in remix js
  const location = useLocation();

  return (
    <div className="flex flex-shrink-0 flex-grow justify-start relative">
      <ChatNavigation />
      {location.pathname === "/messages" && (
        <div className="flex flex-col flex-grow flex-shrink-0 justify-center items-center">
          <h1 className="text-3xl font-bold">Select a user to chat with</h1>
        </div>
      )}

      <Outlet />
    </div>
  );
}