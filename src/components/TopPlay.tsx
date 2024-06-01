import React, { FC, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazanCore/shazamCore";

import "swiper/css";
import "swiper/css/free-mode";
import { Song } from "../redux/services/shazanCore/types";

interface TopChartCardPros {
  song: Song;
  i: number;
  isPlaying: boolean;
  activeSong?: Song | null;
  handlePause: () => void;
  handlePlay: () => void;
}

const TopChartCard: FC<TopChartCardPros> = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePause,
  handlePlay,
}) => {
  return (
    <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
      <h3 className="fot-bold text-base text-white mr-3">{i + 1}</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-20 h-20 rounded-lg"
          src={song?.attributes?.artwork?.url}
          alt={song?.attributes?.name}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link to={`/songs/${song?.id}`}>
            <p className="text-xl font-bold text-white">
              {song?.attributes?.name}
            </p>
          </Link>
          <Link to={`/artists/${song?.relationships?.artists?.data?.[0].id}`}>
            <p className="text-base text-gray-300 mt-1">
              {song?.attributes?.artistName}
            </p>
          </Link>
        </div>
      </div>
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePause}
        handlePlay={handlePlay}
      />
    </div>
  );
};

const TopPlay: FC = () => {
  const { country } = useAppSelector((state) => state.location);
  const dispatch = useAppDispatch();
  const { activeSong, isPlaying } = useAppSelector((state) => state.player);
  const { data } = useGetTopChartsQuery(country || "NO");
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  const topPlays = data?.slice(0, 5);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song: Song, i: number) => {
    dispatch(setActiveSong({ song, i }));
    dispatch(playPause(true));
  };

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song: Song, i: number) => (
            <TopChartCard
              key={song.id}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePause={handlePauseClick}
              handlePlay={() => handlePlayClick(song, i)}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays?.map((song: Song, i: number) => (
            <SwiperSlide
              key={song?.id}
              style={{ width: "25%", height: "auto" }}
              className="shadow-lg rounded-full animate-sliderright"
            >
              <Link
                to={`/artists/${song?.relationships?.artists?.data?.[0].id}`}
              >
                <img
                  src={song?.attributes?.artwork?.url}
                  alt="name"
                  className="rounded-full w-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
