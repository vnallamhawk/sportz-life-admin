import React from "react";
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
  const handleClick = () => {};
  return (
    <>
      <Card>
        {/*Attendance  */}
        <div>
          <h2>Attendance</h2>
          <div className="mt-8 flex w-10/12 justify-between">
            {tabs?.map((tab, index) => {
              return (
                <div
                  className={`flex gap-3 rounded-xl bg-[${tab.bgColor}] `}
                  onClick={handleClick}
                  key={index}
                >
                  <div>
                    <p className="text-[#CF8DA7]">{tab?.label}</p>
                    <h1>{tab?.value}</h1>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid-cols-2">
          {/* Calendar View */}
          <div></div>
          {/*Attendance Logs  */}
          <div></div>
        </div>
      </Card>
    </>
  );
};

export default StaffDashAttend;
