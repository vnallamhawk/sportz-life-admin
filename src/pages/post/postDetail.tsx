import { Dropdown } from "flowbite-react";
import Image from "next/image";
import Card from "~/components/Card";
import Dots from "../../images/dots.svg";
import User from "../../images/user.png";
import Posts from "../../images/post-detail.png";
import ArrowLeftBlue from "../../images/arrow-left-blue.svg";


type PostDetailProps = {
    post: {
        id: number;
        title: string;
        imageLink: string;
        postDetails: string;
        createdAt: string;
    };
};

export default function PostDetail({ post }: PostDetailProps) {
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
                            {post.title}
                        </div>
                        <div className="text-[#6E7280] text-sm font-medium text-center">
                            {new Date(post.createdAt).toLocaleDateString()} at {new Date(post.createdAt).toLocaleTimeString()}
                        </div>
                        <div className="pt-6 "><Image src={post.imageLink} alt="" width={0} height={0} sizes="100vw" className="w-full lg:h-[402px] h-[231px] object-cover rounded-lg" /></div>

                        <div className="text-[#5A5A5A] text-center py-4">
                            {post.postDetails}
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
