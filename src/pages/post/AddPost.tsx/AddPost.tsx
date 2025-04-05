import { useState, ChangeEvent, FormEvent, useCallback } from "react";
import Card from "~/components/Card";
import CardTitle from "~/components/Card/CardTitle";
import { Switch } from "@material-tailwind/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";


interface FormDataState {
  postTitle: string;
  imageLink: string;
  postDetails: string;
  showPost: boolean;
}

export default function AddPost() {
  const router = useRouter();
  const { data: sessionData } = useSession();


  const uploadImage = api.upload.uploadImage.useMutation();

  const academyId = sessionData?.token
    ? sessionData?.token?.academyId
    : sessionData?.user?.academyId;

  const [formData, setFormData] = useState<FormDataState>({
    postTitle: "",
    imageLink: "",
    postDetails: "",
    showPost: true,
  });

  const { mutate: createMutate } = api.post.create.useMutation({
    onSuccess: (response) => {
      console.log("response data is ", response);
      // router.push("/post").then(() => window.location.reload());
      return response?.id;
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? prev.imageLink : value,
    }));
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onloadend = async () => {
      try {
        const base64String = fileReader.result as string;
        const response = await uploadImage.mutateAsync({
          file: base64String,
          filename: file.name,
          mimetype: file.type,
        });

        console.log({ response })
        setFormData((prev) => ({ ...prev, imageLink: response.url }));
      } catch (err) {
        console.error("Upload failed:", err);
      }
    };
    fileReader.readAsDataURL(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleToggle = () => {
    setFormData((prev) => ({ ...prev, showPost: !prev.showPost }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Perform API request here

    createMutate({
      academyId: parseInt(academyId as string),
      title: formData.postTitle,
      imageLink: formData.imageLink,
      postDetails: formData.postDetails,
      showPost: formData.showPost,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  return (
    <div className="px-6 bg-s-gray pb-7">
      <Card className="col-span-12 lg:col-span-4 h-full p-0 pt-10 bg-white rounded-l-xl !rounded-r-none relative">
        <CardTitle title="Add Post" />
        <div className="font-medium uppercase text-3xl font-heading text-center lg:text-left">Post Details</div>
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-8 lg:gap-y-8 gap-y-4">
            <input
              type="text"
              name="postTitle"
              value={formData.postTitle}
              onChange={handleChange}
              placeholder="Post Title"
              className="w-full h-12 rounded-lg border border-gray-300 pl-5 focus:outline-none focus:ring-0 focus:border-gray-600"
            />
            <div className="relative">
              <input
                type="text"
                placeholder="Upload Image: Add Image/File"
                readOnly
                className="w-full h-12 rounded-lg border border-gray-300 pl-5 focus:outline-none focus:ring-0 focus:border-gray-600"
                value={formData.imageLink}
              />
              <label className="absolute top-2.5 right-0 h-12 px-3">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="border-[#FF9678] border text-[#FF9678] px-3.5 rounded-md cursor-pointer">Add</div>
              </label>
            </div>
          </div>

          <div className="mt-8">
            <textarea
              name="postDetails"
              value={formData.postDetails}
              onChange={handleChange}
              className="min-h-[246px] w-full resize-y rounded-lg border border-solid border-gray-300 px-5 py-2 focus:ring-0"
              placeholder="Post Details"
            ></textarea>
          </div>

          <div className="mt-6">
            <Switch color="green" checked={formData.showPost} onChange={handleToggle} />
            <span className="text-sm ml-5">Show Post</span>
          </div>

          <div className="text-end mt-10">
            <button
              type="submit"
              className="!border-0 px-5 py-3 lg:py-1.5 lg:rounded rounded-full bg-mandy-dark hover:bg-mandy-dark focus:outline-none focus:ring text-white w-full lg:w-auto"
            >
              Add Post
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
