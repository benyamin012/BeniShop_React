import { useEffect, useRef, useState } from "react";

const LEAFLET_CSS =
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const LEAFLET_JS =
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

let leafletLoadPromise;

function loadLeaflet() {
  if (window.L) return Promise.resolve(window.L);

  if (!leafletLoadPromise) {
    leafletLoadPromise = new Promise((resolve, reject) => {
      if (!document.querySelector('link[data-leaflet-css="true"]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = LEAFLET_CSS;
        link.dataset.leafletCss = "true";
        document.head.appendChild(link);
      }

      const existingScript = document.querySelector(
        'script[data-leaflet-js="true"]',
      );

      if (existingScript) {
        existingScript.addEventListener(
          "load",
          () => resolve(window.L),
          { once: true },
        );
        existingScript.addEventListener(
          "error",
          () => reject(new Error("Could not load the map library.")),
          { once: true },
        );
        return;
      }

      const script = document.createElement("script");
      script.src = LEAFLET_JS;
      script.async = true;
      script.dataset.leafletJs = "true";
      script.onload = () => resolve(window.L);
      script.onerror = () => reject(new Error("Could not load the map library."));
      document.body.appendChild(script);
    });
  }

  return leafletLoadPromise;
}

const DEFAULT_CENTER = [35.699739, 51.338097];

export default function LocationPicker({ value, onChange }) {
  const mapElementRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const onChangeRef = useRef(onChange);
  const [mapError, setMapError] = useState("");

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    let cancelled = false;

    loadLeaflet()
      .then((L) => {
        if (cancelled || !mapElementRef.current || mapRef.current) return;

        const initialCenter =
          value?.lat != null && value?.lng != null
            ? [value.lat, value.lng]
            : DEFAULT_CENTER;

        const map = L.map(mapElementRef.current, {
          center: initialCenter,
          zoom: value ? 15 : 12,
          scrollWheelZoom: true,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors',
        }).addTo(map);

        const marker = L.marker(initialCenter, {
          draggable: true,
          title: "Drag to choose the delivery location",
        }).addTo(map);

        const publishLocation = (latlng) => {
          onChangeRef.current?.({
            lat: Number(latlng.lat.toFixed(6)),
            lng: Number(latlng.lng.toFixed(6)),
          });
        };

        map.on("click", (event) => {
          marker.setLatLng(event.latlng);
          publishLocation(event.latlng);
        });

        marker.on("dragend", () => {
          publishLocation(marker.getLatLng());
        });

        mapRef.current = map;
        markerRef.current = marker;

        if (value?.lat != null && value?.lng != null) {
          marker.setLatLng([value.lat, value.lng]);
        }

        requestAnimationFrame(() => map.invalidateSize());
      })
      .catch((error) => {
        if (!cancelled) {
          console.error("Map initialization failed:", error);
          setMapError(
            "The map could not be loaded. Check your internet connection and try again.",
          );
        }
      });

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
    };
    // The map is initialized once. Selected coordinates are synchronized below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!value || value.lat == null || value.lng == null) return;

    const coordinates = [value.lat, value.lng];
    markerRef.current?.setLatLng(coordinates);
    mapRef.current?.panTo(coordinates);
  }, [value?.lat, value?.lng]);

  return (
    <section className="space-y-2">
      <div>
        <h2 className="text-sm font-semibold sm:text-base">
          Choose delivery location
        </h2>
        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
          Click anywhere on the map or drag the pin to select your delivery
          location.
        </p>
      </div>

      <div className="relative z-0 h-[320px] w-full overflow-hidden rounded-xl border border-gray-200 sm:h-[380px]">
        <div
          ref={mapElementRef}
          className="h-full w-full"
          aria-label="Interactive delivery location map"
        />
      </div>

      {mapError && (
        <p role="alert" className="text-sm text-red-600">
          {mapError}
        </p>
      )}

      {value && value.lat != null && value.lng != null ? (
        <div className="rounded-lg bg-blue-50 p-3 text-xs text-blue-900 sm:text-sm">
          <p className="font-semibold">Selected coordinates</p>
          <p className="mt-1 break-words">
            Latitude: {value.lat} · Longitude: {value.lng}
          </p>
        </div>
      ) : (
        <p className="text-xs text-amber-700 sm:text-sm">
          No location selected yet.
        </p>
      )}
    </section>
  );
}
