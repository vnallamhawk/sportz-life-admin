import Image from "next/image";
import SearchIcon from "../../images/search.png";
import classNames from "classnames";

export default function Search({ pos = "left" }) {
  return (
    <div className="relative">
      <Image fill
        src={SearchIcon}
        className={`absolute ${pos}-3 top-2 z-10 `}
        alt=""
      />
      <input
        type="search"
        className="relative w-full rounded-lg border-0 bg-transparent py-2 pl-12 pr-4 text-base text-gray-700 placeholder-gray-300 focus:border-transparent focus:outline-none focus:ring-0 2xl:min-w-[450px]"
        placeholder="Type anywhere to search"
      />
    </div>
  );
}
