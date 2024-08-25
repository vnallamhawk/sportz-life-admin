import { Dropdown } from "flowbite-react";
import Image from "next/image";
import Card from "~/components/Card";
import Dots from "../../images/dots.svg";
import User from "../../images/user.png";
import Posts from "../../images/post-detail.png";
import ArrowLeftBlue from "../../images/arrow-left-blue.svg";

export default function PostDetail() {
    return (
        <div className="bg-s-gray px-6 pb-7">
            <Card className="rounded-2xl shadow-sm lg:bg-white lg:p-6">
                <div className="flex justify-between items-start">
                    <button className="lg:flex items-center hidden">
                        <Image width={0} height={0}
                            src={ArrowLeftBlue}
                            className="w-auto h-auto mr-2"
                            alt=""
                        />Back</button>
                    <div className="lg:max-w-[645px] m-auto">
                        <div className="flex items-center justify-center text-center">
                            <Image width={0} height={0}
                                src={User}
                                className="w-5 h-5 rounded"
                                alt=""
                            />
                            <div className="text-[#6E7280] text-sm ml-2 font-medium">D. Alveraze</div>
                        </div>
                        <div className="font-heading text-4xl font-medium text-center pt-6 pb-4">
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </div>
                        <div className="text-[#6E7280] text-sm font-medium text-center">Jun 18, 2023 at 01:14 PM</div>
                        <div className="pt-6 "><Image src={Posts} alt="" width={0} height={0} sizes="100vw" className="w-full lg:h-[402px] h-[231px] object-cover rounded-lg" /></div>
                        
                        <div className="text-[#5A5A5A] text-center py-4">
                            <p className="pt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            <p className="pt-3">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            <p className="pt-3">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>
                        </div>
                    </div>
                    <div className="text-right lg:block hidden">
                        <Dropdown
                            label="Late"
                            dismissOnClick={false}
                            placement="left"
                            renderTrigger={() => (
                                <button className="">
                                    <Image width={0} height={0}
                                        src={Dots}
                                        className="rotate-90 transform w-auto h-auto relative"
                                        alt=""
                                    />
                                </button>
                            )}
                            className="post-dropdown-right w-50 rounded-lg bg-[#303030] p-3 text-white border-0"
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

            </Card>
        </div>
    );
}