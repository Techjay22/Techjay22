import Link from "next/link"
import { AuthButton } from "@/components/auth/auth-button"

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <path d="M12 1v6a3 3 0 0 0 3 3h6v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h7Z" />
                <path d="M12 7V1h7a2 2 0 0 1 2 2v4h-6a3 3 0 0 0-3 3Z" />
                <path d="M7 12h10" />
                <path d="M7 16h10" />
                <path d="M7 20h4" />
              </svg>
              <span className="text-xl font-bold">BadgeBoost</span>
            </div>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
            Home
          </Link>
          <Link href="/create" className="text-sm font-medium hover:underline underline-offset-4">
            Create Badge
          </Link>
          <Link href="/categories" className="text-sm font-medium hover:underline underline-offset-4">
            Categories
          </Link>
          <Link href="/community" className="text-sm font-medium hover:underline underline-offset-4">
            Community
          </Link>
          <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
            My Badges
          </Link>
        </nav>
        <AuthButton />
      </div>
    </header>
  )
}
