import LoginImage from "../../images/login.svg";
import Logo from "../../images/logo.svg";
import LoginMobileImage from "../../images/pngwing.svg";
import Link from 'next/link';
import Image from "next/image";

export default function login() {
    return (
        <div className="grid lg:grid-cols-2 gap-2 lg:p-3 p-5 h-screen">

            <div className="lg:flex justify-center items-center">
                <div className="text-center">
                    <Image src={Logo} className="lg:absolute top-1.5 left-1.5 lg:max-w-xs max-w-3 text-center mx-auto mb-10 sm:mb-16 md:mb-20" alt="" />
                </div>
                <div className="sm:min-w-[370px]">
                    <h3 className="text-3xl font-medium font-heading mb-4 lg:text-left text-center">Welcome Back</h3>
                    <form >
                        <div className="mb-5">
                            <label className="block mb-1 text-base">Email</label>
                            <input type="email" className="rounded-lg border border-solid px-5 py-2 w-full" value="Enter your email" />
                        </div>
                        <div className="mb-2">
                            <label className="block mb-1 text-base">Password</label>
                            <input type="password" className="rounded-lg border border-solid px-5 py-2 w-full" value="Type password" />
                        </div>
                        <div className="mb-5 text-right ">
                            <Link href="/forgot-password" className="no-underline text-sm text-orange-light hover:text-orange-dark">Forgot Password?</Link>
                        </div>
                        <button type="submit" className="text-white w-full bg-blue-700 rounded-lg p-2 bg-theme-light hover:bg-theme-dark">Sign In</button>
                    </form>
                </div>
            </div>
            <div className="flex justify-end items-center ">
                <Image src={LoginImage} className="w-full max-h-[calc(100vh-30px)] lg:block hidden " alt="" />
                <Image src={LoginMobileImage} className="w-full max-h-[calc(100vh-30px)] lg:hidden block mt-4" alt="" />
            </div>
        </div>
    )
}