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
    <Card className={`bg-white ${className ?? ""}`}> 
      <header className="flex justify-between items-center mb-3 ">
        <div className="text-2xl font-heading font-medium">{title}</div>
        <Link href={navRoute} className="text-sm text-mandy-light hover:text-mandy-dark font-bold no-underline ">
          View All
        </Link>
      </header>
      <div className="flex items-start h-full max-h-[calc(100%-40px)] gap-4 flex-col overflow-auto scroll">
        {peoples.map(({ name, subtitle, src }, index) => (
          <div className="flex items-center" key={`${name}-${index}`}>
            <Image
              className="rounded-full w-[40px] h-[40px]"
              src={src}
              alt=""
              width="30"
              height="30"
            />
            <div className="ml-2">
              <div className="font-bold text-base"> {name}</div>
              <div className="text-sm text-gray-500"> {subtitle} </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
