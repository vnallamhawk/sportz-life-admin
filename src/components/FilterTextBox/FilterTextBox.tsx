import Image from "next/image";
import FilterIcon from "../../images/FilterIcon.svg";

export default function FilterTextBox() {
  return (
    <div className="relative">
      <Image width={0} height={0}
        src={FilterIcon}
        className={`absolute left-[7rem] top-2 z-10 w-auto h-auto`}
        alt=""
      />
      <input
        type="search"
        className="relative w-[142px] rounded-lg border-2  py-2 pl-4 pr-4 text-base text-gray-700 placeholder-gray-300 focus:border-transparent focus:outline-none focus:ring-0 2xl:min-w-[450px]"
        placeholder="Filter"
      />
    </div>
  );
}
