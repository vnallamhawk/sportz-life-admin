const tableData = [
  {
    days: "Sunday",
    shift_name: "Morning Shift",
    centerName: "netaji Stadium",
    shift_start_time: "5:30 AM",
    shift_end_time: "8:30 PM",
  },
  {
    days: "Sunday",
    shift_name: "Morning Shift",
    centerName: "netaji Stadium",
    shift_start_time: "5:30 AM",
    shift_end_time: "8:30 PM",
  },
  {
    days: "Sunday",
    shift_name: "Morning Shift",
    centerName: "netaji Stadium",
    shift_start_time: "5:30 AM",
    shift_end_time: "8:30 PM",
  },
  {
    days: "Sunday",
    shift_name: "Morning Shift",
    centerName: "netaji Stadium",
    shift_start_time: "5:30 AM",
    shift_end_time: "8:30 PM",
  },
  {
    days: "Sunday",
    shift_name: "Morning Shift",
    centerName: "netaji Stadium",
    shift_start_time: "5:30 AM",
    shift_end_time: "8:30 PM",
  },
];
export default function StaffDashDutyTableBody(data = []) {
  return (
    <>
      {/* {
        data &&
        data.length > 0 &&
        //  tableData?.map(({ name, address, batches, mobile }, index) => (
         data?.map((inventory, index) => (
          <tr
            key={`${inventory?.id}-${index}`}
            className="cursor-pointer border-b border-gray-200 hover:bg-gray-100"
          >
            <td className="whitespace-nowrap border-y-2 border-solid px-6 py-3 text-left">
              {inventory?.Inventories?.name}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {inventory?.quantity}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              Remove
            </td>
          </tr>
        ))} */}
      {tableData?.map(
        (
          { days, shift_name, centerName, shift_start_time, shift_end_time },
          index
        ) => (
          <tr
            key={`${index}`}
            className="cursor-pointer border-b border-gray-200 hover:bg-gray-100"
          >
            <td className="whitespace-nowrap border-y-2 border-solid px-6 py-3 text-left">
              {days}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {shift_name}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {centerName}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {shift_start_time}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {shift_end_time}
            </td>
          </tr>
        )
      )}
    </>
  );
}
