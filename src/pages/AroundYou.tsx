import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Loader, Error, SongCard } from "../components";
import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";

const AroundYou = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { country } = useSelector((state) => state.location);

  const { data, isFetching, error } = useGetSongsByCountryQuery(country);

  if (isFetching) return <Loader text="Loading songs around you" />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around You <span className="font-black">{country}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
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

export default AroundYou;
