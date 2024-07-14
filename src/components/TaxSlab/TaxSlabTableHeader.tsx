import { TAX_SLAB_TABLE_HEADERS } from "~/constants/taxSlab";

export default function TaxSlabTableHeader() {
  return (
    <tr className="bg-gray-200 text-sm uppercase leading-normal text-gray-600">
      {TAX_SLAB_TABLE_HEADERS.map(({ id, label }) => (
        <th key={id} className="px-6 py-3 text-left">
          {label}
        </th>
      ))}
    </tr>
  );
}
