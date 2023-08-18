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
      <div>
        <Image
          width="100"
          height="100"
          src="/images/SPORTZ_LIFE_LOGO.jpg"
          alt="Sportz Life"
        />
      </div>

      <NavigationMenu.List>
        {SIDE_NAV_ITEMS.map(({ label, route }) => (
          <NavigationMenu.Link
            className="text-zinc-500"
            key={label}
            href={`${route}`}
          >
            <NavigationMenu.Item className="p-2">
              <NavigationMenu.Trigger>{label}</NavigationMenu.Trigger>
            </NavigationMenu.Item>
          </NavigationMenu.Link>
        ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
