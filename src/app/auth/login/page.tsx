"use client";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from 'react'

function Login() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [message, setMessage] = useState("");
    const callBack = searchParams.get('callbackUrl') || 'http://localhost:3000'
    const HandlerLogin = async (event: any) => {
        event.preventDefault();
        const response: any = await signIn("credentials", {
            email: event.target.email.value,
            password: event.target.password.value,
            redirect: false,
            callbackUrl: callBack
        });

        if (response.ok) {
            setMessage("Login success")
            router.push(callBack)
        } else {
            setMessage("Wrong email or password")
        }
    }
    return (
        <div className="lg:grid lg:h-screen">
            <div className="grid my-8 mx-10 gap-8 lg:grid-cols-2 lg:drop-shadow-login lg:bg-white">
                <div className="description grid gap-4 lg:my-auto lg:flex lg:flex-col lg:gap-5">
                    <h3 className="text-secondary font-bold text-3xl text-center mt-6 lg:mt-0">E-Commerce App</h3>
                    <div className="image">
                        <Image src={"/logo.jpg"} alt="login" width={5000} height={5000} className="w-72 sm:w-96 m-auto" />
                    </div>
                    <p className="text-secondary font-medium text-justify lg:text-center sm:px-10 xl:px-12">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio fugit cumque repudiandae! Dolorum ad doloremque, nam maxime eligendi sed ut. Voluptates quibusdam suscipit aut?</p>
                </div>
                <div className="lg:bg-secondary lg:grid lg:justify-items-center">
                    <div className="lg:my-auto sm:w-4/5 lg:w-3/5 ">
                        <h3 className="text-white font-bold text-3xl text-center mb-5">Login</h3>
                        <form className="form grid gap-5 lg:gap-4" onSubmit={HandlerLogin}>
                            <div className="email">
                                <input type="text" id="email" className="outline-none py-1.5 bg-white border-b-2 border-secondary lg:rounded-md px-2 w-full text-secondary lg:bg-white" placeholder="Email" />
                            </div>
                            <div className="password">
                                <input type="password" id="password" className="outline-none py-1.5 bg-white border-b-2 border-secondary lg:rounded-md px-2 w-full text-secondary lg:bg-white" placeholder="Password" />
                            </div>
                            <button type="submit" className="bg-secondary lg:bg-white py-1 mt-1 text-white lg:text-secondary font-bold rounded-md">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function WrapperLogin() {
    return (
        // You could have a loading skeleton as the `fallback` too
        <Suspense>
            <Login />
        </Suspense>
    )
}