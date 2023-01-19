import { type NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import type { GetServerSideProps } from "next";

import ResultBox from "../components/ResultBox";
import dynamic from "next/dynamic";
import { useState } from "react";
type Props = {
  initialIp: string;
};

const Home: NextPage<Props> = ({ initialIp }) => {
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
  const [ipInfo, setIpInfo] = useState<IpInfo>({
    ip: "",
    location: { country: "", region: "", timezone: "", lat: 0, lng: 0 },
    isp: "",
  });
  const Map = dynamic(() => import("../components/Map"), {
    ssr: false,
  });

  return (
    <>
      <Head>
        <title>IP Locator</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
          integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
          integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
          crossOrigin=""
        />
      </Head>

      <main className="flex h-screen min-h-screen flex-col items-center justify-center ">
        <Header ipInfo={ipInfo} setIpInfo={setIpInfo} initialIp={initialIp} />
        <Map ipInfo={ipInfo} />
        <ResultBox ipInfo={ipInfo} />
      </main>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let initialIp = req.headers["x-real-ip"] || req.connection.remoteAddress;
  if (!initialIp) {
    const forwardedFor = req.headers["x-forwarded-for"];
    if (Array.isArray(forwardedFor)) {
      initialIp = forwardedFor.at(0);
    } else {
      initialIp = forwardedFor?.split(",").at(0) ?? "Unknown";
    }
  }
  return {
    props: {
      initialIp,
    },
  };
};

export default Home;
