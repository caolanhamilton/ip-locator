import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
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
export default function Map({ ipInfo }: Props) {
  console.log(ipInfo);
  return (
    <MapContainer
      center={[ipInfo.location.lat || 53, ipInfo.location.lng || 42]}
      zoom={10}
      scrollWheelZoom={false}
      className="z-10 h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}></Marker>
    </MapContainer>
  );
}
