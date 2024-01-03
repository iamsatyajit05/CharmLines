"use client"
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";

export default function Header() {
    const [isSignin, setIsSignin] = useState(false);
    const [userDetail, setUserDetail] = useState({});
    const [menuOpen, setMenuOpen] = useState(false);

    const getUserInfo = async () => {
        try {
            const response = await fetch('/api/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();
            console.log(data);
            if (data.error) {
                setIsSignin(false);
            }

            if (response.ok) {
                setUserDetail({
                    'email': data.userEmail,
                    'name': data.userName
                })
                setIsSignin(true);
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error('Error updating record:', error);
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    const login = () => {
        redirect("/api/auth/signin")
    };

    return (
        <section className="mb-12 space-y-4">
            {/* <img alt="Naval profile" decoding="async" data-nimg="1" className="w-20 h-20 md:w-24 md:h-24 rounded-full text-transparent" srcset="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnaval.6a0c2055.jpeg&amp;w=384&amp;q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnaval.6a0c2055.jpeg&amp;w=750&amp;q=75 2x" src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnaval.6a0c2055.jpeg&amp;w=750&amp;q=75" /> */}
            <div className="border-b-[1px]">
                <div className="max-w-3xl mx-auto flex items-center px-2 md:px-0 py-4">
                    <h2 className="flex-1 font-semibold">CharmLines</h2>
                    {!isSignin && <button className="inline-flex items-center justify-center px-3 py-1 font-medium bg-[#ebebeb] rounded-md hover:bg-gray-300 active:scale-95" onClick={login}>Sign In</button>}
                    {isSignin &&
                        <div className="relative" onMouseEnter={() => setMenuOpen(true)} onMouseLeave={() => setMenuOpen(false)}>
                            <button className="inline-flex items-center justify-center px-3 py-1 font-medium bg-[#ebebeb] rounded-md hover:bg-gray-300 active:scale-95">{userDetail.name}</button>
                            {menuOpen && <div className="absolute top-8 right-0 px-3 py-1 bg-[#ebebeb] rounded-md">
                                <p>{userDetail.email}</p>
                                <button className="w-full px-3 py-1 font-medium bg-[#ebebeb] rounded-md hover:bg-gray-300 active:scale-95" onClick={signOut}>Sign Out</button>
                            </div>}
                        </div>}
                </div>
            </div>
            <div className="max-w-3xl mx-auto pt-4">
                <h1 className="text-4xl md:text-5xl font-black">Start a Charming Conversation with Every Line!</h1>
            </div>
        </section>
    )
}