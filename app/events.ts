import { EventEmitter } from "events";

export const emitter = new EventEmitter();

export const EVENTS = {
  MESSAGE_SENT: (messageId: string) => {
    emitter.emit("MESSAGE_SENT", messageId);
  },
};
