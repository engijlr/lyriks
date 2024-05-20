import React from "react";
import { Link } from "react-router-dom";
import { Artist, Song } from "../redux/features/playerSlice";

interface DetailsHeaderProps {
  artistId?: string;
  artistData?: Artist;
  songData?: Song;
}

const DetailsHeader: React.FC<DetailsHeaderProps> = ({
  songData,
  artistId,
  artistData,
}) => {
  const artist = artistData?.attributes;

  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />

      <div className="absolute inset-0 flex items-center">
        <img
          alt="art"
          src={
            artistId
              ? artist?.artwork?.url
                  .replace("{w}", "{500}")
                  .replace("{h}", "500")
              : songData?.images?.coverart
          }
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-lg shadow-black"
        />

        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">
            {artistId ? artist?.name : songData?.name}
          </p>
          {!artistId && (
            <Link
              to={`/artists/${songData?.relationships?.artists.data[0].id}`}
            >
              <p className="text-base text-gray-400 mt-2">
                {songData?.subtitle}
              </p>
            </Link>
          )}

          <p className="text-base text-gray-400 mt-2">
            {artistId ? artist?.genreNames[0] : songData?.genres?.primary}
          </p>
        </div>
      </div>
      <div className="w-full sm:h-44 h-24" />
    </div>
  );
};

export default DetailsHeader;
