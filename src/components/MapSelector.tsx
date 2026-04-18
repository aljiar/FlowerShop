'use client';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';
import { Maximize, Minimize } from 'lucide-react';

// Fix para el icono por defecto de Leaflet en Next.js
const customIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41],
});

function SearchField({ setPosition, onLocationSelect }: { setPosition: any, onLocationSelect: any }) {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new (GeoSearchControl as any)({
      provider: provider,
      style: 'bar',
      showMarker: false,
      retainZoomLevel: false,
      animateZoom: true,
      autoClose: true,
      searchLabel: 'Busca una calle, zona o lugar...',
      keepResult: true,
    });

    map.addControl(searchControl);

    const handleShowLocation = (result: any) => {
      if (result && result.location) {
        const lat = parseFloat(result.location.y);
        const lng = parseFloat(result.location.x);
        setPosition({ lat, lng });
        onLocationSelect(lat, lng);
      }
    };

    map.on('geosearch/showlocation', handleShowLocation);

    return () => {
      map.removeControl(searchControl);
      map.off('geosearch/showlocation', handleShowLocation);
    };
  }, [map, setPosition, onLocationSelect]);

  return null;
}

interface MapSelectorProps {
  onLocationSelect: (lat: number, lng: number) => void;
  defaultLocation?: { lat: number; lng: number };
}

export default function MapSelector({ 
  onLocationSelect, 
  defaultLocation = { lat: -17.3935, lng: -66.1570 } // Cochabamba, Bolivia por defecto
}: MapSelectorProps) {
  const [position, setPosition] = useState<{lat: number; lng: number}>(defaultLocation);
  const [isExpanded, setIsExpanded] = useState(false);

  // Informar la posición inicial al menos una vez al cargar
  useEffect(() => {
    onLocationSelect(defaultLocation.lat, defaultLocation.lng);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        onLocationSelect(e.latlng.lat, e.latlng.lng);
      }
    });

    return position === null ? null : (
      <Marker 
        position={position} 
        icon={customIcon} 
        draggable={true}
        eventHandlers={{
          dragend: (e) => {
            const marker = e.target;
            const latlng = marker.getLatLng();
            setPosition(latlng);
            onLocationSelect(latlng.lat, latlng.lng);
          }
        }}
      />
    );
  }

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
    // Forzar redibujado del mapa al cambiar de tamaño para que cargue los tiles
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 200);
  };

  return (
    <div className={isExpanded ? "fixed inset-0 z-[150] bg-background/95 backdrop-blur-sm p-4 md:p-8 flex flex-col animate-in fade-in zoom-in-95 duration-200" : "space-y-2"}>
      
      <div className="flex items-center justify-between mb-2 shrink-0">
        <label className="text-sm font-bold text-foreground/90">
          {isExpanded ? "Mapa a Pantalla Completa" : "Ubicación en el Mapa"} 
          {!isExpanded && <span className="font-normal text-foreground/50 text-xs ml-1">(Busca o mueve el pin)</span>}
        </label>
        <button 
          type="button" 
          onClick={handleToggleExpand}
          className="flex items-center gap-2 p-1.5 px-3 bg-muted hover:bg-primary/20 hover:text-primary rounded-lg transition-colors text-xs font-bold"
        >
          {isExpanded ? (
            <><Minimize className="h-4 w-4" /> Achicar Mapa</>
          ) : (
            <><Maximize className="h-4 w-4" /> Ampliar Mapa</>
          )}
        </button>
      </div>

      <div className={isExpanded 
        ? "flex-1 w-full rounded-2xl overflow-hidden shadow-2xl border border-border relative" 
        : "h-64 w-full rounded-xl overflow-hidden shadow-sm border border-border relative"}
      >
        <MapContainer 
          center={defaultLocation} 
          zoom={14} 
          scrollWheelZoom={true} 
          style={{ height: '100%', width: '100%', zIndex: 0 }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          <LocationMarker />
          <SearchField setPosition={setPosition} onLocationSelect={onLocationSelect} />
        </MapContainer>
      </div>

      {isExpanded ? (
        <div className="shrink-0 mt-4 flex justify-end">
          <button 
            type="button" 
            onClick={handleToggleExpand} 
            className="bg-foreground text-background px-8 py-3 rounded-xl font-bold hover:bg-primary transition-colors shadow-lg"
          >
            Confirmar Ubicación
          </button>
        </div>
      ) : (
        <p className="text-xs text-foreground/50 text-right mt-1">Toca el mapa para afinar la posición</p>
      )}

    </div>
  );
}
