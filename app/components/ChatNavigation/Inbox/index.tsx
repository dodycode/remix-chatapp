import { ScrollArea } from "~/components/ui/scroll-area"
import ItemCard from "./ItemCard"
import { useNavigate, useLoaderData } from "@remix-run/react"

export default function InboxList() {
  const navigate = useNavigate();
  const { chattingWith, loggedInUser } = useLoaderData();

  return (
    <div className="flex flex-col flex-shrink flex-grow-0 mt-4">
      <ScrollArea className="max-h-[400px]">
        <div className="flex flex-col flex-shrink flex-grow-0 px-[16px] gap-y-4">
          {chattingWith?.map((item: any) => (
            <ItemCard
              key={item.user.id}
              user={item.user}
              lastMessage={item.lastMessage}
              loggedInUser={loggedInUser}
              onClick={() => navigate(`/messages/${item.user.id}`)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
