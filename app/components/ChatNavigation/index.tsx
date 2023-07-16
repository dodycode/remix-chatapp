import Header from "./Header";
import InboxList from "./Inbox";
import Search from "./Search";

export default function ChatNavigation() {
  return (
    <div className="flex flex-col flex-shrink flex-grow-0 basis-[360px] relative h-[calc(100vh-64px)] bg-white overflow-hidden border-r">
      <div className="flex flex-col flex-shrink flex-grow">
        <Header />
        <Search />
        <InboxList />
        <div className="flex flex-grow-0 flex-shrink items-center justify-center py-5 border-t mt-auto">
          Made with ❤️ by Dodycode
        </div>
      </div>
    </div>
  )
}
