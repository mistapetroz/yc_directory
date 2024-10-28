import React from 'react'
import Link from "next/link";
import Image from "next/image";
import {auth, signIn, signOut} from "@/auth";
import {BadgePlus, LogOut} from "lucide-react";
import {Avatar} from "@/components/ui/avatar";
import {AvatarImage} from "@radix-ui/react-avatar";

const NavBar = async () => {
    const session = await auth();
    return (
        <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex items-center justify-between">
                <Link href="/">
                    <Image src="/logo.png" alt="Logo" width={144} height={30}/>
                </Link>

                <div className="flex items-center gap-5 text-black">
                    {session && session?.user ?
                        ( // User Exists
                            <>
                                <Link href="/startup/create">
                                    <span className={"max-sm:hidden"}>Create</span>
                                    <BadgePlus className={"size-6 sm:hidden text-black-500"}/>
                                </Link>
                                <form action={async () => {
                                    "use server";
                                    await signOut();
                                }}>
                                    <button type="submit">
                                        <span className={"max-sm:hidden"}>LogOut</span>
                                        <LogOut className={"size-6 sm:hidden text-red-500"}/>
                                    </button>
                                </form>
                                <Link href={`/user/${session?.id}`}>
                                    <Avatar className={"size-10"}>
                                        <AvatarImage
                                            src={session?.user?.image || ''}
                                            alt={session?.user?.name}/>
                                    </Avatar>
                                </Link>
                            </>
                        ) : ( // User Doesn't Exist
                            <form action={async () => {
                                "use server";
                                await signIn('github');
                            }}>
                                <button type="submit">LogIn</button>
                            </form>
                        )}
                </div>
            </nav>
        </header>
    )
}
export default NavBar
