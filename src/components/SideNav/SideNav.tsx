import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { SIDE_NAV_ITEMS } from "../../constants/SideNavConstants";
import { useSession } from "next-auth/react";
import Image from "next/image";
import classNames from "classnames";

export default function SideNav({ className }: { className: string }) {
  // const { pathname } = useRouter();
  const { data: sessionData } = useSession();

  if (!sessionData) {
    return null;
  }
  return (
    <NavigationMenu.Root
      className={classNames("bg-gray-950", {
        [`${className}`]: className !== "",
      })}
      orientation="horizontal"
    >
      <div className="mb-7 mt-5 flex items-center justify-center space-x-1">
        <Image
          width="35"
          height="35"
          src="/icons/site-logo.svg"
          alt="Sportz Life"
        />
        <span className="text-white">SPORTZ TRACK</span>
      </div>

      <NavigationMenu.List>
        {SIDE_NAV_ITEMS.map(({ label, route, icon }) => (
          <NavigationMenu.Link
            className="text-zinc-500"
            key={label}
            href={`${route}`}
          >
            <NavigationMenu.Item className="p-2 hover:text-side-nav-orange">
              <NavigationMenu.Trigger>
                <div className="ml-2 flex space-x-1">
                  <Image
                    width="25"
                    height="25"
                    src={`/icons/${icon}`}
                    alt="Sportz Life"
                  />
                  <span>{label}</span>
                </div>
              </NavigationMenu.Trigger>
            </NavigationMenu.Item>
          </NavigationMenu.Link>
        ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
