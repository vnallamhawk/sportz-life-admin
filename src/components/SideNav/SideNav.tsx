import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { SIDE_NAV_ITEMS } from "../../constants/SideNavConstants";
import { useSession } from "next-auth/react";
import classNames from "classnames";
import SiteLogoIcon from "../Icons/SiteLogoIcon";
import Image from "next/image";
import LogoWhite from "../../images/logo-white.svg";

export default function SideNav({ className }: { className: string }) {
  // const { pathname } = useRouter();
  const { data: sessionData } = useSession();

  // if (!sessionData) {
  //   return null;
  // }

  // const currentPath = new URL(window.location.href).pathname;
  const currentPath = "https";
  const currentActiveNav = currentPath.split("/")[1];

  return (
    <>
      <div className="fixed -left-[256px] top-0 bottom-0 z-10 min-w-[256px] transition-all duration-300 ease-in lg:relative lg:left-0 lg:z-0">
        <div className="overlay fixed bottom-0 left-0 right-0 top-0 hidden bg-black bg-opacity-30"></div>
        <NavigationMenu.Root
          className={classNames(
            "relative -top-[20px] z-10 bg-gray-950 pr-5 lg:z-0",
            {
              [`${className}`]: className !== "",
            }
          )}
          orientation="horizontal"
        >
          <div className="mb-7 mt-5 flex items-center justify-center space-x-1">
            <Image width={0} height={0} src={LogoWhite} alt="logo" className="w-auto h-auto" />
            {/* <SiteLogoIcon /> */}
            {/* <span className="font-heading text-white">SPORTZ TRACK</span> */}
          </div>

          <NavigationMenu.List className="mb-4 space-y-5">
            {SIDE_NAV_ITEMS.map(({ label, route, icon }) => (
              <NavigationMenu.Item key={label}>
                <NavigationMenu.Link
                  className={`text-zinc-500 no-underline visited:text-zinc-500 hover:fill-side-nav-orange hover:text-side-nav-orange data-[active]:text-side-nav-orange`}
                  active={`/${currentActiveNav as string}` == route}
                  href={`${route}`}
                >
                  {`/${currentActiveNav as string}` ? (
                    <div className="absolute w-1 rounded-r-md bg-side-nav-orange">
                      &nbsp;
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="ml-6 flex space-x-2">
                    {icon}
                    <span>{label}</span>
                  </div>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </div>
    </>
  );
}
