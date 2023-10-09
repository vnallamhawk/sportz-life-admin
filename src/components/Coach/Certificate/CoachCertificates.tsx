import CardTitle from "~/components/Card/CardTitle";
import Card from "../../Card";
import Textbox from "~/components/Textbox";
import CoachCertificateTableHeader from "./CoachCertificateTableHeader";
import CoachCertificateTableBody from "./CoachCertificateTableBody";
import { useState } from "react";
import { type CoachWithRelations } from "~/types/coach";

export default function CoachCertificate({
  coach,
  displayCertificate,
}: {
  coach: CoachWithRelations;
  displayCertificate: boolean;
}) {
  const [certificates, setCertificates] = useState(coach.certificates);
  const [filterByCertificate, setFilterByCertificate] = useState("");
  const handleFilterByCertificateChange = (filter: string) => {
    setCertificates(
      coach.certificates.filter((cert) => {
        return cert.name.toLowerCase().includes(filter);
      })
    );
    setFilterByCertificate(filter);
  };

  return (
    <Card className={`${displayCertificate ? "" : "hidden"} h-100`}>
      <header className="ml-5 flex justify-between">
        <CardTitle title="CERTIFICATES" />
        <div className="relative mb-3 w-1/3">
          <Textbox
            className={`w-full`}
            value={filterByCertificate}
            setValue={handleFilterByCertificateChange}
            placeHolder="Search by certificate name"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="absolute right-3 top-1 h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
      </header>
      <table className="mt-1 w-full table-auto border-separate border-spacing-y-3 place-self-center">
        <CoachCertificateTableHeader />
        <CoachCertificateTableBody certificates={certificates} />
      </table>
    </Card>
  );
}
