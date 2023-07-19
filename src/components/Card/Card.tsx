import Image from "next/image";

export default function Card({
  className,
  title,
  peoples,
}: {
  className?: string;
  title: string;
  peoples: {
    name: string;
    subtitle: string;
    src: string;
  }[];
}) {
  return (
    <div
      className={`border-grey-500 max-w-xl overflow-hidden border-2 border-solid p-5 shadow-lg ${
        className ?? ""
      }`}
    >
      <div className="text-lg font-bold">{title}</div>
      <div className="flex flex-col">
        {peoples.map(({ name, subtitle, src }) => (
          <div className="flex" key={name}>
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
    </div>
  );
}
