// import * as Checkbox from "@radix-ui/react-checkbox";
// import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
// import { HamburgerMenuIcon, CheckIcon } from "@radix-ui/react-icons";
// import { api } from "~/utils/api";
// import { differenceInYears } from "date-fns";
// import { useRouter } from "next/router";
// import { useEffect } from "react";
// import { NO_DATA } from "~/globals/globals";
// import type { Coaches, Sports } from "@prisma/client";
// import type { CoachSportsMaps } from "@prisma/client";

// interface coachTableFilter {
//   name: string;
// }

// type Coach = Coaches & {
//   CoachSportsMaps?: CoachSportsMaps[];
//   sports?:string
// };

// export default function CoachTableBody(
//   filter: coachTableFilter,
//   handleIsLoading: (isLoading: boolean) => void
// ) {
//   let tableData:Coach[]=[]
//   const router = useRouter();

//   const { data: coaches } =
//     filter.name == ""
//       ? api.coach.getAllCoaches.useQuery()
//       : api.coach.getCoachesByName.useQuery(filter);
//   const { data: sports, isLoading } = api.sports.getAllSports.useQuery();

//   if (coaches && sports) {
//     tableData=
//       coaches && coaches.length>0 ?
//        coaches.map((coach: Coach) => {
//         return {
//           ...coach,
//           sports: coach?.CoachSportsMaps?.length
//             ? coach?.CoachSportsMaps?.map(
//                 (sport: CoachSportsMaps) => sports.find((s:Sports) => s.id === sport.sportId)?.name
//               )?.join(",")
//             : "",
//         };
//       }):[];
//   }

//   useEffect(() => {
//     handleIsLoading(isLoading);
//   }, [handleIsLoading, isLoading]);

//   const onClickHandler = (id: number) => {
//     void router.push(`/coach/${id ?? ""}`);
//   };

//   return (
//     <>
//       {tableData?.map((data,index) => (
//           <tr
//             key={`${data?.name}-${index}`}
//             className="cursor-pointer border-b border-gray-200 hover:bg-gray-100"
//             onClick={() => onClickHandler(data?.id)}
//           >
//             <td className="rounded-l-lg border-y-2 border-l-2 border-solid pl-5">
//               <Checkbox.Root className="CheckboxRoot" defaultChecked id="c1">
//                 <Checkbox.Indicator className="CheckboxIndicator">
//                   <CheckIcon />
//                 </Checkbox.Indicator>
//               </Checkbox.Root>
//             </td>
//             <td className="whitespace-nowrap border-y-2 border-solid px-6 py-3 text-left">
//               {data?.name}
//             </td>
//             <td className="border-y-2 border-solid px-6 py-3 text-left">
//               {differenceInYears(new Date(), new Date(data?.dateOfBirth))}
//             </td>
//             <td className="border-y-2 border-solid px-6 py-3 text-left">
//               {data?.designation}
//             </td>
//             <td className="border-y-2 border-solid px-6 py-3 text-left">
//               {data.sports ? data.sports : NO_DATA}
//             </td>
//             <td className="border-y-2 border-solid px-6 py-3 text-left">
//               {data?.gender}
//             </td>
//             <td className="border-y-2 border-solid px-6 py-3 text-left">{`batch`}</td>
//             <td className="border-y-2 border-solid px-6 py-3 text-left">
//               {`${data?.countryCode}${data?.phone as string}`}
//             </td>
//             <td className="rounded-r-lg border-y-2 border-r-2 border-solid px-6 py-3 text-left">
//               <DropdownMenu.Root>
//                 <DropdownMenu.Trigger asChild>
//                   <button className="IconButton" aria-label="Customise options">
//                     <HamburgerMenuIcon />
//                   </button>
//                 </DropdownMenu.Trigger>
//               </DropdownMenu.Root>
//             </td>
//           </tr>
//         )
//       )}
//     </>
//   );
// }
