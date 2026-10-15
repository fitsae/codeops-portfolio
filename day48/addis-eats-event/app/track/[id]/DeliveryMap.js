"use client";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

function FitMap({ points }) {
  const map = useMap();

  useEffect(() => {
    if (points.length > 0) {
      map.fitBounds(points, { padding: [40, 40], maxZoom: 15 });
    }
  }, [map, points]);

  return null;
}

export default function DeliveryMap({ courier, destination }) {
  const courierPosition = [courier.latitude, courier.longitude];
  const destinationPosition = [destination.latitude, destination.longitude];
  const points = [courierPosition, destinationPosition];

  return (
    <MapContainer
      center={courierPosition}
      zoom={14}
      style={{ height: "360px", width: "100%", borderRadius: "10px" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <CircleMarker
        center={courierPosition}
        radius={10}
        pathOptions={{
          color: "#ffffff",
          fillColor: "#7c3aed",
          fillOpacity: 1,
          weight: 3,
        }}
      >
        <Popup>Courier: {courier.name}</Popup>
      </CircleMarker>

      <CircleMarker
        center={destinationPosition}
        radius={10}
        pathOptions={{
          color: "#ffffff",
          fillColor: "#16a34a",
          fillOpacity: 1,
          weight: 3,
        }}
      >
        <Popup>Delivery destination</Popup>
      </CircleMarker>

      <FitMap points={points} />
    </MapContainer>
  );
}
