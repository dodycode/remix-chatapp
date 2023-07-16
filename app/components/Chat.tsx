import { cn } from "~/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Chat({ message, isSender = false, pending = false }: any) {
  const sender = message?.sender;

  return (
    <div className={cn(
      "flex items-start flex-shrink flex-grow-0 gap-x-2",
      isSender ? "self-start" : "self-end flex-row-reverse",
      pending ? "opacity-50" : ""
    )}>
      <Avatar>
        <AvatarImage src={sender?.imageUrl} className="object-cover" />
        <AvatarFallback>{sender?.name}</AvatarFallback>
      </Avatar>
      <div className="rounded-lg bg-white shadow-md self-start p-2">
        <p className="text-sm">{message?.content}</p>
      </div>
    </div>
  )
}
