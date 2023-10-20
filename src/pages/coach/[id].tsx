import { useContext, useState } from "react";
import Button from "~/components/Button";
import Card from "~/components/Card";
import CardTitle from "~/components/Card/CardTitle";
import Image from "next/image";
import { prisma } from "~/server/db";
import { type GetServerSidePropsContext } from "next";
import { type Sports } from "@prisma/client";
import { DATE_TIME_FORMAT, NO_DATA } from "~/globals/globals";
import {
  type CoachWithRelations,
  ExperienceLevelEnum,
  TrainingLevelEnum,
} from "~/types/coach";
import AddCoachSuccessToast from "~/components/AddCoach/AddCoachSuccessToast";
import { ToastContext } from "~/contexts/Contexts";
import CoachCertificate from "~/components/Coach/Certificate/CoachCertificates";
import { dateFormat } from "~/helpers/date";
import CoachBatch from "~/components/Coach/Batch/CoachBatch";
import CoachAttendance from "~/components/Coach/Attendance/CoachAttendance";
import router from "next/router";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context?.params?.id;
  const sports = await prisma.sports.findMany();
  const coach = await prisma.coach.findUnique({
    where: {
      id: id ? Number(id) : undefined,
    },
    include: {
      sports: true,
      certificates: true,
      batches: true,
      centers: true,
    },
  });

  const batches = await prisma.batches.findMany({
    where: {
      id: {
        in: coach?.batches.map((batch) => batch.batchId),
      },
    },
  });
  const centers = await prisma.center.findMany({
    where: {
      id: {
        in: batches.map((batch) => batch.centerId),
      },
    },
  });

  return {
    props: {
      coach: {
        ...coach,
        createdAt: coach?.createdAt?.toISOString(),
        updatedAt: coach?.updatedAt?.toISOString(),
        dateOfBirth: coach?.dateOfBirth
          ? coach?.dateOfBirth?.toISOString()
          : "",
        centers: coach?.centers.map((center) => ({
          ...center,
          assignedAt: center?.assignedAt
            ? center?.assignedAt.toISOString()
            : "",
          updatedAt: center?.updatedAt ? center?.updatedAt.toISOString() : "",
        })),
        sports: coach?.sports.map((sport) => ({
          ...sport,
          assignedAt: sport?.assignedAt ? sport?.assignedAt?.toISOString() : "",
          updatedAt: sport?.updatedAt ? sport?.updatedAt?.toISOString() : "",
        })),
        certificates: coach?.certificates.map((cert) => ({
          ...cert,
          startEnd: cert.startEnd ? dateFormat(cert.startEnd) : "",
          endDate: cert.endDate ? dateFormat(cert.endDate) : "",
        })),
        batches: coach?.batches.map((coachBatch) => ({
          ...coachBatch,
          assignedAt: coachBatch?.assignedAt
            ? dateFormat(coachBatch?.assignedAt)
            : "",
          updatedAt: coachBatch?.updatedAt
            ? dateFormat(coachBatch?.updatedAt)
            : "",
          batch: batches.find((batch) => batch.id == coachBatch.batchId),
          center: centers.find(
            (center) =>
              center.id ==
              batches.find((batch) => batch.id == coachBatch.batchId)?.centerId
          ),
        })),
      },
      sports: sports,
      batches: batches,
    },
  };
};

export default function Page({
  coach,
  sports,
}: {
  coach: CoachWithRelations;
  sports: Sports[];
}) {
  // eslint-disable-next-line no-console
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
  // eslint-disable-next-line no-console
  console.log(coach);

  return (
    <>
      <Card className="h-100 mx-5 flex flex-col justify-between gap-5">
        <header className="flex items-center justify-between">
          <CardTitle title="COACH DETAILS" />
          <div className="flex items-center justify-center gap-2 rounded-lg border-2 bg-pink-600 px-2 text-white hover:border-zinc-400 hover:bg-pink-800">
            <Image
              width="14"
              height="14"
              src="/icons/edit.svg"
              alt="edit icon"
            />
            <Button
              onClick={() => void router.push(`/edit-coach-${coach.id}`)}
              className="border-none px-0"
            >
              Edit Coach
            </Button>
          </div>
        </header>
        <div className="flex items-center">
          <Image
            className="h-40 w-40 rounded-full"
            src={"/images/rugby.jpg"}
            alt=""
            width="300"
            height="200"
          />
          <div className="w-10/12 px-10">
            <div className="mt-5 text-xl font-bold">
              <span className="uppercase"> {coach.name} </span>
              <span> ({coach.designation})</span>
            </div>
            <div className="text-orange-400">
              {coach.sports
                .map(({ sportId }) => sportsDictionary[sportId])
                .join(",")}
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
                  {TrainingLevelEnum[coach.trainingLevel]}
                </div>
              </div>
              <div className="experience-level">
                <div className="text-gray-400">
                  {" "}
                  Years of Coaching Experience{" "}
                </div>
                <div className="font-bold text-gray-600">
                  {ExperienceLevelEnum[coach.experienceLevel]}
                </div>
              </div>
            </div>
            <div className="mt-2 flex justify-between">
              <div>
                <div className="text-gray-400"> Contact Number </div>
                <div className="font-bold text-gray-600">
                  {coach.contactNumber}
                </div>
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
        <div className="mt-5 flex w-full justify-between">
          <div
            className={`w-60 cursor-pointer rounded-2xl border-2 border-solid bg-white p-5 py-5 pr-6 ${
              displayAttendance
                ? "border-pink-800 shadow-md shadow-pink-800"
                : "border-pink-200"
            }`}
            onClick={handleAttendanceClick}
          >
            <div className="flex items-center justify-around">
              <Image
                className="h-10 w-10 rounded-xl bg-pink-800"
                width="15"
                height="5"
                src="/icons/calander.svg"
                alt="attendance icon"
              />
              <div className="flex flex-col items-start justify-around gap-2">
                <div
                  className={`text-lg font-bold ${
                    displayAttendance ? "text-pink-800" : "text-pink-600"
                  }`}
                >
                  {" "}
                  Attendance
                </div>
                <div className="text-4xl font-bold"> 60%</div>
              </div>
            </div>
          </div>
          <div
            className={`w-60 cursor-pointer rounded-2xl border-2 border-solid bg-white p-5 pr-6 ${
              displayBatch
                ? "border-rose-500 shadow-md shadow-rose-500"
                : "border-rose-200"
            }`}
            onClick={handleBatchClick}
          >
            <div className="flex items-center justify-around">
              <Image
                className="h-10 w-10 rounded-xl bg-rose-500"
                width="15"
                height="5"
                src="/icons/batch.svg"
                alt="batch icon"
              />
              <div className="flex flex-col items-start justify-around gap-2">
                <div
                  className={`text-lg font-bold ${
                    displayBatch ? "text-rose-500" : "text-rose-400"
                  }`}
                >
                  {" "}
                  Batches
                </div>
                <div className="text-4xl font-bold">
                  {coach?.batches?.length ?? NO_DATA}
                </div>
              </div>
            </div>
          </div>
          <div
            className={`w-60 cursor-pointer rounded-2xl border-2 border-solid bg-white p-5 pr-6 ${
              displayCertificate
                ? "border-slate-600 shadow-md shadow-slate-600"
                : "border-slate-200"
            }`}
            onClick={handleCertificateClick}
          >
            <div className="flex items-center justify-around">
              <Image
                className="h-10 w-10 rounded-xl bg-slate-600"
                width="15"
                height="5"
                src="/icons/certificate.svg"
                alt="certificate icon"
              />
              <div className="flex flex-col items-start justify-around gap-2">
                <div
                  className={`text-lg font-bold ${
                    displayCertificate ? "text-stone-600" : "text-stone-400"
                  }`}
                >
                  {" "}
                  Certificates
                </div>
                <div className="text-4xl font-bold">
                  {coach?.certificates?.length ?? NO_DATA}
                </div>
              </div>
            </div>
          </div>
        </div>
        <AddCoachSuccessToast
          open={openToast}
          setOpen={setOpenToast}
        ></AddCoachSuccessToast>
      </Card>
      <CoachCertificate coach={coach} displayCertificate={displayCertificate} />
      <CoachBatch coach={coach} displayBatch={displayBatch} />
      <CoachAttendance coach={coach} displayAttendance={displayAttendance} />
    </>
  );
}
