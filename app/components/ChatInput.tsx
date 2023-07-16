import { useEffect, useRef } from "react";
import { useNavigation, Form } from "@remix-run/react"
import { Input } from "./ui/input"

import { cn } from "~/lib/utils"
import { Button } from "./ui/button"

export default function ChatInput({ className, senderId, receiverId }: any) {
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (isSubmitting) {
      formRef.current?.reset();
    }
  }, [isSubmitting])

  return (
    <Form ref={formRef} method="post" className={cn(
      "px-6 py-4 flex flex-col flex-shrink flex-grow-0 bg-white",
      className
    )}>
      <div className="flex flex-grow-0 flex-shrink items-center justify-between">
        <Input type="text" name="message" placeholder="Type a message..." required={true} />
        <Input type="hidden" name="senderId" value={senderId} />
        <Input type="hidden" name="receiverId" value={receiverId} />
        <Button
          disabled={isSubmitting}
          type="submit"
          className="ml-4"
          name="_action"
          value="sendingChat">
          {isSubmitting ? "Sending..." : "Send"}
        </Button>
      </div>
    </Form>
  )
}
