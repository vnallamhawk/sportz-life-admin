

import Image from "next/image";
import User from "../../images/user.png";

const CommonList= (props)=> {
  return (
    <>
      <div className="flex justify-between items-center border border-gray-300 rounded-xl p-4 mb-3">
        <div className="flex items-center">
          <Image src={User} className="w-10 h-10 rounded" alt="" />
          <div className="ml-3">
            <div className="font-bold text-sm">Steve Clarion</div>
            <div className="text-sm text-gray-400">Intermediate</div>
          </div>
        </div>
        <div className="text-sm py-1 border-tertiary-700 bg-tertiary-200 text-tertiary-700 font-normal border px-3 rounded-full capitalize">Fee Clear</div>

      </div>
      

    </>
  )
}

export default CommonList