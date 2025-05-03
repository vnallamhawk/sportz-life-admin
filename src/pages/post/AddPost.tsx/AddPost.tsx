import {useState, ChangeEvent, FormEvent} from 'react'
import Card from '~/components/Card'
import CardTitle from '~/components/Card/CardTitle'
import {Switch} from '@material-tailwind/react'
import {api} from '~/utils/api'
// import {useRouter} from 'next/router'
import {useSession} from 'next-auth/react'

interface FormDataState {
  postTitle: string
  imageLink: string
  postDetails: string
  showPost: boolean
}

export default function AddPost() {
  // const router = useRouter()
  const {data: sessionData} = useSession()

  const uploadImage = api.upload.uploadImage.useMutation()

  const academyId = sessionData?.token
    ? sessionData?.token?.academyId
    : sessionData?.user?.academyId

  const [formData, setFormData] = useState<FormDataState>({
    postTitle: '',
    imageLink: '',
    postDetails: '',
    showPost: true,
  })

  const {mutate: createMutate} = api.post.create.useMutation({
    onSuccess: (response) => {
      return response?.id
    },
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value, type} = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? prev.imageLink : value,
    }))
  }

  const handleFileUpload = (file: File) => {
    if (!file) return

    const fileReader = new FileReader()
    fileReader.onloadend = async () => {
      try {
        const base64String = fileReader.result as string
        const response = await uploadImage.mutateAsync({
          file: base64String,
          filename: file.name,
          mimetype: file.type,
        })

        setFormData((prev) => ({...prev, imageLink: response.url}))
      } catch (err) {
        console.error('Upload failed:', err)
      }
    }
    fileReader.readAsDataURL(file)
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleToggle = () => {
    setFormData((prev) => ({...prev, showPost: !prev.showPost}))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Perform API request here

    createMutate({
      academyId: parseInt(academyId as string),
      title: formData.postTitle,
      imageLink: formData.imageLink,
      postDetails: formData.postDetails,
      showPost: formData.showPost,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  return (
    <div className='bg-s-gray px-6 pb-7'>
      <Card className='relative col-span-12 h-full !rounded-r-none rounded-l-xl bg-white p-0 pt-10 lg:col-span-4'>
        <CardTitle title='Add Post' />
        <div className='text-center font-heading text-3xl font-medium uppercase lg:text-left'>
          Post Details
        </div>
        <form onSubmit={handleSubmit} className='mt-8'>
          <div className='grid grid-cols-1 gap-x-8 gap-y-4 lg:grid-cols-2 lg:gap-y-8'>
            <input
              type='text'
              name='postTitle'
              value={formData.postTitle}
              onChange={handleChange}
              placeholder='Post Title'
              className='h-12 w-full rounded-lg border border-gray-300 pl-5 focus:border-gray-600 focus:outline-none focus:ring-0'
            />
            <div className='relative'>
              <input
                type='text'
                placeholder='Upload Image: Add Image/File'
                readOnly
                className='h-12 w-full rounded-lg border border-gray-300 pl-5 focus:border-gray-600 focus:outline-none focus:ring-0'
                value={formData.imageLink}
              />
              <label className='absolute right-0 top-2.5 h-12 px-3'>
                <input type='file' className='hidden' onChange={handleFileChange} />
                <div className='cursor-pointer rounded-md border border-[#FF9678] px-3.5 text-[#FF9678]'>
                  Add
                </div>
              </label>
            </div>
          </div>

          <div className='mt-8'>
            <textarea
              name='postDetails'
              value={formData.postDetails}
              onChange={handleChange}
              className='min-h-[246px] w-full resize-y rounded-lg border border-solid border-gray-300 px-5 py-2 focus:ring-0'
              placeholder='Post Details'
            ></textarea>
          </div>

          <div className='mt-6'>
            <Switch color='green' checked={formData.showPost} onChange={handleToggle} />
            <span className='ml-5 text-sm'>Show Post</span>
          </div>

          <div className='mt-10 text-end'>
            <button
              type='submit'
              className='w-full rounded-full !border-0 bg-mandy-dark px-5 py-3 text-white hover:bg-mandy-dark focus:outline-none focus:ring lg:w-auto lg:rounded lg:py-1.5'
            >
              Add Post
            </button>
          </div>
        </form>
      </Card>
    </div>
  )
}
