import Image from "next/image";

export default function Card({
  count,
  title,
  percentChange,
}: {
  count: string;
  title: string;
  percentChange: string;
}) {
  return (
    <>
      <div className="max-w-sm overflow-hidden rounded shadow-lg">
        <div className="flex">
          <Image className="h-4 w-4" src="" alt="Sunset in the mountains" />
          <div>
            <div>{title}</div>
            <div>{count}</div>
          </div>
        </div>
        <div className="flex justify-between">
          <div>MONTH OVER MONTH {percentChange}%</div>
          <div>&uarr;</div>
        </div>
      </div>
    </>
  );
}
