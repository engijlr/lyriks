import React, { FC } from "react";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { Song } from "../redux/services/shazanCore/types";

interface PlayPauseProps {
  isPlaying: boolean;
  activeSong?: Song | null;
  song?: Song | null;
  handlePause?: () => void;
  handlePlay?: () => void;
}

const PlayPause: FC<PlayPauseProps> = ({
  isPlaying,
  activeSong,
  song,
  handlePause,
  handlePlay,
}) =>
  isPlaying && activeSong?.attributes?.name === song?.attributes?.name ? (
    <FaPauseCircle size={35} className="text-gray-300" onClick={handlePause} />
  ) : (
    <FaPlayCircle size={35} className="text-gray-300" onClick={handlePlay} />
  );

export default PlayPause;
