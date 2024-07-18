
import {
  Typography,
  Button,
  Chip,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import Image from "next/image";
import Dots from "../../images/dots.svg"
import User from "../../images/user.png";

import { Dropdown, DropdownHeader } from "flowbite-react";




const CommonTable= (props: { TABLE_HEAD: any[]; TABLE_ROWS: { img: any; name: any; t_level: any; center: any; batch: any; status: any; }[];rowSelection:boolean;showImage:boolean })=> {
  return (
    <>
      <div className="overflow-auto px-0">
        <table className="common-table w-full min-w-max table-auto text-left border-separate border-spacing-y-3">
          <thead>
            <tr>
              {props?.rowSelection && <th className="p-4 pb-2 pl-7">
                <input type="checkbox" className="w-5 h-5 rounded border-orange-light text-orange-light focus:ring-0" />
              </th>}
              {props?.TABLE_HEAD?.map((head) => (
                <th
                  key={head?.id}
                  className="p-4 pb-2"
                >
                  <Typography
                    variant="small"
                    className="font-normal leading-none opacity-70"
                  >

                    {head?.label}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props?.TABLE_ROWS?.map((data,index) => {

                const isLast = index === props?.TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4 border-y-2 border-gray-100"
                  : "p-4 border-y-2 border-gray-100 ";

                return (
                  <tr key={index} className={``}>
                    {props?.rowSelection &&<td className={`pl-7 ${classes}`}> <input type="checkbox" className="w-5 h-5 rounded border-orange-light text-orange-light focus:ring-0 " /></td>}
                    {props?.TABLE_HEAD?.map((head,columnIndex)=>{
                      return (
<td className={classes} key={columnIndex}>
                      {head?.id!=="status"?head?.id!=="action"?columnIndex==0 &&data?.image &&props?.showImage? <div className="flex items-center gap-3">
                        <Image src={User} alt="" className="w-6 h-6 md:w-8 md:h-8 rounded" />
                        <Typography
                          variant="small"
                          className="font-bold"
                        >
                          {data[head?.id]}
                        </Typography>
                      </div>: <Typography
                        variant="small"
                        className="font-bold"
                      >
                        {data[head?.id]}
                      </Typography>: 
                      <Dropdown label="" dismissOnClick={false} placement="top" className="view-drop bg-black rounded-lg" renderTrigger={() =>     
                        <button className="py-2">
                        <Image src={Dots} alt="" />
                      </button>}>
                      <DropdownHeader>
                          <div className="flex items-center">
                              <button className="mx-1 text-white">Edit</button>
                              <button className="mx-1 text-white">View</button>
                              <button className="mx-1 text-white">Delete</button>
                          </div>
                      </DropdownHeader>                    
                      </Dropdown>                 
                    : <div className="w-max">
                    <Chip
                      size="sm"
                      variant="ghost"
                      value={data?.status}
                      className="border-tertiary-700 bg-tertiary-200 text-tertiary-700 font-normal border px-3 rounded-full capitalize"

                    />
                  </div>}
                    </td>
                      )
                    })}
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-center p-4">
    
        <div className="flex items-center gap-2">
          <IconButton variant="outlined" size="sm" className="mx-1">
            1
          </IconButton>
          <IconButton variant="text" size="sm" className="bg-gray-700 text-white mx-1">
            2
          </IconButton>
          <IconButton variant="text" size="sm" className="bg-gray-700 text-white mx-1">
            3
          </IconButton>
          {/* <IconButton variant="text" size="sm" className="bg-gray-700 text-white">
            ...
          </IconButton>
          <IconButton variant="text" size="sm" >
            8
          </IconButton>
          <IconButton variant="text" size="sm">
            9
          </IconButton>
          <IconButton variant="text" size="sm">
            10
          </IconButton> */}
        </div>
        {/* <Button variant="outlined" size="sm">
          Next
        </Button> */}
      </div>
    </>
  )
}

export default CommonTable