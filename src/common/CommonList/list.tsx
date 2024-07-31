import Image from "next/image";
import User from "../../images/user.png";

interface CommonList {
  item: { id: number; [key: string]: any };
  onViewClick?: (id: number) => void;
}

const CommonList = ({ item, onViewClick }: CommonList) => {
  return (
    <>
      <div
        className="mb-3 flex items-center justify-between rounded-xl border border-gray-300 p-4"
        onClick={() => {
          if (onViewClick) {
            onViewClick(item?.id);
          }
        }}
      >
        <div className="flex items-center">
          <Image width={0} height={0} src={User} className="h-10 w-10 rounded" alt="" />
          <div className="ml-3">
            <div className="text-sm font-bold">{item?.name}</div>
            {item?.t_level && (
              <div className="text-sm text-gray-400">{item?.t_level}</div>
            )}
          </div>
        </div>
        {item?.status && item?.status != "1" && (
          <div className="rounded-full border border-tertiary-700 bg-tertiary-200 px-3 py-1 text-sm font-normal capitalize text-tertiary-700">
            {item?.status}
          </div>
        )}
      </div>
    </>
  );
};

export default CommonList;
