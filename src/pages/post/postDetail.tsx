import {Dropdown} from 'flowbite-react'
import Image from 'next/image'
import Card from '~/components/Card'
import Dots from '../../images/dots.svg'
import User from '../../images/user.png'
// import Posts from "../../images/post-detail.png";
import ArrowLeftBlue from '../../images/arrow-left-blue.svg'

type PostDetailProps = {
  post: {
    id: number
    title: string
    imageLink: string
    postDetails: string
    createdAt: string
  }
}

export default function PostDetail({post}: PostDetailProps) {
  return (
    <div className='bg-s-gray px-6 pb-7'>
      <Card className='rounded-2xl shadow-sm lg:bg-white lg:p-6'>
        <div className='flex items-start justify-between'>
          <button className='hidden items-center lg:flex'>
            <Image width={0} height={0} src={ArrowLeftBlue} className='mr-2 h-auto w-auto' alt='' />
            Back
          </button>
          <div className='m-auto lg:max-w-[645px]'>
            <div className='flex items-center justify-center text-center'>
              <Image width={0} height={0} src={User} className='h-5 w-5 rounded' alt='' />
              <div className='ml-2 text-sm font-medium text-[#6E7280]'>D. Alveraze</div>
            </div>
            <div className='pb-4 pt-6 text-center font-heading text-4xl font-medium'>
              {post.title}
            </div>
            <div className='text-center text-sm font-medium text-[#6E7280]'>
              {new Date(post.createdAt).toLocaleDateString()} at{' '}
              {new Date(post.createdAt).toLocaleTimeString()}
            </div>
            <div className='pt-6 '>
              <Image
                src={post.imageLink}
                alt=''
                width={0}
                height={0}
                sizes='100vw'
                className='h-[231px] w-full rounded-lg object-cover lg:h-[402px]'
              />
            </div>

            <div className='py-4 text-center text-[#5A5A5A]'>{post.postDetails}</div>
          </div>
          <div className='hidden text-right lg:block'>
            <Dropdown
              label='Late'
              dismissOnClick={false}
              placement='left'
              renderTrigger={() => (
                <button className=''>
                  <Image
                    width={0}
                    height={0}
                    src={Dots}
                    className='relative h-auto w-auto rotate-90 transform'
                    alt=''
                  />
                </button>
              )}
              className='post-dropdown-right w-50 rounded-lg border-0 bg-[#303030] p-3 text-white'
            >
              <Dropdown.Item className='text-white hover:bg-black focus:bg-black'>
                Edit Post
              </Dropdown.Item>
              <Dropdown.Item className='text-white hover:bg-black focus:bg-black'>
                Hide Post
              </Dropdown.Item>
              <Dropdown.Item className='text-white hover:bg-black focus:bg-black'>
                Copy Post URL
              </Dropdown.Item>
              <Dropdown.Item className='text-white hover:bg-black focus:bg-black'>
                Delete Post
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </Card>
    </div>
  )
}
