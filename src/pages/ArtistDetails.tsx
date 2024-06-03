import React from "react";
import { useParams } from "react-router-dom";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { useGetArtistDetailsQuery } from "../redux/services/shazanCore/shazamCore";
import { useAppSelector } from "../redux/store";

const ArtistDetails = () => {
  const { id: artistId } = useParams<{ id?: string }>();
  const { activeSong, isPlaying } = useAppSelector((state) => state.player);
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error,
  } = useGetArtistDetailsQuery({ artistId });

  if (isFetchingArtistDetails) return <Loader title="Loading artist details" />;

  if (error) return <Error message="Something went wrong" />;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData?.data[0]} />

      <RelatedSongs
        data={artistData?.data[0].views["top-songs"]?.data}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default ArtistDetails;
