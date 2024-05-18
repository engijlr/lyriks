import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { setActiveSong, playPause } from "../redux/features/playerSlice";
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from "../redux/services/shazamCore";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: songData,
    isFetchingSongDetails,
    error,
  } = useGetSongDetailsQuery({
    songid,
  });

  if (isFetchingSongDetails) return <Loader title="Searching song details" />;

  if (error) return <Error message="Something went wrong" />;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

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
            lyrics.map((line, i) => (
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
