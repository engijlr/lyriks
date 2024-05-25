import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Error, Loader } from "../components";

import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery } from "../redux/services/shazanCore/shazamCore";
import { useAppSelector } from "../redux/store";

const SongDetails = () => {
  const { songid } = useParams();
  const {
    data: songData,
    isFetching: isFetchingSongDetails,
    error,
  } = useGetSongDetailsQuery({
    songid,
  });

  if (isFetchingSongDetails) return <Loader title="Searching song details" />;

  if (error) return <Error message="Something went wrong" />;

  let lyrics;
  for (let key in songData?.resources.lyrics) {
    if (songData?.resources.lyrics.hasOwnProperty(key)) {
      lyrics = songData?.resources.lyrics[key].attributes.text;
    }
  }

  let songName;
  for (let key in songData?.resources["shazam-songs"]) {
    if (songData?.resources["shazam-songs"].hasOwnProperty(key)) {
      songName = songData?.resources["shazam-songs"][key].attributes.title;
    }
  }

  return (
    <div className="flex flex-col">
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">{songName}</h2>
        <div className="mt-5">
          {lyrics ? (
            lyrics.map((line: string, i: number) => (
              <p className="text-gray-400 text-base my-1" key={i}>
                {line}
              </p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">
              Sorry, no lyrics found!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SongDetails;
