import Image from "next/image";
import SearchIcon from "../../images/search.png";

export default function Search() {
    return (
        <div className="relative">
        <Image src={SearchIcon} className="absolute left-3 top-2 z-10" alt="" />
        <input type="search" className="2xl:min-w-[450px] focus:border-transparent focus:ring-0 relative w-full text-gray-700 bg-transparent pl-12 pr-4 py-2 border-0 placeholder-gray-300 focus:outline-none rounded-lg text-base" placeholder="Type anywhere to search" />
    </div>
    )
}