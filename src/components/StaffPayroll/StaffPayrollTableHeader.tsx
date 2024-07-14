import { STAFF_PAYROLL_TABLE_HEADERS } from "~/constants/staffPayroll";

export default function StaffPayrollTableHeader() {
  return (
    <tr className="bg-gray-200 text-sm uppercase leading-normal text-gray-600">
      {STAFF_PAYROLL_TABLE_HEADERS.map(({ id, label }) => (
        <th key={id} className="px-6 py-3 text-left">
          {label}
        </th>
      ))}
    </tr>
  );
}
