import React from "react";
import { useParams } from "react-router-dom";

import { Loader, Error, SongCard } from "../components";
import { useGetSongsBySearchQuery } from "../redux/services/shazanCore/shazamCore";
import { useAppSelector } from "../redux/store";
import { Song } from "../redux/services/shazanCore/types";

const Search = () => {
  const { searchTerm } = useParams();
  console.log(searchTerm);
  const { activeSong, isPlaying } = useAppSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsBySearchQuery({ searchTerm });

  const songs = data?.tracks?.hits?.map((song: Song) => {
    return song.track;
  });

  if (isFetching) return <Loader title="Loading top charts" />;

  if (error) return <Error message="Something went wrong" />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Searching results for <span className="font-black">{searchTerm}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs?.map((song: Song, i: number) => (
          <SongCard
            key={song.id}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
