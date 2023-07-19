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
  }[];
}) {
  return (
    <div
      className={`max-w-xl overflow-hidden rounded shadow-lg ${
        className ?? ""
      }`}
    >
      <div className="text-lg font-bold">{title}</div>
      <div className="flex flex-col">
        {peoples.map(({ name, subtitle }) => (
          <div className="flex" key={name}>
            <Image src={""} alt="" width="25" height="25" />
            <div>
              <div className="font-bold"> {name}</div>
              <div> {subtitle} </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
