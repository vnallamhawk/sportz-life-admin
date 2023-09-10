import Button from "~/components/Button";
import Card from "~/components/Card";
import CardTitle from "~/components/Card/CardTitle";
import Image from "next/image";
import { prisma } from "~/server/db";
import { type GetServerSideProps } from "next";
import { type Coach } from "@prisma/client";
import format from "date-fns/format";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const coach = await prisma.coach.findUnique({
    where: {
      id: params?.id ? Number(params?.id) : undefined,
    },
    include: {
      batch: true,
      sports: true,
    },
  });

  return {
    props: {
      coach: {
        ...coach,
        createdAt: coach?.createdAt?.toISOString(),
        updatedAt: coach?.updatedAt?.toISOString(),
        dateOfBirth: coach?.dateOfBirth?.toISOString(),
      },
    },
  };
};

// export const coach = {
//   id: 27,
//   name: "coach94",
//   createdAt: "2023-09-08T05:46:22.701Z",
//   updatedAt: "2023-09-08T05:46:22.701Z",
//   dateOfBirth: "2023-09-07T19:30:00.000Z",
//   contactNumber: "coach94",
//   email: "coach94@gmail.com",
//   designation: "coach94",
//   gender: "MALE",
//   payrollId: null,
//   centerId: null,
//   image: null,
// };

type CoachInfo = Omit<Coach, "dateOfBirth"> & {
  dateOfBirth: string;
};

export default function Page({ coach }: { coach: CoachInfo }) {
  return (
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
          <div className="text-orange-400"> Basket Ball, Volley, Tennis</div>
          <div className="mt-5 flex justify-between">
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
                  ? format(new Date(coach.dateOfBirth), "dd/MM/yyyy")
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
        <div className="w-60 rounded-lg border-2 border-solid border-gray-400 p-5">
          <div className="font-bold"> Batches</div>
          <div className="text-4xl font-bold"> 04</div>
        </div>
        <div className="w-60 rounded-lg border-2 border-solid border-gray-400 p-5">
          <div className="font-bold"> Certificates</div>
          <div className="text-4xl font-bold"> 03</div>
        </div>
      </div>
    </Card>
  );
}
