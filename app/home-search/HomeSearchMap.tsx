"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useMemo, useRef } from "react";
import type { Listing, ListingBounds } from "../lib/data/providers/listings.types";
import { formatListingPrice } from "../lib/data/providers/listings.provider";

const markerStyle =
  "display:inline-flex;align-items:center;justify-content:center;" +
  "background:#111827;color:#ffffff;padding:4px 10px;border-radius:999px;" +
  "font-size:12px;font-weight:600;box-shadow:0 8px 18px rgba(0,0,0,0.2);" +
  "cursor:pointer;" +
  "border:1px solid rgba(255,255,255,0.2);";

function getMarkerIcon(price: number) {
  return L.divIcon({
    className: "listing-price-marker",
    html: `<div style="${markerStyle}">${formatListingPrice(price)}</div>`,
  });
}

function MapEvents({
  onBoundsChange,
}: {
  onBoundsChange: (bounds: ListingBounds) => void;
}) {
  const hasInitialized = useRef(false);
  const map = useMapEvents({
    moveend: () => {
      if (!hasInitialized.current) {
        hasInitialized.current = true;
        return;
      }
      const bounds = map.getBounds();
      onBoundsChange({
        north: bounds.getNorth(),
        south: bounds.getSouth(),
        east: bounds.getEast(),
        west: bounds.getWest(),
      });
    },
    zoomend: () => {
      if (!hasInitialized.current) {
        hasInitialized.current = true;
        return;
      }
      const bounds = map.getBounds();
      onBoundsChange({
        north: bounds.getNorth(),
        south: bounds.getSouth(),
        east: bounds.getEast(),
        west: bounds.getWest(),
      });
    },
  });

  return null;
}

export default function HomeSearchMap({
  listings,
  center,
  onBoundsChange,
  onSelectListing,
}: {
  listings: Listing[];
  center: [number, number];
  onBoundsChange: (bounds: ListingBounds) => void;
  onSelectListing: (listing: Listing) => void;
}) {
  const markers = useMemo(
    () =>
      listings
        .filter((listing) => listing.lat !== undefined && listing.lng !== undefined)
        .map((listing) => ({
          id: listing.id,
          listing,
          position: [listing.lat!, listing.lng!] as [number, number],
          icon: getMarkerIcon(listing.price),
        })),
    [listings]
  );

  return (
    <MapContainer
      center={center}
      zoom={11}
      scrollWheelZoom
      className="h-full w-full z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEvents onBoundsChange={onBoundsChange} />
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={marker.position}
          icon={marker.icon}
          eventHandlers={{
            click: () => onSelectListing(marker.listing),
          }}
        />
      ))}
    </MapContainer>
  );
}
