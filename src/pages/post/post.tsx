import Image from "next/image"
import Card from "~/components/Card";
import SearchIcon from "../../images/search.png";
import Link from "next/link";
import Plus from "../../images/plus.svg";
import Posts from "../../images/post.jpg";
import User from "../../images/user.png";
import { Dropdown } from "flowbite-react";
import Dots from "../../images/dots.svg";
import { IconButton } from "@material-tailwind/react";

export default function Post() {
    return (
        <div className="bg-s-gray px-6 pb-7">
            <Card className="rounded-2xl shadow-sm lg:bg-white lg:p-6">
                <div className="mb-14 flex items-center justify-between ">
                    <div className="font-heading text-2xl font-medium uppercase">
                        All Post
                    </div>
                    <div className="hidden items-center lg:flex ">
                        <div className="relative">
                            <Image width={0} height={0}
                                src={SearchIcon}
                                className="absolute right-3 top-2 z-10 w-auto h-auto"
                                alt=""
                            />
                            <input
                                type="search"
                                className="relative w-full rounded-lg border-2 border-gray-200 bg-transparent py-2 pl-4 pr-12 text-base text-gray-700 placeholder-gray-300 focus:border-gray-400 focus:outline-none focus:ring-0 2xl:min-w-[450px]"
                                placeholder="Search by name"
                            />
                        </div>
                        <Link href="">
                            <button className="ml-3 rounded-lg bg-mandy-dark px-6 py-2.5 text-white">
                                Add Post
                            </button>
                        </Link>
                    </div>
                    <div className="flex items-center lg:hidden ">
                        <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-mandy-dark p-3">
                            <Image width={0} height={0}
                                src={Plus}
                                className="w-auto h-auto"
                                alt=""
                            />
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-x-8 gap-y-12">
                    <div className="col-span-12 lg:col-span-3">
                        <div className="">
                            <Image src={Posts} alt="" width={100} height={150} className="w-full h-[150px]" />
                            <div>
                                <div className="flex justify-between items-center py-5">
                                    <div className="flex items-center">
                                        <Image width={0} height={0}
                                            src={User}
                                            className="w-5 h-5 rounded"
                                            alt=""
                                        />
                                        <div className="text-[#6E7280] text-sm ml-2 font-medium">D. Alveraze</div>
                                    </div>
                                    <div className="pl-2 ">
                                        <Dropdown
                                            label="Late"
                                            dismissOnClick={false}
                                            placement="right"
                                            renderTrigger={() => (
                                                <button className="">
                                                    <Image width={0} height={0}
                                                        src={Dots}
                                                        className="rotate-90 transform w-auto h-auto post-dropdown relative"
                                                        alt=""
                                                    />
                                                </button>
                                            )}
                                            className="post-dropdown w-50 rounded-lg bg-[#303030] p-3 text-white"
                                        >
                                            <Dropdown.Item className="text-white hover:bg-black focus:bg-black">
                                                Edit Post
                                            </Dropdown.Item>
                                            <Dropdown.Item className="text-white hover:bg-black focus:bg-black">
                                                Hide Post
                                            </Dropdown.Item>
                                            <Dropdown.Item className="text-white hover:bg-black focus:bg-black">
                                                Copy Post URL
                                            </Dropdown.Item>
                                            <Dropdown.Item className="text-white hover:bg-black focus:bg-black">
                                                Delete Post
                                            </Dropdown.Item>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="font-heading text-2xl font-medium leading-6">
                                    Lorem Ipsum is simply dummy text of the printing industry.
                                </div>
                                <div className="text-[#6E7280] text-sm font-medium pt-4">Jun 18, 2023 at 01:14 PM</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-3">
                        <div className="">
                            <Image src={Posts} alt="" width={100} height={150} className="w-full h-[150px]" />
                            <div>
                                <div className="flex justify-between items-center py-5">
                                    <div className="flex items-center">
                                        <Image width={0} height={0}
                                            src={User}
                                            className="w-5 h-5 rounded"
                                            alt=""
                                        />
                                        <div className="text-[#6E7280] text-sm ml-2 font-medium">D. Alveraze</div>
                                    </div>
                                    <div className="pl-2">
                                        <Dropdown
                                            label="Late"
                                            dismissOnClick={false}
                                            placement="right"
                                            renderTrigger={() => (
                                                <button className="">
                                                    <Image width={0} height={0}
                                                        src={Dots}
                                                        className="rotate-90 transform w-auto h-auto  "
                                                        alt=""
                                                    />
                                                </button>
                                            )}
                                            className="post-dropdown w-50 rounded-lg bg-[#303030] p-3 text-white"
                                        >
                                            <Dropdown.Item className="text-white hover:bg-black focus:bg-black">
                                                Edit Post
                                            </Dropdown.Item>
                                            <Dropdown.Item className="text-white hover:bg-black focus:bg-black">
                                                Hide Post
                                            </Dropdown.Item>
                                            <Dropdown.Item className="text-white hover:bg-black focus:bg-black">
                                                Copy Post URL
                                            </Dropdown.Item>
                                            <Dropdown.Item className="text-white hover:bg-black focus:bg-black">
                                                Delete Post
                                            </Dropdown.Item>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="font-heading text-2xl font-medium leading-6">
                                    Lorem Ipsum is simply dummy text of the printing industry.
                                </div>
                                <div className="text-[#6E7280] text-sm font-medium pt-4">Jun 18, 2023 at 01:14 PM</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center p-4 mt-6">
                    <div className="flex items-center gap-2">
                        <IconButton variant="outlined" size="sm" className="mx-1">
                            1
                        </IconButton>
                        <IconButton
                            variant="text"
                            size="sm"
                            className="mx-1 bg-gray-700 text-white"
                        >
                            2
                        </IconButton>
                        <IconButton
                            variant="text"
                            size="sm"
                            className="mx-1 bg-gray-700 text-white"
                        >
                            3
                        </IconButton>

                    </div>
                    </div>
            </Card>
        </div>
    )
}