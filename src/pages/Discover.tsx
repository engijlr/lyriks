import React from "react";

import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";

import { useGetSongsByGenreQuery } from "../redux/services/shazamCore";
import { Song, selectGenreListId } from "../redux/features/playerSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

const Discover = () => {
  const dispatch = useAppDispatch();
  const { activeSong, isPlaying, genreListId } = useAppSelector(
    (state) => state.player
  );
  const { country } = useAppSelector((state) => state.location);

  const { data, isFetching, error } = useGetSongsByGenreQuery({
    genre: genreListId || "POP",
    country: country || "NO",
  });

  if (isFetching) return <Loader title="Loading songs..." />;

  if (error) return <Error message="Server failed" />;

  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h2>
        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId || "pop"}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song: Song, i: number) => (
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

export default Discover;
