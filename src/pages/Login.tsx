import LoginImage from "../images/login.svg";
import Logo from "../images/logo.svg";
import LoginMobileImage from "../images/pngwing.svg";
import Link from "next/link";
import Image from "next/image";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { api } from "~/utils/api";

interface LoginDetails {
  [key:string]:string
}
export default function Login() {
  const router = useRouter();
  const [loginDetails, setLoginDetails] = useState<LoginDetails>({
    email: "",
    password: "",
  });

  // const { mutate: createMutate } = api.adminUser.createAdminUser.useMutation({
  //   onSuccess: (response) => {
  //     return response?.id;
  //   },
  // });

  const handleSubmit = async (e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    e.preventDefault();

    // createMutate({ email: "gamuaggarwal@gmail.com", password: "Gamini@123",academyId:1 });

    const res = await signIn("credentials", {
      redirect: false,
      email: loginDetails?.email,
      password: loginDetails?.password,
    });
    if (res?.error) {
      alert("Login failed");
    } else {
      void router.push("/dashboard");
    }
  };

  const handleChange = (e:any) => {
    const obj: LoginDetails = { ...loginDetails };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      obj[e.target.name] = e.target.value;
    setLoginDetails(obj);
  };
  return (
    <div className="grid h-screen gap-2 p-5 lg:grid-cols-2 lg:p-3">
      <div className="items-center justify-center lg:flex">
        <div className="text-center">
          <Image width={0} height={0}
            src={Logo}
            className="w-auto h-auto max-w-3 left-1.5 top-1.5 mx-auto mb-10 text-center sm:mb-16 md:mb-20 lg:absolute lg:max-w-xs"
            alt=""
          />
        </div>
        <div className="sm:min-w-[370px]">
          <h3 className="mb-4 text-center font-heading text-3xl font-medium lg:text-left">
            Welcome Back
          </h3>
          <form>
            <div className="mb-5">
              <label className="mb-1 block text-base">Email</label>
              <input
                type="email"
                className="w-full rounded-lg border border-solid px-5 py-2"
                placeholder="Enter your email"
                name="email"
                value={loginDetails?.email}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="mb-2">
              <label className="mb-1 block text-base">Password</label>
              <input
                type="password"
                className="w-full rounded-lg border border-solid px-5 py-2"
                placeholder="Type password"
                value={loginDetails?.password}
                name="password"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="mb-5 text-right ">
              <Link
                href="/forgot-password"
                className="text-sm text-orange-light no-underline hover:text-orange-dark"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-700 bg-theme-light p-2 text-white hover:bg-theme-dark"
              onClick={(e)=> void handleSubmit(e)}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
      <div className="flex items-center justify-end ">
        <Image width={0} height={0}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          src={LoginImage}
          className="hidden max-h-[calc(100vh-30px)] w-full lg:block h-auto"
          alt=""
        />
        <Image width={0} height={0}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          src={LoginMobileImage}
          className="mt-4 block max-h-[calc(100vh-30px)] w-full lg:hidden h-auto"
          alt=""
        />
      </div>
    </div>
  );
}
