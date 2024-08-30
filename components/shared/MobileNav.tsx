"use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Separator } from "@radix-ui/react-separator"
import Image from "next/image"
import NavItems from "./NavItems"
  
const MobileNav = () => {
  return (
    <nav className="md:hidden">
        <Sheet>
            <SheetTrigger className="align-middle">
                <Image
                    src='/assets/icons/menu.svg'
                    alt="menu"
                    width={24}
                    height={24}
                    className="cursor-pointer"
                />
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
                <Image
                    src="/assets/images/logo.png"
                    alt="Had Wedding Logo"
                    width={150}
                    height={30}
                />
                <Separator className="border border-gray-50"/>
                <NavItems/>
            </SheetContent>
        </Sheet>
    </nav>
  )
}

export default MobileNav
