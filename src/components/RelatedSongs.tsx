import React from "react";

import SongBar from "./SongBar";
import { Song } from "../redux/features/playerSlice";

interface RelatedSongsProps {
  data: Song[];
  isPlaying: boolean;
  activeSong?: Song;
  handlePauseClick?: () => void;
  handlePlayClick?: (song: Song, i: number) => void;
  artistId?: string;
}

const RelatedSongs: React.FC<RelatedSongsProps> = ({
  data,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
  artistId,
}) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-3xl text-white">Related Songs:</h1>

    <div>
      {data?.map((song: Song, i: number) => (
        <SongBar
          key={`${artistId}-${song.id}-${i}`}
          song={song}
          i={i}
          artistId={artistId}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
        />
      ))}
    </div>
  </div>
);

export default RelatedSongs;
