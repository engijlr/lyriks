import React from "react";
import { Song } from "../../redux/services/shazanCore/types";

interface TrackProps {
  isPlaying: boolean;
  isActive: boolean;
  activeSong?: Song | null;
}

const Track: React.FC<TrackProps> = ({ isPlaying, isActive, activeSong }) => (
  <div className="flex-1 flex items-center justify-start">
    <div
      className={`${
        isPlaying && isActive ? "animate-[spin_3s_linear_infinite]" : ""
      } hidden sm:block h-16 w-16 mr-4`}
    >
      <img
        src={activeSong?.attributes?.artwork?.url}
        alt="cover art"
        className="rounded-full"
      />
    </div>
    <div className="w-[50%]">
      <p className="truncate text-white font-bold text-lg">
        {activeSong?.attributes?.name
          ? activeSong?.attributes?.name
          : "No active Song"}
      </p>
      <p className="truncate text-gray-300">
        {activeSong?.attributes?.artistName
          ? activeSong?.attributes?.artistName
          : "No active Song"}
      </p>
    </div>
  </div>
);

export default Track;
