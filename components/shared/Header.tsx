import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import NavItems from "./NavItems"
import Mobilenav from "./MobileNav"
import MobileNav from "./MobileNav"

const Header = () => {
  return (
    <header className="w-full h-[75px] shadow fixed inset-0 z-50 bg-white/30 backdrop-blur-lg">
        <div className="wrapper flex items-center justify-between">
            <Link href="/" className="flex items-center gap-5">
                <Image
                    src="/assets/images/logo.png"
                    alt="Had Wedding Logo"
                    width={150}
                    height={30}
                />
            </Link>

            {/* Nav Item when user already sign in */}
            <SignedIn>
                <nav className="md:flex-between hidden w-full max-w-sm">
                    <NavItems/>
                </nav>
            </SignedIn>

            <div className="flex w-32 justify-end gap-3">
                <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                    <MobileNav/>
                </SignedIn>
                <SignedOut>
                    <Button asChild className="rounded-full bg-primary-400 hover:bg-primary-500 transition-colors duration-200 ease-in-out" size="lg">
                        <Link href="/sign-in">Login</Link>
                    </Button>
                </SignedOut>
            </div>
        </div>
    </header>
  )
}

export default Header
