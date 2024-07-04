import { useContext, useState } from "react";
import Button from "~/components/Button";
import Card from "~/components/Card";
import CardTitle from "~/components/Card/CardTitle";
import Image from "next/image";
import { prisma } from "~/server/db";
import { type GetServerSidePropsContext } from "next";
import type {
  Batches,
  Centers,
  CoachSportsMaps,
  Coaches,
} from "@prisma/client";
import { type Sports } from "@prisma/client";
import // DATE_TIME_FORMAT,
// NO_DATA,
"~/globals/globals";
// import {
//   type CoachWithRelations,
//   ExperienceLevelEnum,
//   TrainingLevelEnum,
// } from "~/types/coach";
import AddCoachSuccessToast from "~/components/AddCoach/AddCoachSuccessToast";
import { ToastContext } from "~/contexts/Contexts";
// import CoachCertificate from "~/components/Coach/Certificate/CoachCertificates";
// import { dateFormat } from "~/helpers/date";
// import CoachBatch from "~/components/Coach/Batch/CoachBatch";
// import CoachAttendance from "~/components/Coach/Attendance/CoachAttendance";
import router from "next/router";
import { DATE_TIME_FORMAT } from "~/globals/globals";

type Coach = Coaches & {
  CoachSportsMaps: CoachSportsMaps[];
  Centers: Centers;
  Batches: Batches;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context?.params?.id;
  const sports = await prisma.sports.findMany();
  console.log(sports);
  const coach = await prisma.coaches.findUnique({
    where: {
      id: id ? Number(id) : undefined,
    },
    include: {
      CoachSportsMaps: true,
      Centers: true,
      Batches: true,
      // Batches: true,
    },
  });
  // console.log(coach);

  // const batches = await prisma.batches.findMany({
  //   where: {
  //     id: {
  //       in: coach?.batches.map((batch) => batch.batchId),
  //     },
  //   },
  // });
  // const centers = await prisma.center.findMany({
  //   where: {
  //     id: {
  //       in: batches.map((batch) => batch.centerId),
  //     },
  //   },
  // });
  const coachSportsMaps = coach?.CoachSportsMaps as CoachSportsMaps[];
  const centers = coach?.Centers;
  const batches = coach?.Batches as Batches[];

  return {
    props: {
      coach: {
        ...coach,
        createdAt: coach?.createdAt?.toISOString(),
        updatedAt: coach?.updatedAt?.toISOString(),
        dateOfBirth: coach?.dateOfBirth
          ? coach?.dateOfBirth?.toISOString()
          : "",
        CoachSportsMaps: coachSportsMaps?.map((sport) => ({
          ...sport,
          createdAt: sport?.createdAt ? sport?.createdAt?.toISOString() : "",
          updatedAt: sport?.updatedAt ? sport?.updatedAt?.toISOString() : "",
          deletedAt: sport?.deletedAt ? sport?.deletedAt?.toISOString() : "",
        })),
        Centers: {
          ...centers,
          createdAt: centers?.createdAt
            ? centers?.createdAt?.toISOString()
            : "",
          updatedAt: centers?.updatedAt
            ? centers?.updatedAt?.toISOString()
            : "",
        },
        // Centers: centers?.map((center) => ({
        //   ...center,
        //   createdAt: center?.createdAt ? center?.createdAt.toISOString() : "",
        //   updatedAt: center?.updatedAt ? center?.updatedAt.toISOString() : "",
        // })),

        // certificates: coach?.certificates.map((cert) => ({
        //   ...cert,
        //   startDate: cert.startDate ? dateFormat(cert.startDate) : "",
        //   endDate: cert.endDate ? dateFormat(cert.endDate) : "",
        // })),
        Batches: batches.map((coachBatch) => ({
          ...coachBatch,
          createdAt: coachBatch?.createdAt
            ? coachBatch?.createdAt.toISOString()
            : "",
          updatedAt: coachBatch?.updatedAt
            ? coachBatch?.updatedAt.toISOString()
            : "",
          // batch: batches.find((batch) => batch.id == coachBatch.id),
          // center: centers.find(
          //   (center) =>
          //     center.id ==
          //     batches.find((batch) => batch.id == coachBatch.batchId)?.centerId
          // ),
        })),
      },
      sports: sports.map((sport) => ({
        ...sport,
        createdAt: sport?.createdAt ? sport?.createdAt.toISOString() : "",
        updatedAt: sport?.updatedAt ? sport?.updatedAt.toISOString() : "",
      })),
      // batches: batches,
    },
  };
};

export default function Page({
  coach,
  sports,
}: {
  coach: Coach;
  sports: Sports[];
}) {
  console.log(sports);
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
  console.log(sportsDictionary);
  console.log(coach);

  return (
    <>
      <Card className="h-100 mx-5">
        <header className="flex justify-between">
          <CardTitle title="COACH DETAILS" />
          <Button onClick={() => void router.push(`/edit-coach-${coach.id}`)}>
            Edit Coach
          </Button>
        </header>
        <div className="flex">
          <Image
            className="h-40 w-40 rounded-full"
            src={"/images/rugby.jpg"}
            alt=""
            width="300"
            height="200"
          />
          <div className="w-10/12 px-10">
            <div className="mt-5 font-bold">
              <span> {coach.name} </span>
              <span> ({coach.designation})</span>
            </div>
            <div className="text-orange-400">
              {coach.CoachSportsMaps.map(
                ({ sportId }) => sportsDictionary?.[sportId]
              ).join(" ,")}
            </div>
            <div className="mt-5 flex">
              <div className="about">
                <div className="text-gray-400"> About </div>
                <div className="font-bold text-gray-600">{coach.about}</div>
              </div>
            </div>
            <div className="mt-2 flex justify-between">
              <div className="training-level">
                <div className="text-gray-400"> Training level Expertise </div>
                <div className="font-bold text-gray-600">
                  {coach.trainingLevel}
                </div>
              </div>
              <div className="experience-level">
                <div className="text-gray-400">
                  Years of Coaching Experience{" "}
                </div>
                <div className="font-bold text-gray-600">
                  {coach.experience}
                </div>
              </div>
            </div>
            <div className="mt-2 flex justify-between">
              <div>
                <div className="text-gray-400"> Contact Number </div>
                <div className="font-bold text-gray-600">{coach.phone}</div>
              </div>
              <div>
                <div className="text-gray-400">Email</div>
                <div className="font-bold text-gray-600">{coach.email}</div>
              </div>
              <div>
                <div className="text-gray-400">DOB</div>
                <div className="font-bold text-gray-600">
                  {coach.dateOfBirth
                    ? DATE_TIME_FORMAT.format(new Date(coach.dateOfBirth))
                    : ""}
                </div>
              </div>
              <div>
                <div className="text-gray-400">Gender</div>
                <div className="font-bold text-gray-600">{coach.gender}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 flex w-10/12 justify-between">
          <div
            className={`w-60 cursor-pointer rounded-lg border-2 border-solid p-5 ${
              displayAttendance ? "border-fuchsia-800" : "border-gray-400"
            }`}
            onClick={handleAttendanceClick}
          >
            <div className="font-bold"> Attendance</div>
            <div className="text-4xl font-bold"> 60%</div>
          </div>
          <div
            className={`w-60 cursor-pointer rounded-lg border-2 border-solid p-5 ${
              displayBatch ? "border-rose-400" : "border-gray-400"
            }`}
            onClick={handleBatchClick}
          >
            <div className="font-bold"> Batches</div>
            <div className="text-4xl font-bold">
              {/* {coach?.Batches?.length ?? NO_DATA} */}
            </div>
          </div>
          <div
            className={`w-60 cursor-pointer rounded-lg border-2 border-solid p-5 ${
              displayCertificate ? "border-indigo-600" : "border-gray-400"
            }`}
            onClick={handleCertificateClick}
          >
            <div className="font-bold"> Certificates</div>
            <div className="text-4xl font-bold">
              {/* {coach?.certificates?.length ?? NO_DATA} */}
            </div>
          </div>
        </div>
        <AddCoachSuccessToast
          open={openToast}
          setOpen={setOpenToast}
        ></AddCoachSuccessToast>
      </Card>
      {/* <CoachCertificate coach={coach} displayCertificate={displayCertificate} />
      <CoachBatch coach={coach} displayBatch={displayBatch} />
      <CoachAttendance coach={coach} displayAttendance={displayAttendance} /> */}
    </>
  );
}
