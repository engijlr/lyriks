import React from "react";

import { Loader, Error, SongCard } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazanCore/shazamCore";
import { useAppSelector } from "../redux/store";
import { Song } from "../redux/services/shazanCore/types";
import { mockData } from "../constants";

const TopCharts = () => {
  const { activeSong, isPlaying } = useAppSelector((state) => state.player);

  const { country } = useAppSelector((state) => state.location);

  const useMockData = true;

  const { data, isFetching, error } = useGetTopChartsQuery(country!);

  const songsData = useMockData ? mockData : data;

  if (isFetching) return <Loader title="Loading top charts" />;

  if (error && !useMockData)
    return <Error message="Could not fetch Top Charts data." />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Discover Top Charts
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songsData?.map((song: Song, i: number) => (
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

export default TopCharts;
