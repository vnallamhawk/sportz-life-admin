import Link from "next/link"

export default function CardTitle({ title }: { title: string }) {
  return <div className="flex justify-between items-center">
    <div className="text-2xl mb-5 font-medium font-heading uppercase">{title}</div>
    {/* <Link href="/" className="text-sm !text-gray-400 hover:!text-gray-700 no-underline ">Need help?</Link> */}
    </div>
}
