// import Link from 'next/link'

export default function CardTitle({title, className}: {title: string; className?: string}) {
  return (
    <div className={`flex items-center justify-between ${className ?? ''}`}>
      <div className='mb-5 font-heading text-2xl font-medium uppercase'>{title}</div>
      {/* <Link href="/" className="text-sm !text-gray-400 hover:!text-gray-700 no-underline ">Need help?</Link> */}
    </div>
  )
}
