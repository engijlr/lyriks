import { createSlice } from "@reduxjs/toolkit";

export interface Artist {
  alias: string;
  id: string;
  adamid: string;
}

export interface SongImages {
  background: string;
  coverart: string;
  coverarthq: string;
  joecolor: string;
}

export interface Song {
  artists: Artist[];
  images: SongImages;
  key: string;
  layout: string;
  subtitle: string;
  title: string;
  type: string;
  url: string;
}

export interface PlayerState {
  currentSongs: Song[];
  currentIndex: number;
  isActive: boolean;
  isPlaying: boolean;
  activeSong: Song | null; // Assuming activeSong can be null if no song is active
  genreListId: string;
}

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreListId: "",
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song;

      if (action.payload?.song?.attributes.previews[0].url) {
        state.currentSongs = action.payload.song;
      } else {
        state.currentSongs = action.payload.song;
      }

      state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    nextSong: (state, action) => {
      if (state.currentSongs[action.payload]?.song) {
        state.activeSong = state.currentSongs[action.payload]?.song;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    prevSong: (state, action) => {
      if (state.currentSongs[action.payload]?.song) {
        state.activeSong = state.currentSongs[action.payload]?.song;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
  },
});

export const {
  setActiveSong,
  nextSong,
  prevSong,
  playPause,
  selectGenreListId,
} = playerSlice.actions;

export default playerSlice.reducer;
