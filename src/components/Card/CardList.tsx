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
      <div className="flex h-full max-h-[calc(100%-40px)] flex-col overflow-auto scroll">
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
              <div className="font-bold "> {name}</div>
              <div> {subtitle} </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
