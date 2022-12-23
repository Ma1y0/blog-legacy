import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function NavBar() {
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) => router.pathname === pathname

  const { data: session, status } = useSession()

  return (
    <header className="mb-5 mt-5">
      <h1 className="font-semibold text-8xl ml-6">Feed</h1>
      <div></div>
    </header>
  )
}

export default NavBar;
