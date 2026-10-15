"use client";

import dynamic from "next/dynamic";

const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
  ssr: false,
  loading: () => <div className="map-placeholder" aria-label="Loading map" />,
});

export default function MapPanel(props) {
  return <DeliveryMap {...props} />;
}
