//NOTE: WILL UPDATE THIS FILE LATER, THIS IS STILL USING SSE NOT WEBSOCKET
//THE COMMUNICATION WILL END WHEN EVENT IS FINISHED, NOT CONTINUOUS

// it is a page that only for subcribe messages, so no frontend :)
// some UI will subscribe to this page
// and UI that made some changes in server action function will send emit message to this page,
// so this page will send message to all UI that subscribe to this page

import { redirect, type LoaderArgs } from "@remix-run/node";
import { eventStream } from "remix-utils";
import { authenticator } from "~/services/auth.server";
import { emitter } from "~/services/emitter.server";

export async function loader({ request }: LoaderArgs) {
  const loggedInUser = await authenticator.isAuthenticated(request);

  //make sure our user is logged in
  if (!loggedInUser) {
    return redirect("/");
  }

  return eventStream(request.signal, function setupStream(send) {
    function listener(message: string) {
      send({ event: "message", data: message });
    }
    emitter.on("message", listener);
    return function cleanup() {
      emitter.off("message", listener);
    }
  });
}
