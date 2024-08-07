import Image from "next/image";
import Card from "./Card";
import ArrowUp from "../../images/arrow-up-green.png"

export default function CardStats({
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
      <Card className={className ?? ""}>
        <div className="mb-3 flex items-center">
          <Image
            src={imageSrc}
            alt="Sunset in the mountains"
            width="50"
            height="25"
          />

          <div className="ml-5">
            <div className="font-bold text-base text-burgundy-light">{title}</div>
            <div className="text-4xl font-normal font-heading">{count}</div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="text-xs text-gray-500">MONTH OVER MONTH {percentChange}%</div>
          <div className="">
            <Image width={0} height={0} src={ArrowUp} alt="arrow" className="w-auto h-auto" />
          </div>
        </div>
      </Card>
    </>
  );
}
