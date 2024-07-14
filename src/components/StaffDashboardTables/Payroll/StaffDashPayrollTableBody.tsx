const tableData = [
  {
    months: "Sunday",
    payroll: "A grade staff payroll-2022",
    salary_date: "Mar 01,2023",
    payment_status: "Paid",
    amount: "$4000.00",
  },
  {
    months: "Sunday",
    payroll: "A grade staff payroll-2022",
    salary_date: "Mar 01,2023",
    payment_status: "Paid",
    amount: "$4000.00",
  },
  {
    months: "Sunday",
    payroll: "A grade staff payroll-2022",
    salary_date: "Mar 01,2023",
    payment_status: "Paid",
    amount: "$4000.00",
  },
  {
    months: "Sunday",
    payroll: "A grade staff payroll-2022",
    salary_date: "Mar 01,2023",
    payment_status: "Paid",
    amount: "$4000.00",
  },
];
export default function StaffDashPayrollTableBody(data = []) {
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
        ({ months, payroll, salary_date, payment_status, amount }, index) => (
          <tr
            key={`${index}`}
            className="cursor-pointer border-b border-gray-200 hover:bg-gray-100"
          >
            <td className="whitespace-nowrap border-y-2 border-solid px-6 py-3 text-left">
              {months}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {payroll}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {salary_date}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {payment_status}
            </td>
            <td className="border-y-2 border-solid px-6 py-3 text-left">
              {amount}
            </td>
          </tr>
        )
      )}
    </>
  );
}
