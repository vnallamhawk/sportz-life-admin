import { useContext, useState } from 'react';
import Button from "~/components/Button";
import Card from "~/components/Card";
import CardTitle from "~/components/Card/CardTitle";
import Image from "next/image";
import { prisma } from "~/server/db";
import { type GetServerSidePropsContext } from "next";
import {
  type Coach,
  type Certificates,
  type Sports,
  type CoachesOnSports,
} from "@prisma/client";
import { DATE_TIME_FORMAT, NO_DATA } from "~/globals/globals";
import { ExperienceLevelEnum, TrainingLevelEnum, type batchWithCenter } from "~/types/coach";
import AddCoachSuccessToast from "~/components/AddCoach/AddCoachSuccessToast";
import { ToastContext } from '~/contexts/Contexts';
import CoachCertificate from '~/components/Coach/Certificate/CoachCertificates';
import { dateFormat } from '~/helpers/date';
import CoachBatch from '~/components/Coach/Batch/CoachBatch';

export type CoachWithRelations = Coach & {
  certificates: Certificates[];
  sports: CoachesOnSports[];
  batches: batchWithCenter[];
};

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
      centers: true
    },
  });
  const batches = await prisma.batches.findMany({
    where: {
      id: {
        in: coach?.batches.map( batch => batch.batchId)
      }
    }
  });
  const centers = await prisma.center.findMany({
    where: {
      id: {
        in: batches.map( batch => batch.centerId)
      }
    }
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
        sports: coach?.sports.map((sport) => ({
          ...sport,
          assignedAt: sport?.assignedAt ? sport?.assignedAt?.toISOString() : "",
          updatedAt: sport?.updatedAt ? sport?.updatedAt?.toISOString() : "",
        })),
        certificates: coach?.certificates.map( cert => ({
          ...cert,
          startEnd: cert.startEnd ? dateFormat(cert.startEnd) : "",
          endDate: cert.endDate ? dateFormat(cert.endDate) : ""
        })),
        batches: coach?.batches.map( coachBatch => ({
          ...coachBatch,
          assignedAt: coachBatch?.assignedAt ? dateFormat(coachBatch?.assignedAt) : "",
          updatedAt: coachBatch?.updatedAt ? dateFormat(coachBatch?.updatedAt) : "",
          batch: batches.find( batch => batch.id == coachBatch.batchId),
          center: centers.find( center => center.id == batches.find( batch => batch.id == coachBatch.batchId)?.centerId)
        })),
      },
      sports: sports,
      batches: batches,
      centers: centers
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
  const sportsDictionary = sports?.reduce(
    (accumulator: Record<number, string>, current) => {
      accumulator[current.id] = current.name;
      return accumulator;
    },
    {}
  );
  
  const [ displayCertificate, setDisplayCertificate ] = useState(false);
  const [ displayBatch, setDisplayBatch ] = useState(false);
  const { openToast, setOpenToast } = useContext(ToastContext);

  const handleCertificateClick = () => setDisplayCertificate(!displayCertificate);
  const handleBatchClick = () => setDisplayBatch(!displayBatch);
  
  return (
    <>
      <Card className="h-100 mx-5">
        <header className="flex justify-between">
          <CardTitle title="COACH DETAILS" />
          <Button>Edit Coach</Button>
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
        <div className="mt-5 flex w-10/12 justify-between">
          <div className="w-60 rounded-lg border-2 border-solid border-gray-400 p-5">
            <div className="font-bold"> Attendance</div>
            <div className="text-4xl font-bold"> 60%</div>
          </div>
          <div 
            className={`w-60 rounded-lg border-2 border-solid p-5 cursor-pointer ${ displayBatch ? "border-rose-400" : "border-gray-400"}`}
            onClick={ handleBatchClick }>
            <div className="font-bold"> Batches</div>
            <div className="text-4xl font-bold">
              {coach?.batches?.length ?? NO_DATA}
            </div>
          </div>
          <div 
            className={`w-60 rounded-lg border-2 border-solid p-5 cursor-pointer ${ displayCertificate ? "border-indigo-600" : "border-gray-400"}`}
            onClick={ handleCertificateClick }>
            <div className="font-bold"> Certificates</div>
            <div className="text-4xl font-bold">
              {coach?.certificates?.length ?? NO_DATA}
            </div>
          </div>
        </div>
        <AddCoachSuccessToast
          open= { openToast }
          setOpen={ setOpenToast }></AddCoachSuccessToast>
      </Card>
      <CoachCertificate
        coach={ coach }
        displayCertificate={ displayCertificate } />
      <CoachBatch
        coach={ coach }
        displayBatch={ displayBatch } />
    </>
  );
}
