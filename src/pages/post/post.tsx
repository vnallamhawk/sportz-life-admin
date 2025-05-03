import Image from 'next/image'
import Card from '~/components/Card'
import SearchIcon from '../../images/search.png'
import Link from 'next/link'
// import User from '../../images/user.png'
// import {Dropdown} from 'flowbite-react'
// import Dots from '../../images/dots.svg'
import {IconButton} from '@material-tailwind/react'
import PostDetail from './postDetail'
// import {useSession} from 'next-auth/react'
import {api} from '~/utils/api'
import {useEffect, useState} from 'react'

type PostType = {
  id: number
  academyId: number
  title: string
  imageLink: string
  postDetails: string
  showPost: boolean
  createdAt: string
  deletedAt: string | null
  updatedAt: string
}

export default function Post() {
  // const {data: sessionData} = useSession()

  // const academyId = sessionData?.token
  //   ? sessionData?.token?.academyId
  //   : sessionData?.user?.academyId

  // Ensure correct typing for API response
  const {data: postsData} = api.post.getAll.useQuery<{postsData: PostType[]}>()

  const [selectedPost] = useState<PostType | null>(null)
  // const [setPreviewUrls] = useState<{[key: number]: string}>({})

  useEffect(() => {
    if (postsData) {
      const previews: {[key: number]: string} = {}
      // @ts-expect-error fix this later
      postsData.forEach((post: PostType) => {
        if (post.imageLink.startsWith('uploads/')) {
          fetch(`/${post.imageLink}`)
            .then((response) => response.blob())
            .then((blob) => {
              previews[post.id] = URL.createObjectURL(blob)
              // setPreviewUrls((prev) => ({...prev, ...previews}))
            })
            .catch((err) => console.error('Failed to fetch image:', err))
        }
      })
    }
  }, [postsData])

  return (
    <>
      <div className='bg-s-gray px-6 pb-7'>
        <Card className='rounded-2xl shadow-sm lg:bg-white lg:p-6'>
          <div className='mb-14 flex items-center justify-between'>
            <div className='font-heading text-2xl font-medium uppercase'>All Posts</div>
            <div className='hidden items-center lg:flex'>
              <div className='relative'>
                <Image
                  width={20}
                  height={20}
                  src={SearchIcon}
                  className='absolute right-3 top-2 z-10'
                  alt='Search'
                />
                <input
                  type='search'
                  className='relative w-full rounded-lg border-2 border-gray-200 bg-transparent py-2 pl-4 pr-12 text-base text-gray-700 placeholder-gray-300 focus:border-gray-400 focus:outline-none focus:ring-0 2xl:min-w-[450px]'
                  placeholder='Search by name'
                />
              </div>
              <Link href='/post/AddPost'>
                <button className='ml-3 rounded-lg bg-mandy-dark px-6 py-2.5 text-white'>
                  Add Post
                </button>
              </Link>
            </div>
          </div>

          {/* Dynamic Posts Grid */}

          {/* Pagination (Placeholder) */}
          <div className='mt-6 flex items-center justify-center p-4'>
            <div className='flex items-center gap-2'>
              <IconButton variant='outlined' size='sm' className='mx-1'>
                1
              </IconButton>
              <IconButton variant='text' size='sm' className='mx-1 bg-gray-700 text-white'>
                2
              </IconButton>
              <IconButton variant='text' size='sm' className='mx-1 bg-gray-700 text-white'>
                3
              </IconButton>
            </div>
          </div>
        </Card>
      </div>
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  )
}
