import Card from "~/components/Card";

const tabs = [
  {
    label: "Total Classes Held",
    name: "totalClasses",
    value: "16",
    bgColor: "#404469",
  },
  {
    label: "Present",
    name: "present",
    value: "05",
    bgColor: "#00B65A",
  },
  {
    label: "Absent",
    name: "absent",
    value: "03",
    bgColor: "#BE1A0E",
  },
  {
    label: "Late",
    name: "late",
    value: "04",
    bgColor: "#FFA500",
  },
  {
    label: "Cancelled",
    name: "cancelled",
    value: "04",
    bgColor: "#EDEDED",
  },
];

const StaffDashAttend = () => {
  return (
    <>
      <Card>
        {/*Attendance  */}
        <div>
          <h2>Attendance</h2>
          <div className="mt-8 flex ">
            {tabs?.map((tab, index) => {
              return (
                <div
                  className={`mr-3 flex w-[10rem] gap-3 rounded-xl p-3 bg-[${tab.bgColor}] `}
                  key={index}
                >
                  <div>
                    <p
                      className={`${
                        tab?.label === "Cancelled" ? "text-black" : "text-white"
                      } text-sm `}
                    >
                      {tab?.label}
                    </p>
                    <h1
                      className={`${
                        tab?.label === "Cancelled" ? "text-black" : "text-white"
                      } text-xl `}
                    >
                      {tab?.value}
                    </h1>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
      <div className="flex justify-center">
        {/* Calendar View */}
        <Card className="flex flex-col">
          <h1>Calendar View</h1>
        </Card>
        {/*Attendance Logs  */}
        <Card className="flex flex-col">
          <h1>Graph View</h1>
        </Card>
      </div>
    </>
  );
};

export default StaffDashAttend;
