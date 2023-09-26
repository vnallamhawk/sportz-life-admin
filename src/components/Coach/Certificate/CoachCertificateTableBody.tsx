import { Certificates } from "@prisma/client";

export default function CoachCertificateTableBody({
    certificates
} : {
    certificates: Certificates[]
}) {
    const tableItems = certificates?.map( cert =>
        <tr 
            className="h-14 text-gray-600 font-bold w-full"
            key={ cert.id }>
            <td className="rounded-l-lg border-l-2 border-y-2 border-solid pl-5">{ cert.name }</td>
            <td className="border-y-2 border-solid">{ cert.instituteName }</td>
            <td className="border-y-2 border-solid">{ cert.startEnd?.toString() }</td>
            <td className="rounded-r-lg border-r-2 border-y-2 border-solid">{ cert.endDate?.toString() }</td>
        </tr>
    );

    return (
        <tbody>
            { tableItems }
        </tbody>
    )
}