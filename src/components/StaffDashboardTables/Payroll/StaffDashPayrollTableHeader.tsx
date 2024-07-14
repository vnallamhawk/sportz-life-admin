import { STAFF_DASH_PAYROLL_TABLE_HEADERS } from "~/constants/staffConstants";
export default function StaffDashPayrollTableHeader() {
  return (
    <tr className="bg-gray-200 text-sm uppercase leading-normal text-gray-600">
      {STAFF_DASH_PAYROLL_TABLE_HEADERS.map(({ id, label }) => (
        <th key={id} className="px-6 py-3 text-left">
          {label}
        </th>
      ))}
    </tr>
  );
}
