import { useRef, useEffect, useState } from "react";

import { type LoaderArgs, redirect, json } from "@remix-run/node";

import { isRouteErrorResponse, useRouteError, useNavigation } from "@remix-run/react";
import Chat from "~/components/Chat";
import ChatInput from "~/components/ChatInput";

import ErrorComp from "~/components/ErrorComp";
import { db } from "~/db.server";
import { authenticator } from "~/services/auth.server";
import { EVENTS } from "~/events";
import { useLiveLoader } from "~/hooks/useLiveLoader";

export async function loader({ params, request }: LoaderArgs) {
  if (typeof params.userId !== "string") {
    return redirect("/messages");
  }

  const loggedInUser = await authenticator.isAuthenticated(request);

  if (!loggedInUser) {
    return redirect("/");
  }

  const messages = await db.message.findMany({
    where: {
      OR: [
        {
          senderId: loggedInUser.id,
          receiverId: params.userId
        },
        {
          senderId: params.userId,
          receiverId: loggedInUser.id
        }
      ]
    },
    orderBy: {
      createdAt: "asc",
    },
    include: {
      sender: true,
      receiver: true,
    },
  });

  return json({ messages, loggedInUser, receiverId: params.userId })
}


export async function action({ request }: LoaderArgs) {
  const formData = await request.formData();

  if (!formData.get("message")) {
    return true;
  }

  //save message to db
  try {
    const newMessage = await db.message.create({
      data: {
        content: formData.get("message") as string,
        senderId: formData.get("senderId") as string,
        receiverId: formData.get("receiverId") as string,
      },
    });

    //emit new message to receiver
    EVENTS.MESSAGE_SENT(newMessage.id);

  } catch (error) {
    console.log(error);
  }

  return true;
}

export function ErrorBoundary() {
  const error = useRouteError();

  return <ErrorComp
    isRouteErrorResponse={isRouteErrorResponse(error)}
    error={error} />;
}

export default function MessageDetail() {
  // const { messages, loggedInUser, receiverId } = useLoaderData();
  const { messages, loggedInUser, receiverId } = useLiveLoader<typeof loader>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const bottomRef = useRef<HTMLDivElement>(null);
  const [submittedMessage, setSubmittedMessage] = useState(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSubmitting])

  useEffect(() => {
    if (isSubmitting) {
      let message = {
        senderId: navigation.formData?.get("senderId"),
        receiverId: navigation.formData?.get("receiverId"),
        content: navigation.formData?.get("message"),
        //get placeholder image
        sender: {
          imageUrl: "https://via.placeholder.com/150",
          name: "You",
        }
      }

      //@ts-ignore
      setSubmittedMessage(message);
    }
  }, [isSubmitting])

  return (
    <div className="flex flex-shrink-0 flex-grow flex-col max-w-full relative">
      <div className="flex flex-col flex-grow-0 basis-[calc(100vh-132px)] flex-shrink overflow-y-auto p-4 gap-4">
        {messages.map((message: any, index: number) => {
          const isSender = message.senderId === loggedInUser.id;
          return (
            <Chat key={index}
              isSender={isSender}
              message={message} />
          )
        })}
        {isSubmitting && (
          <Chat
            isSender={true}
            message={submittedMessage}
            pending={true} />
        )}
        <div ref={bottomRef}></div>
      </div>

      <ChatInput
        senderId={loggedInUser.id}
        receiverId={receiverId}
        className="mt-auto" />
    </div>
  )
}