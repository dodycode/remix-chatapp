import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export default function ItemCard({
  onClick = () => { },
  user,
  lastMessage,
  loggedInUser,
  ...props
}: any) {
  const isSender = lastMessage?.senderId === loggedInUser?.id;

  //get human readable time like day ago from lastMessage.createdAt
  const time = new Date(lastMessage?.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

  return (
    <div className="flex items-center flex-shrink flex-grow-0 cursor-pointer flex-wrap" onClick={onClick} {...props}>
      <Avatar className="w-[56px] h-[56px]">
        {/* please get random kpop actress image */}
        <AvatarImage src={user?.imageUrl} className="object-cover" />
        <AvatarFallback>{user?.username}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col flex-shrink flex-grow-0 ml-2">
        <div className="flex flex-shrink flex-grow-0">
          <p>{user?.username}</p>
        </div>
        <div className="flex flex-shrink flex-grow-0">
          <div className="overflow-hidden">
            <p className="overflow-hidden text-ellipsis max-w-[170px] whitespace-nowrap">{isSender ? 'You:' : ''} {lastMessage?.content}</p>
          </div>
          <div className="ml-2">{time}</div>
        </div>
      </div >
    </div >
  )
}
