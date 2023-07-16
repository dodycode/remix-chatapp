import { useLoaderData } from "@remix-run/react";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useLoaderData<any>();

  return (
    <>
      <Navbar user={user} />
      <main>{children}</main>
    </>
  )
}
