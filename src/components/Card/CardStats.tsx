import Image from "next/image";

export default function Card({
  className,
  count,
  imageSrc,
  title,
  percentChange,
}: {
  className?: string;
  count: string;
  imageSrc: string;
  title: string;
  percentChange: string;
}) {
  return (
    <>
      <div
        className={`max-w-xl overflow-hidden rounded shadow-lg ${
          className ?? ""
        }`}
      >
        <div className="mb-5 flex">
          <Image
            src={imageSrc}
            alt="Sunset in the mountains"
            width="50"
            height="25"
          />

          <div className="ml-5">
            <div className="font-bold">{title}</div>
            <div className="text-3xl font-bold">{count}</div>
          </div>
        </div>
        <div className="flex justify-between">
          <div>MONTH OVER MONTH {percentChange}%</div>
          <div className="ml-5">&uarr;</div>
        </div>
      </div>
    </>
  );
}
