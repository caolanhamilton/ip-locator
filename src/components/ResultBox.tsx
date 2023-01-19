import React from "react";
type Location = {
  country: string;
  region: string;
  timezone: string;
  lat: number;
  lng: number;
};
type IpInfo = {
  ip: string;
  location: Location;
  isp: string;
};
type Props = {
  ipInfo: IpInfo;
};
export default function ResultBox({ ipInfo }: Props) {
  return (
    <div className="absolute top-48 z-40 flex h-96  w-96 flex-col items-center justify-evenly rounded-lg bg-white shadow-lg md:h-40 md:w-3/4 md:flex-row">
      <div className="flex flex-col items-center space-y-2 border-gray-300 md:w-full md:items-start md:border-r md:py-4 md:px-4">
        <h2 className="text-xs font-bold uppercase text-gray-400">
          IP Address
        </h2>
        <p className="font-bold lg:text-xl">{ipInfo?.ip}</p>
      </div>
      <div className="flex flex-col  items-center justify-center space-y-2 border-gray-300 md:w-full md:items-start md:border-r md:py-4 md:px-4">
        <h2 className="text-xs font-bold uppercase text-gray-400">
          Location
        </h2>
        <p className="font-bold lg:text-xl">{ipInfo?.location.country}{", "}{ipInfo?.location.region}</p>
      </div>
      <div className="flex  flex-col items-center justify-center space-y-2 border-gray-300 md:w-full md:items-start md:border-r md:py-2 md:px-4">
        <h2 className="text-xs font-bold uppercase text-gray-400">Timezone</h2>
        <p className="font-bold lg:text-xl">GMT: {ipInfo?.location.timezone}</p>
      </div>
      <div className="flex flex-col items-center justify-center space-y-2 md:w-full md:items-start md:px-4">
        <h2 className="text-xs font-bold uppercase text-gray-400">ISP</h2>
        <p className="font-bold lg:text-xl">{ ipInfo?.isp}</p>
      </div>
    </div>
  );
}
