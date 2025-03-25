/* eslint-disable @next/next/no-img-element */
import React, { useContext, useState } from "react";
import Button from "~/components/Button";
import Card from "~/components/Card";
import CardTitle from "~/components/Card/CardTitle";
import Image from "next/image";

import Edit from "../../images/ic_fluent_edit_16_filled.svg";

import { ToastContext } from "~/contexts/Contexts";

import { useRouter } from "next/router";
import Slider from "react-slick";
import type { TabType } from "~/types/common";

// Import required CSS for react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Detail {
  cardTitle: string;
  name?: string;
  editButtonUrl: string;
  editText?: string;
  data: { [key: string]: any };
  details?: { items: { label: string; value: string | any }[] }[];
  tabs: TabType[];
  handleTabClick: any;
  selectedComponent: any;
  selectedTab: string | undefined;
  badgeData?: {
    [key: string]: any;
    Sports?: { name: string; [key: string]: any };
  }[];
  gridColumns?: number;
}

const DetailPage = ({
  cardTitle,
  editButtonUrl,
  editText,
  data,
  details,
  tabs,
  handleTabClick,
  selectedComponent,
  selectedTab,
  badgeData,
  name,
  gridColumns,
}: Detail) => {
  const router = useRouter();
  const [displayCertificate, setDisplayCertificate] = useState(false);
  const [displayBatch, setDisplayBatch] = useState(false);
  const [displayAttendance, setDisplayAttendance] = useState(false);
  const { openToast, setOpenToast } = useContext(ToastContext);
  const [value, onChange] = useState<Value>(new Date());

  const handleCertificateClick = () =>
    setDisplayCertificate(!displayCertificate);
  const handleBatchClick = () => setDisplayBatch(!displayBatch);
  const handleAttendanceClick = () => setDisplayAttendance(!displayAttendance);
  const sportsArr: string[] = ["Rugby", "Baseball", "Tennis", "BasketBall"];
  const [filterByName, setFilterByName] = useState("");
  const [loading, setLoading] = useState(true);
  const [finalTabs, setFinalTabs] = useState(tabs);

  // const settings = {
  //   dots: false,
  //   arrows: false,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: tabs?.length > 4 ? 4.5 : 4,
  //   slidesToScroll: tabs?.length > 4 ? 4.5 : 4,
  //   responsive: [
  //     {
  //       breakpoint: 1200,
  //       settings: {
  //         slidesToShow: 3.5,
  //         slidesToScroll: 3.5,
  //         initialSlide: 1,
  //         infinite: false,
  //       },
  //     },
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         slidesToShow: 2.5,
  //         slidesToScroll: 2.5,
  //         initialSlide: 1,
  //         infinite: false,
  //       },
  //     },
  //   ],
  // };

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(tabs?.length || 4, 4), // Show at most 4 slides
    slidesToScroll: Math.min(tabs?.length || 4, 4),
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Card className="h-100 mx-5 bg-gradient-to-r from-[#2D323D] to-[#141720] md:bg-white md:bg-none">
        <header className="mb-5 hidden items-start  justify-between lg:flex ">
          <CardTitle title={cardTitle} />
          <Button onClick={() => void router.push(editButtonUrl)}>
            <Image
              width={0}
              height={0}
              src={Edit}
              className="mr-2 h-auto w-auto"
              alt=""
            />
            {editText}
          </Button>
        </header>
        <div className="flex flex-col items-center lg:flex-row lg:items-start">
          <div>
            <img
              className="h-[150px] w-[150px] rounded-full object-cover"
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              src={data?.imageUrl ? data?.imageUrl : ""}
              alt="S3 Image"
              width="200"
              height="150"
            />
            {data?.ranking && (
              <div className="mt-8 hidden border border-dashed border-tertiary-700 p-2 lg:block">
                <div className="flex items-center justify-center border border-tertiary-400 bg-tertiary-200 p-2">
                  <div className="mr-3 font-heading text-4xl text-tertiary-700">
                    #{data?.ranking}
                  </div>
                  <div className="w-16  text-base leading-4 text-tertiary-700">
                    Player Ranking
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-3 w-full lg:mt-0 lg:w-10/12 lg:pl-10">
            <div className="text-center font-heading text-3xl font-medium uppercase text-white md:text-black lg:text-start">
              {name ? name : data?.name}
            </div>
            <div className="flex justify-start">
              {badgeData &&
                badgeData.length > 0 &&
                badgeData?.map((ele, index: number) => {
                  return (
                    <div
                      className="mr-4 rounded-full bg-[#FEEFF2] px-3 py-2 text-sm"
                      key={index}
                    >
                      <p className="text-pink-500">{ele?.Sports?.name}</p>
                    </div>
                  );
                })}
            </div>
            <div className="text-center text-base text-white md:text-blush-dark lg:text-start">
              {data?.description}
            </div>
            {data?.ranking && (
              <div className="text-center lg:text-start">
                <div className="mx-auto mt-4 inline-block border border-dashed border-orange-light p-2 lg:mt-8 lg:hidden">
                  <div className="flex items-center justify-center border border-[#FFF9F8] bg-[#FFD2C5] px-2 py-1">
                    <div className="mr-3 font-heading text-4xl text-black">
                      #{data?.ranking}
                    </div>
                    <div className="w-16  text-base leading-4 text-black">
                      Player Ranking
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className={`mt-5 grid grid-cols-3 gap-4`}>
              {details && details.length > 0 && (
                <div
                  className={`col-span-12 flex flex-wrap gap-y-6 text-gray-600 md:grid md:grid-cols-3`}
                >
                  {details.map((row, rowIndex: number) => {
                    return row.items.map(
                      (
                        item: { label: string; value: string | number },
                        index: number
                      ) => {
                        return (
                          <div
                            className="text-center md:col-span-1"
                            key={`${rowIndex}-${index}`}
                          >
                            <div className="mb-1 text-sm text-gray-400">
                              {item.label}
                            </div>
                            <div className="font-bold">{item.value}</div>
                          </div>
                        );
                      }
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="tab-slider mt-8">
          {tabs && tabs.length > 0 ? (
            <Slider {...settings} className="hidden md:block">
              {tabs.map((tab: TabType, index: number) => (
                <div
                  className={`${
                    selectedTab === tab?.key ? "active" : ""
                  }rounded-xl border-[1.5px] border-[#F6EAEF] p-4 hover:border-[2px]`}
                  onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    handleTabClick(tab);
                  }}
                  key={index}
                >
                  <div className="flex items-center">
                    <div>
                      <Image
                        className="h-[56px] w-[56px] rounded-lg"
                        src={tab.image ? tab.image : ""}
                        alt={`${tab.name ? tab.name : ""}_img`}
                        width={56}
                        height={56}
                      />
                    </div>
                    <div className="pl-3">
                      <p className="text-base text-burgundy-light">
                        {tab.label}
                      </p>
                      <div className="font-heading text-5xl leading-10">
                        {tab.value}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <p className="text-center text-gray-500">No tabs available</p>
          )}
        </div>
      </Card>
      {/* <Slider {...settings} className="tab-slider mt-10 block pl-6 md:hidden">
        {tabs?.map((tab: TabType, index: number) => {
          return (
            <div
              className={`rounded-xl bg-[#EAEAEA] `}
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                handleTabClick(tab);
              }}
              key={index}
            >
              <div className="flex items-center justify-center px-3 py-3">
                <div className="pl-3">
                  <p className={`font-heading text-xl text-black`}>
                    {tab?.label}
                    <span className="ml-1">({tab?.value})</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </Slider> */}
      {selectedComponent}
    </>
  );
};

export default DetailPage;
