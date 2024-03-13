import React, { FC } from "react";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { Song } from "../redux/features/playerSlice";

interface PlayPauseProps {
  isPlaying: boolean;
  activeSong: Song;
  song: Song;
  handlePause: () => void;
  handlePlay: () => void;
}

const PlayPause: FC<PlayPauseProps> = ({
  isPlaying,
  activeSong,
  song,
  handlePause,
  handlePlay,
}) =>
  isPlaying && activeSong?.title === song.title ? (
    <FaPauseCircle size={35} className="text-gray-300" onClick={handlePause} />
  ) : (
    <FaPlayCircle size={35} className="text-gray-300" onClick={handlePlay} />
  );

export default PlayPause;
