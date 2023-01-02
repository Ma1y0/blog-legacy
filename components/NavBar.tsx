import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

function NavBar() {
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) => router.pathname === pathname

  const { data: session, status } = useSession()

  let left = (
    <div>
      <Link href="/">
        <span className="font-semibold text-8xl ml-6" data-active={isActive("/")}>Feed</span>
      </Link>
    </div>
  )

  let right = null

  if (status == "loading") {
    right = (
      <div>
        <p>Validating session...</p>
      </div>
    )
  }

  if (!session) {
    right = (
      <div>
        <Link href="/api/auth/signin">
          <span data-active={isActive('/signup')}>Log In</span>
        </Link>
      </div>
    )
  }

  if (!session) {
    right = (
      <div className="right">
        <Link href="/api/auth/signin">
          <span data-active={isActive('/signup')}>Log in</span>
        </Link>
      </div>
    )
  }

  if (session) {
    left = (
      <div className="left">
        <Link href="/">
          <span className="bold" data-active={isActive('/')}>
            Feed
          </span>
        </Link>
        <Link href="/drafts">
          <span data-active={isActive('/drafts')}>My drafts</span>
        </Link>
      </div>
    )
    right = (
      <div className="right">
        <p>
          {session.user.name} ({session.user.email})
        </p>
        <Link href="/create">
          <button>
            New post
          </button>
        </Link>
        <button onClick={() => signOut()}>
          Log out
        </button>
      </div>
    )
  }

  return (
    <header className="mb-5 mt-5 w-full">
      <nav className="w-full flex items-center justify-center">
        <div className="justify-start">{left}</div>
        <div className="justify-end">{right}</div>
      </nav>
    </header>
  )
}

export default NavBar;
