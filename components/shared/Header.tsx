import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import NavItems from "./NavItems"
import MobileNav from "./MobileNav"
import HeaderAction from "./HeaderAction"

const Header = () => {

    return (
        <header className="w-screen h-[75px] shadow fixed inset-0 z-40 bg-white/30 backdrop-blur-lg">
            <div className="wrapper flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/assets/images/moore_logo_bw.png"
                        alt="Had Wedding Logo"
                        width={36}
                        height={36}
                    />
                    <h2 className="text-3xl font-bold font-playfair text-secondary-300">Moore</h2>
                </Link>

                {/* Nav Item when user already sign in */}
                <SignedIn>
                    <nav className="md:flex-between hidden w-full max-w-sm">
                        <NavItems/>
                    </nav>
                </SignedIn>

                <div className="flex w-32 justify-end gap-3">
                    <SignedIn>
                        <HeaderAction/>
                        <UserButton afterSignOutUrl="/" />
                        <MobileNav/>
                    </SignedIn>
                    <SignedOut>
                        <Button asChild className="button" size="lg">
                            <Link href="/sign-in" className="font-playfair">Login</Link>
                        </Button>
                    </SignedOut>
                </div>
            </div>
        </header>
    )
}

export default Header
