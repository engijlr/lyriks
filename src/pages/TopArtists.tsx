import React from "react";
import { Loader, Error, ArtistCard } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazanCore/shazamCore";
import { useAppSelector } from "../redux/store";
import { Song } from "../redux/services/shazanCore/types";

const TopArtists = () => {
  const { country } = useAppSelector((state) => state.location);

  const { data, isFetching, error } = useGetTopChartsQuery(country!);

  if (isFetching) return <Loader title="Loading top artists" />;

  if (error) return <Error message="Could not fetch Top Artist data." />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Top Artists
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((track: Song) => (
          <ArtistCard key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
