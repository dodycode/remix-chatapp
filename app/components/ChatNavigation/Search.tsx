import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Command
} from "~/components/ui/command"

import { ScrollArea } from "~/components/ui/scroll-area"

import {
  PersonIcon,
} from "@radix-ui/react-icons"
import { useLoaderData } from "@remix-run/react"

export default function Search() {
  let { users } = useLoaderData();

  //only take top 3 users ordered by createdAt
  users = users.map((user: any) => ({
    ...user,
    createdAt: new Date(user.createdAt),
  })).sort((a: any, b: any) => b.createdAt - a.createdAt).slice(0, 3);

  return (
    <div className="flex flex-col flex-shrink flex-grow-0 px-[16px]">
      <div className="w-full relative">
        <Command>
          <CommandInput placeholder="Search people to chat with" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <ScrollArea className="max-h-[100px]">
                {users.map((user: any, index: number) => (
                  <CommandItem key={index}>
                    <a href={`/messages/${user.id}`} className="flex items-center">
                      <PersonIcon className="mr-2 h-4 w-4" />
                      <span className="font-semibold">{user?.username}</span>
                    </a>
                  </CommandItem>
                ))}
              </ScrollArea>
            </CommandGroup>
            <CommandSeparator />
          </CommandList>
        </Command>
      </div>
    </div>
  )
}
