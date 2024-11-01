import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../redux/store";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { Song } from "../redux/services/shazanCore/types";

interface SongCardProps {
  song: Song;
  isPlaying: boolean;
  activeSong?: Song | null;
  i: number;
  data: any;
}

const SongCard: FC<SongCardProps> = ({
  song,
  isPlaying,
  activeSong,
  i,
  data,
}) => {
  const dispatch = useAppDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.attributes?.name === song?.attributes?.name
              ? "flex bg-black bg-opacity-70"
              : "hidden"
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img
          className="h-full"
          alt="song_img"
          src={song?.attributes?.artwork?.url || song?.images?.coverart}
        />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song.id}`}>
            {song?.title || song?.attributes?.name}
          </Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link
            to={
              song?.relationships?.artists
                ? `/artists/${song?.relationships?.artists.data?.[0].id}`
                : "/top-artists"
            }
          >
            {song?.subtitle || song?.attributes?.artistName}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
