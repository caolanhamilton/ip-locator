import React, { useEffect, useState } from "react";
import Image from "next/image";

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
  setIpInfo: React.Dispatch<React.SetStateAction<IpInfo>>;
  initialIp: string;
};

export default function Header({ setIpInfo, initialIp }: Props) {
  const [ip, setIp] = useState("");
  useEffect(() => {
    getLocationInfo(initialIp);
  }, [initialIp]);

  function getLocationInfo(ip: string) {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_X5gLdQErJlYdR4Slze1mNkOTPHqXC&ipAddress=${ip}`
    )
      .then((res) => res.json())
      .then(({ ip, location, isp }: IpInfo) => {
        setIpInfo({
          ip: ip,
          location: {
            country: location.country,
            region: location.region,
            timezone: location.timezone,
            lat: location.lat,
            lng: location.lng,
          },
          isp: isp,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <header className="flex h-2/5 w-full flex-col items-center space-y-4 bg-[url('/pattern-bg.png')] ">
      <h1 className="pt-6 text-4xl font-bold text-white">IP Address Tracker</h1>
      <div className="flex w-full items-center justify-center  px-4 py-4">
        <form
          className="flex h-16 rounded-xl bg-white"
          onSubmit={(e) => {
            e.preventDefault();
            getLocationInfo(ip);
          }}
        >
          <input
            type="text"
            placeholder="Search for any IP address or domain"
            className="w-96 rounded-xl border-none  bg-white py-2 px-6 text-black outline-none"
            onChange={(e) => setIp(e.target.value)}
          />
          <button
            type="submit"
            className="rounded-r-xl bg-black p-4 px-6 hover:bg-slate-500"
          >
            <Image
              src="/icon-arrow.svg"
              width={10}
              height={10}
              alt="arrow pointing right"
            />
          </button>
        </form>
      </div>
    </header>
  );
}
