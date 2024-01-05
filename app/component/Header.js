"use client"
import { useState } from "react";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";

export default function Header({ isSignin, userDetail }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const login = () => {
        redirect("/api/auth/signin")
    };

    return (
        <section className="mb-12 space-y-4">
            {/* <img alt="Naval profile" decoding="async" data-nimg="1" className="w-20 h-20 md:w-24 md:h-24 rounded-full text-transparent" srcset="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnaval.6a0c2055.jpeg&amp;w=384&amp;q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnaval.6a0c2055.jpeg&amp;w=750&amp;q=75 2x" src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnaval.6a0c2055.jpeg&amp;w=750&amp;q=75" /> */}
            <div className="border-b-[1px]">
                <div className="max-w-3xl mx-auto flex items-center px-4 md:px-0">
                    <h2 className="flex-1 font-semibold my-4">CharmLines</h2>
                    {!isSignin && <a href="/api/auth/signin" className="inline-flex items-center justify-center my-4 px-3 py-1 font-medium bg-[#ebebeb] rounded-md hover:bg-gray-300 active:scale-95">Sign In</a>}
                    {isSignin &&
                        <div className="relative" onMouseEnter={() => setMenuOpen(true)} onMouseLeave={() => setMenuOpen(false)}>
                            <p className="inline-flex items-center justify-center my-4 px-3 py-1 font-medium bg-[#ebebeb] rounded-md cursor-pointer">{userDetail.name}</p>
                            {menuOpen && <div className="absolute top-14 right-0 px-3 py-1 bg-[#ebebeb] rounded-md">
                                <p>{userDetail.email}</p>
                                <button className="w-full px-3 py-1 font-medium bg-[#ebebeb] rounded-md hover:bg-gray-300 active:scale-95" onClick={signOut}>Sign Out</button>
                            </div>}
                        </div>}
                </div>
            </div>
            <div className="max-w-3xl mx-auto pt-4 px-4 md:px-0">
                <h1 className="text-4xl md:text-5xl font-black">Start a Charming Conversation with Every Line!</h1>
            </div>
        </section>
    )
}