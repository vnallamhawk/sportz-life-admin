import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { SIDE_NAV_ITEMS } from "../../constants/SideNavConstants";
import { useSession } from "next-auth/react";
import Image from "next/image";
import classNames from "classnames";
import SiteLogoIcon from "../Icons/SiteLogoIcon";

export default function SideNav({ className }: { className: string }) {
  // const { pathname } = useRouter();
  const { data: sessionData } = useSession();

  if (!sessionData) {
    return null;
  }

  let currentPath = new URL(window.location.href).pathname;
  let currentActiveNav = currentPath.split("/")[1];

  return (
    <NavigationMenu.Root
      className={classNames("bg-gray-950 pl-2 pr-5", {
        [`${className}`]: className !== "",
      })}
      orientation="horizontal"
    >
      <div className="mb-7 mt-5 flex items-center justify-center space-x-1">
        <SiteLogoIcon />
        <span className="font-heading text-white">SPORTZ TRACK</span>
      </div>

      <NavigationMenu.List className="mb-4 ml-1 space-y-4">
        {SIDE_NAV_ITEMS.map(({ label, route, icon }) => (
          <NavigationMenu.Item key={label}>
            <NavigationMenu.Link
              className={`text-zinc-500 no-underline visited:text-zinc-500 hover:fill-side-nav-orange hover:text-side-nav-orange data-[active]:text-side-nav-orange`}
              active={"/" + currentActiveNav == route}
              href={`${route}`}
            >
              {"/" + currentActiveNav == route ? (
                <div className="absolute w-1 rounded-sm bg-side-nav-orange">
                  &nbsp;
                </div>
              ) : (
                ""
              )}
              <div className="ml-2 flex space-x-2">
                {icon}
                <span>{label}</span>
              </div>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
