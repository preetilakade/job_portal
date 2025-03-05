"use client";
import { useGlobalContext } from "@/context/GlobalContext";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LogIn, User, UserPlus } from "lucide-react";
import { Icon } from "lucide-react";
import Profile from "./Profile";




function Header() {

    const { isAuthenticated, user } = useGlobalContext();

    const pathname = usePathname();
    //logo
    return (
        <header className="px-10 py-6 bg-[#D7DEDC] text-gray-500  flex justify-between items-center">
            <Link href={"/"} className="flex items-center gap-2">
                <Image src="/logo.svg" alt="logo" width={50} height={50} />
                <h1 className=" font-extrabold text-2xl text-[#7263f3]">JobFindr</h1>
            </Link>

            <ul className="flex items-center gap-8">
                <li>

                    <Link href={"/findwork"}
                        className={`py-2 px-6 rounded-md
                ${pathname === "/findwork" ? "text-[#7263f3] border-[#7263f3] border bg-[#7263f3]/10" : ""}`}>
                        Find Work
                    </Link>
                </li>



                <li>
                    <Link href={"/myjobs"}
                        className={`py-2 px-6 rounded-md
                ${pathname === "/myjobs" ? "text-[#7263f3] border-[#7263f3] border bg-[#7263f3]/10" : ""}`}>
                        My Jobs
                    </Link>
                </li>



                <li>
                    <Link href={"/post"}
                        className={`py-2 px-6 rounded-md
                ${pathname === "/post" ? "text-[#7263f3] border-[#7263f3] border bg-[#7263f3]/10" : ""}`}>
                        Post a Job
                    </Link>
                </li>


            </ul>

            <div className="flex items-center gap-4">
                {isAuthenticated ? (
                    <Profile />
                ) : (
                    <div className="flex items-center gap-6">
                        <Link
                            href={`${process.env.NEXT_PUBLIC_SERVER_URL ? `${process.env.NEXT_PUBLIC_SERVER_URL}/login` : "http://localhost:8000/login"}`}
                            className="py-2 px-6 rounded-md flex items-center gap-4 border bg-[#7263f3] border-[#7263f3] text-white   hover:bg-[#7263f3]/90 transition-all duration-200 ease-in-out"
                        >
                            <LogIn className="w-4 h-4" />
                            Login
                        </Link>

                        <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL ? `${process.env.NEXT_PUBLIC_SERVER_URL}/login` : "http://localhost:8000/login"}`}
                            className="py-2 px-6 rounded-md flex items-center gap-4 border border-[#7263f3] text-[#7263f3] hover:bg-[#7263f3]/10 transition-all duration-200 ease-in-out"
                        >
                            <UserPlus className="w-4 h-4" />
                            Register

                        </Link>
                    </div>
                )}
            </div>

        </header>
    );
}

export default Header;