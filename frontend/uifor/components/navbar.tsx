import { MaxWidthWrapper } from "./Maxwidthwrapper"
import Link from "next/link"

export const Navbar = () => {

    const isLoggedIn = false

    return <nav className="fixed z-100 h-16 inset-x-0 top-0 w-full bg-linear-to-br from-[#0f172a] to-[#1e293b] backdrop-blur-lg transition-all">
        <MaxWidthWrapper>
            <div className="flex h-16 justify-between items-center">
                <Link href={"/"} className="flex z-40 font-semibold">
                Regul <span className="text-blue-400">AI</span>
                </Link>

                <div className="h-full flex items-center space-x-8">
                    <Link href={"/"} className="text-sm">Pricing</Link>
                    <Link href={"/auth/login"} className="text-sm">Login</Link>
                    {isLoggedIn &&
                    <>
                    <Link href={'/dashboard'} className="text-sm">
                        Dashboard
                    </Link>
                    <Link href={"/"} className="text-sm">
                        Logout
                    </Link>
                    </>}
                </div>
            </div>
        </MaxWidthWrapper>
    </nav>
}