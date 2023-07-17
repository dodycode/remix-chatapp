// it is a page that only for subcribe messages, so no frontend :)
// some UI will subscribe to this page
// and UI that made some changes in server action function will send emit message to this page,
// so this page will send message to all UI that subscribe to this page

import type { LoaderArgs } from "@remix-run/node";
import { eventStream } from "remix-utils";

import { emitter } from "~/events";

export const loader = ({ request, params }: LoaderArgs) => {
  // const path = `/${params["*"]}`;

  return eventStream(request.signal, (send) => {
    const handler = (message: string) => {
      send({ data: Date.now().toString() });
      console.log("send message to client");
    };

    emitter.addListener("MESSAGE_SENT", handler);
    return () => {
      emitter.removeListener("MESSAGE_SENT", handler);
    };
  });
};
