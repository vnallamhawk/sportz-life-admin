import Image from "next/image";
import Card from "~/components/Card";
import SearchIcon from "../../images/search.png";
import Link from "next/link";
import User from "../../images/user.png";
import { Dropdown } from "flowbite-react";
import Dots from "../../images/dots.svg";
import { IconButton } from "@material-tailwind/react";
import PostDetail from "./postDetail";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";

type PostType = {
    id: number;
    academyId: number;
    title: string;
    imageLink: string;
    postDetails: string;
    showPost: boolean;
    createdAt: string;
    deletedAt: string | null;
    updatedAt: string;
};

export default function Post() {
    const { data: sessionData } = useSession();

    const academyId = sessionData?.token
        ? sessionData?.token?.academyId
        : sessionData?.user?.academyId;

    // Ensure correct typing for API response
    const { data: postsData } = api.post.getAll.useQuery<{ postsData: PostType[] }>();

    console.log("Fetched postsData:", postsData);

    const [selectedPost, setSelectedPost] = useState<PostType | null>(null);
    const [previewUrls, setPreviewUrls] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        if (postsData) {
            const previews: { [key: number]: string } = {};
            postsData.forEach((post: PostType) => {
                if (post.imageLink.startsWith("uploads/")) {
                    fetch(`/${post.imageLink}`)
                        .then(response => response.blob())
                        .then(blob => {
                            previews[post.id] = URL.createObjectURL(blob);
                            console.log({ previews })
                            setPreviewUrls((prev) => ({ ...prev, ...previews }));
                        })
                        .catch((err) => console.error("Failed to fetch image:", err));
                }
            });
        }
    }, [postsData]);

    console.log({ previewUrls })



    return (
        <>
            <div className="bg-s-gray px-6 pb-7">
                <Card className="rounded-2xl shadow-sm lg:bg-white lg:p-6">
                    <div className="mb-14 flex items-center justify-between">
                        <div className="font-heading text-2xl font-medium uppercase">
                            All Posts
                        </div>
                        <div className="hidden items-center lg:flex">
                            <div className="relative">
                                <Image width={20} height={20}
                                    src={SearchIcon}
                                    className="absolute right-3 top-2 z-10"
                                    alt="Search"
                                />
                                <input
                                    type="search"
                                    className="relative w-full rounded-lg border-2 border-gray-200 bg-transparent py-2 pl-4 pr-12 text-base text-gray-700 placeholder-gray-300 focus:border-gray-400 focus:outline-none focus:ring-0 2xl:min-w-[450px]"
                                    placeholder="Search by name"
                                />
                            </div>
                            <Link href="/post/AddPost">
                                <button className="ml-3 rounded-lg bg-mandy-dark px-6 py-2.5 text-white">
                                    Add Post
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Dynamic Posts Grid */}
                    <div className="grid grid-cols-12 gap-x-8 gap-y-12">
                        {postsData && postsData.length > 0 ? (
                            postsData.map((post: PostType) => (
                                <div
                                    key={post.id}
                                    className="col-span-12 lg:col-span-3 cursor-pointer"
                                    onClick={() => setSelectedPost({ ...post, imageLink: previewUrls[post.id] ?? post.imageLink })}
                                >
                                    <div>
                                        {/* Ensure image path is correctly handled */}
                                        <Image
                                            src={previewUrls[post.id] || ""}
                                            alt={post.title}
                                            width={100}
                                            height={150}
                                            className="w-full h-[150px] object-cover"
                                        />
                                        <div>
                                            <div className="flex justify-between items-center py-5">
                                                <div className="flex items-center">
                                                    <Image width={20} height={20}
                                                        src={User}
                                                        className="w-5 h-5 rounded"
                                                        alt="User"
                                                    />
                                                    <div className="text-[#6E7280] text-sm ml-2 font-medium">
                                                        {post.title}
                                                    </div>
                                                </div>
                                                <div className="pl-2">
                                                    <Dropdown
                                                        label="Options"
                                                        dismissOnClick={false}
                                                        placement="right"
                                                        renderTrigger={() => (
                                                            <button>
                                                                <Image width={20} height={20}
                                                                    src={Dots}
                                                                    className="rotate-90 transform"
                                                                    alt="Menu"
                                                                />
                                                            </button>
                                                        )}
                                                        className="post-dropdown w-50 rounded-lg bg-[#303030] p-3 text-white border-0"
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
                                                {post.postDetails.substring(0, 100)}...
                                            </div>
                                            <div className="text-[#6E7280] text-sm font-medium pt-4">
                                                {new Date(post.createdAt).toLocaleDateString()} at {new Date(post.createdAt).toLocaleTimeString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-12 text-center text-gray-500">
                                No posts available.
                            </div>
                        )}
                    </div>

                    {/* Pagination (Placeholder) */}
                    <div className="flex items-center justify-center p-4 mt-6">
                        <div className="flex items-center gap-2">
                            <IconButton variant="outlined" size="sm" className="mx-1">
                                1
                            </IconButton>
                            <IconButton variant="text" size="sm" className="mx-1 bg-gray-700 text-white">
                                2
                            </IconButton>
                            <IconButton variant="text" size="sm" className="mx-1 bg-gray-700 text-white">
                                3
                            </IconButton>
                        </div>
                    </div>
                </Card>
            </div>
            {selectedPost && <PostDetail post={selectedPost} />}
        </>
    );
}
