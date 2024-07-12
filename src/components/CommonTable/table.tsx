
import {
  Typography,
  Button,
  Chip,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import Image from "next/image";
import User from "../../images/user.png";
import Dots from "../../images/dots.svg"
import { Dropdown, DropdownHeader } from "flowbite-react";

const TABLE_HEAD = ["Athlete Name", "Training Level", "Center", "Batch", "Fee Status of the Month", ""];

const TABLE_ROWS = [
  {
    img: User,
    name: "John H. Martin",
    t_level: "Intermediate",
    center: "Biswa Bharati Stadium",
    batch: "Rugby 03 Batch",
    status: "Paid on 5/7/2023",
  },
  {
    img: User,
    name: "Robert G. Lioness",
    t_level: "Advanced",
    center: "Biswa Bharati Stadium",
    batch: "Rugby 03 Batch",
    status: "Due",
  },
  {
    img: User,
    name: "Emille Johnson",
    t_level: "Advanced",
    center: "Biswa Bharati Stadium",
    batch: "Rugby 03 Batch",
    status: "Paid on 5/7/2023",
  },
  {
    img: User,
    name: "John H. Martin",
    t_level: "Beginner ",
    center: "Biswa Bharati Stadium",
    batch: "Rugby 03 Batch",
    status: "Paid on 5/7/2023",
  }
];


export default function () {
  return (
    <>
      <div className="overflow-auto px-0">
        <table className="common-table w-full min-w-max table-auto text-left border-separate border-spacing-y-3">
          <thead>
            <tr>
              <th className="p-4 pb-2 pl-7">
                <input type="checkbox" className="w-5 h-5 rounded border-orange-light text-orange-light focus:ring-0" />
              </th>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="p-4 pb-2"
                >
                  <Typography
                    variant="small"
                    className="font-normal leading-none opacity-70"
                  >

                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(
              (
                {
                  img,
                  name,
                  t_level,
                  center,
                  batch,
                  status,
                },
                index,
              ) => {

                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4 border-y-2 border-gray-100"
                  : "p-4 border-y-2 border-gray-100 ";

                return (
                  <tr key={name} className={``}>
                    <td className={`pl-7 ${classes}`}> <input type="checkbox" className="w-5 h-5 rounded border-orange-light text-orange-light focus:ring-0 " /></td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Image src={User} alt="" className="w-6 h-6 md:w-8 md:h-8 rounded" />
                        <Typography
                          variant="small"
                          className="font-bold"
                        >
                          {name}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-bold"
                      >
                        {t_level}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-bold"
                      >
                        {center}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="font-bold"
                      >
                        {batch}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          size="sm"
                          variant="ghost"
                          value={status}
                          className="border-tertiary-700 bg-tertiary-200 text-tertiary-700 font-normal border px-3 rounded-full capitalize"

                        />
                      </div>
                    </td>
                    <td className={classes}>
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
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-center p-4">
        {/* <Button variant="outlined" size="sm">
          Previous
        </Button> */}
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