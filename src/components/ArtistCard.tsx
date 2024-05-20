import React from "react";
import { useNavigate } from "react-router-dom";
import { Song } from "../redux/features/playerSlice";

interface ArtistCardProps {
  track: Song;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ track }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      onClick={() =>
        navigate(`/artists/${track?.relationships?.artists.data[0].id}`)
      }
    >
      <img
        alt="artist"
        src={track?.attributes?.artwork?.url}
        className="w-full h-56 rounded-lg"
      />
      <p className="mt-4 font-semibold text-lg text-white truncate">
        {track?.attributes?.artistName}
      </p>
    </div>
  );
};

export default ArtistCard;
