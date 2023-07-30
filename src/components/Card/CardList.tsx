import Image from "next/image";
import Card from "./Card";
import Link from "next/link";

export default function CardList({
  className,
  title,
  peoples,
  navRoute,
}: {
  className?: string;
  title: string;
  peoples: {
    name: string;
    subtitle: string;
    src: string;
  }[];
  navRoute: string;
}) {
  return (
    <Card className={className ?? ""}>
      <header className="flex justify-between">
        <div className="text-lg font-bold">{title}</div>
        <div className="">
          {/* <NavigationMenu.Link key={""} href={`${navRoute}`}> */}
          {/* <NavigationMenu.List> */}
          {/* <NavigationMenu.Item> VIEW ALL</NavigationMenu.Item> */}
          {/* </NavigationMenu.List> */}
          {/* </NavigationMenu.Link> */}
          <Link href={navRoute} className="text-blue-500">
            VIEW ALL
          </Link>
        </div>
      </header>
      <div className="flex flex-col">
        {peoples.map(({ name, subtitle, src }, index) => (
          <div className="flex" key={`${name}-${index}`}>
            <Image
              className="h-6 rounded-full"
              src={src}
              alt=""
              width="20"
              height="15"
            />
            <div className="ml-2">
              <div className="font-bold"> {name}</div>
              <div> {subtitle} </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
