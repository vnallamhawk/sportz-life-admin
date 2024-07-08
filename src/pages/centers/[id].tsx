import { useContext, useRef, useState } from "react";
import Button from "~/components/Button";
import Card from "~/components/Card";
import CardTitle from "~/components/Card/CardTitle";
import Image from "next/image";
import CoachImg from "../../images/CoachesImg.png";
import BatchImg from "../../images/BatchesImg.png";
import AtheleteImg from "../../images/AthelteImg.png";
import InventoryImg from "../../images/InventoryImg.png";
import { prisma } from "~/server/db";
import { type GetServerSidePropsContext } from "next";
// import type {
//   Batches,
//   Centers,
//   CoachSportsMaps,
//   Coaches,
// } from "@prisma/client";
// import { type Sports } from "@prisma/client";

// import {
//   type CoachWithRelations,
//   ExperienceLevelEnum,
//   TrainingLevelEnum,
// } from "~/types/coach";
import AddCenterSuccessToast from "~/components/AddCenter/AddCenterSuccessToast";
import { ToastContext } from "~/contexts/Contexts";
// import CoachCertificate from "~/components/Coach/Certificate/CoachCertificates";
// import { dateFormat } from "~/helpers/date";
// import CoachBatch from "~/components/Coach/Batch/CoachBatch";
// import CoachAttendance from "~/components/Coach/Attendance/CoachAttendance";
import router from "next/router";
import Table from "~/components/Table";
import CoachTableHeader from "~/components/AllCoaches/CoachTableHeader";
import CoachTableBody from "~/components/AllCoaches/CoachTableBody";
import Search from "~/components/Search";
import Filter from "~/components/Filter/Filter";
import CenterDashCoachTableHeader from "~/components/CenterDashboardTables/Coach/CenterDashCoachTableHeader";
import CenterDashBatchTableHeader from "~/components/CenterDashboardTables/Batch/CenterDashBatchTableHeader";
import CenterDashAthleteTableHeader from "~/components/CenterDashboardTables/Athlete/CenterDashAthleteTableHeader";
import CenterDashInventoryTableHeader from "~/components/CenterDashboardTables/Inventory/CenterDashInventoryTableHeader";
import CenterDashBatchTableBody from "~/components/CenterDashboardTables/Batch/CenterDashBatchTableBody";
import CenterDashCoachTableBody from "~/components/CenterDashboardTables/Coach/CenterDashCoachTableBody";
import CenterDashAthleteTableBody from "~/components/CenterDashboardTables/Athlete/CenterDashAthleteTableBody";
import CenterDashInventoryTableBody from "~/components/CenterDashboardTables/Inventory/CenterDashInventoryTableBody";

// type Coach = Coaches & {
//   CoachSportsMaps: CoachSportsMaps[];
//   Centers: Centers;
//   Batches: Batches;
// };

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const id = context?.params?.id;
//   // const sports = await prisma.sports.findMany();
//   const center = await prisma.centers.findUnique({
//     where: {
//       id: id ? Number(id) : undefined,
//     },
//     // include: {
//     //   // CoachSportsMaps: true,
//     //   Centers: true,
//     //   Batches: true,
//     //   // Batches: true,
//     // },
//   });
//   console.log(center, "coach details");

//   // const batches = await prisma.batches.findMany({
//   //   where: {
//   //     id: {
//   //       in: coach?.batches.map((batch) => batch.batchId),
//   //     },
//   //   },
//   // });
//   // const centers = await prisma.center.findMany({
//   //   where: {
//   //     id: {
//   //       in: batches.map((batch) => batch.centerId),
//   //     },
//   //   },
//   // });
//   // const coachSportsMaps = coach?.CoachSportsMaps as CoachSportsMaps[];
// //   const centers = coach?.Centers;
// //   const batches = coach?.Batches as Batches[];
//   return {
//     props: {
//       center: JSON.parse(JSON.stringify(center)), // <== here is a solution
//     },
//   };
//   // return {
//   //   props: {
//   //     coach: {
//   //       ...coach,
//   //       createdAt: coach?.createdAt?.toISOString(),
//   //       updatedAt: coach?.updatedAt?.toISOString(),
//   //       dateOfBirth: coach?.dateOfBirth
//   //         ? coach?.dateOfBirth?.toISOString()
//   //         : "",
//   //       // CoachSportsMaps: coachSportsMaps?.map((sport) => ({
//   //       //   ...sport,
//   //       //   createdAt: sport?.createdAt ? sport?.createdAt?.toISOString() : "",
//   //       //   updatedAt: sport?.updatedAt ? sport?.updatedAt?.toISOString() : "",
//   //       // })),
//   //       Centers: {
//   //         ...centers,
//   //         createdAt: centers?.createdAt
//   //           ? centers?.createdAt?.toISOString()
//   //           : "",
//   //         updatedAt: centers?.updatedAt
//   //           ? centers?.updatedAt?.toISOString()
//   //           : "",
//   //       },
//   //       // Centers: centers?.map((center) => ({
//   //       //   ...center,
//   //       //   createdAt: center?.createdAt ? center?.createdAt.toISOString() : "",
//   //       //   updatedAt: center?.updatedAt ? center?.updatedAt.toISOString() : "",
//   //       // })),

//   //       // certificates: coach?.certificates.map((cert) => ({
//   //       //   ...cert,
//   //       //   startDate: cert.startDate ? dateFormat(cert.startDate) : "",
//   //       //   endDate: cert.endDate ? dateFormat(cert.endDate) : "",
//   //       // })),
//   //       Batches: batches.map((coachBatch) => ({
//   //         ...coachBatch,
//   //         createdAt: coachBatch?.createdAt
//   //           ? coachBatch?.createdAt.toISOString()
//   //           : "",
//   //         updatedAt: coachBatch?.updatedAt
//   //           ? coachBatch?.updatedAt.toISOString()
//   //           : "",
//   //         // batch: batches.find((batch) => batch.id == coachBatch.id),
//   //         // center: centers.find(
//   //         //   (center) =>
//   //         //     center.id ==
//   //         //     batches.find((batch) => batch.id == coachBatch.batchId)?.centerId
//   //         // ),
//   //       })),
//   //     },
//   //     // sports: sports.map((sport) => ({
//   //     //   ...sport,
//   //     //   createdAt: sport?.createdAt ? sport?.createdAt.toISOString() : "",
//   //     //   updatedAt: sport?.updatedAt ? sport?.updatedAt.toISOString() : "",
//   //     // })),
//   //     // batches: batches,
//   //   },
//   // };
// };

export default function Page({
  center,
  sports,
}: {
  center: Coach;
  sports: Sports[];
}) {
  //   console.log("coach data", coach);
  const sportsDictionary = sports?.reduce(
    (accumulator: Record<number, string>, current) => {
      accumulator[current.id] = current.name;
      return accumulator;
    },
    {}
  );

  const [displayCertificate, setDisplayCertificate] = useState(false);
  const [displayBatch, setDisplayBatch] = useState(false);
  const [displayAttendance, setDisplayAttendance] = useState(false);
  const { openToast, setOpenToast } = useContext(ToastContext);

  const handleCertificateClick = () =>
    setDisplayCertificate(!displayCertificate);
  const handleBatchClick = () => setDisplayBatch(!displayBatch);
  const handleAttendanceClick = () => setDisplayAttendance(!displayAttendance);
  const sportsArr: string[] = ["Rugby", "Baseball", "Tennis", "BasketBall"];
  const [filterByName, setFilterByName] = useState("");
  const [loading, setLoading] = useState(true);
  const handleIsLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };
  const [show, setShow] = useState({
    coaches: false,
    batches: true,
    athelete: false,
    inventory: false,
  });
  const handleClick = (e: any) => {
    console.log("e.target", e.currentTarget);
  };
  return (
    <>
      <Card className="h-100 mx-5">
        <header className="flex justify-between">
          <CardTitle title="CENTER DETAILS" />
          <Button onClick={() => void router.push(`/edit-center-${center.id}`)}>
            Edit Center
          </Button>
        </header>
        <div className="flex">
          <Image
            className=" mt-5 h-[150px] w-[150px] rounded-xl"
            src={"/images/rugby.jpg"}
            alt=""
            width="200"
            height="150"
          />
          <div className="w-10/12 px-10">
            <div className="mb-2 mt-5  text-lg font-bold">
              {/* <span>{center.name}</span> */}
              <span>NETAJI INDOOR STADIUM</span>
            </div>
            <div className="flex justify-start">
              {/* {coach?.CoachSportsMaps?.map(
                ({ sportId }) => sportsDictionary?.[sportId]
              ).join(" ,")} */}
              {sportsArr.map((ele) => (
                <div className="mr-4 rounded-full bg-[#FEEFF2] px-3 py-2 text-sm">
                  <p className="text-pink-500">{ele}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex gap-4">
              <div className="Contact mr-3">
                <div className="text-sm text-gray-400"> Contact Number </div>
                <div className="font-bold text-gray-600">{"+51234545"}</div>
              </div>

              <div className="Email mr-3">
                <div className=" text-sm text-gray-400"> Email</div>
                <div className="font-bold text-gray-600">{"test@test.com"}</div>
              </div>

              <div className="Location mr-3">
                <div className=" text-sm text-gray-400">Location</div>
                <div className="font-bold text-gray-600">{"57/3 delhi "}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex w-10/12 justify-between">
          <div
            className="flex gap-3 rounded-xl border-[1.5px] border-[#F6EAEF] p-4 hover:border-[2px] hover:border-pink-500"
            onClick={handleClick}
          >
            <div>
              <Image
                className="h-[56px] w-[56px] rounded-lg"
                src={CoachImg}
                alt="Coache Img"
                width={56}
                height={56}
              />
            </div>
            <div>
              <p className="text-[#CF8DA7]">Coaches</p>
              <h1>05</h1>
            </div>
          </div>
          <div
            className="flex gap-3 rounded-xl  border-[2px] border-pink-500 p-4"
            onClick={handleClick}
          >
            <div>
              <Image
                className="h-[56px] w-[56px] rounded-lg"
                src={BatchImg}
                alt="Batches Img"
                width={56}
                height={56}
              />
            </div>
            <div>
              <p className="text-[#F78AA2]">Batches</p>
              <h1>04</h1>
            </div>
          </div>
          <div
            className="flex gap-3 rounded-xl border-[1.5px] border-[#F6EAEF] p-4 hover:border-[2px] hover:border-pink-500"
            onClick={handleClick}
          >
            <div>
              <Image
                className="h-[56px] w-[56px] rounded-lg"
                src={AtheleteImg}
                alt="Athelete Img"
                width={56}
                height={56}
              />
            </div>
            <div>
              <p className="text-[#FFBEAB]">Atheletes</p>
              <h1>66</h1>
            </div>
          </div>
          <div
            className="flex gap-3 rounded-xl border-[1.5px] border-[#F6EAEF] p-4 hover:border-[2px] hover:border-pink-500"
            onClick={handleClick}
          >
            <div>
              <Image
                className="h-[56px] w-[56px] rounded-lg"
                src={InventoryImg}
                alt="Invnetory Img"
                width={56}
                height={56}
              />
            </div>
            <div>
              <p className="text-[#A7AAC9]">Inventories</p>
              <h1>15</h1>
            </div>
          </div>
        </div>
        <AddCenterSuccessToast
          open={openToast}
          setOpen={setOpenToast}
        ></AddCenterSuccessToast>
      </Card>
      {/* <CoachCertificate coach={coach} displayCertificate={displayCertificate} />
      <CoachBatch coach={coach} displayBatch={displayBatch} />
      <CoachAttendance coach={coach} displayAttendance={displayAttendance} /> */}

      {/* Table dikhate hai */}
      <Card className="h-100 mx-5 mt-5">
        {/* Header */}
        <header className="flex justify-between">
          <CardTitle
            title={
              show.batches
                ? "All Batches"
                : show.coaches
                ? "All Coaches"
                : show.athelete
                ? " All Athelte"
                : " All Inventory"
            }
          />
          <div className="flex justify-center align-middle">
            <Search pos="right" />

            {/* filter ka div */}
            <Filter />

            {/* Button */}
            {show.batches && (
              <Button
                className="ml-3 bg-[#F3476D] p-2 text-white"
                onClick={() => {}}
              >
                Add New Batch
              </Button>
            )}
          </div>
        </header>

        {/* Coach Table */}
        {show.coaches && (
          <Table
            tableHeader={CenterDashCoachTableHeader()}
            tableBody={CenterDashCoachTableBody(
              { name: filterByName },
              handleIsLoading
            )}
          />
        )}

        {/* Batch Table */}
        {show.batches && (
          <Table
            tableHeader={CenterDashBatchTableHeader()}
            tableBody={CenterDashBatchTableBody(
              { name: filterByName },
              handleIsLoading
            )}
          />
        )}

        {/* Athelete Table */}
        {show.athelete && (
          <Table
            tableHeader={CenterDashAthleteTableHeader()}
            tableBody={CenterDashAthleteTableBody(
              { name: filterByName },
              handleIsLoading
            )}
          />
        )}

        {/* Inventory Table */}
        {show.inventory && (
          <Table
            tableHeader={CenterDashInventoryTableHeader()}
            tableBody={CenterDashInventoryTableBody(
              { name: filterByName },
              handleIsLoading
            )}
          />
        )}
      </Card>
    </>
  );
}
