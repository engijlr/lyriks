import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Song } from "../services/shazanCore/types";

export interface PlayerState {
  currentSongs?: Song[] | null;
  currentIndex: number;
  isActive: boolean;
  isPlaying: boolean;
  activeSong?: Song | null;
  genreListId: string;
}

const initialState: PlayerState = {
  currentSongs: null,
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: null,
  genreListId: "",
};

interface SetActiveSongPayload {
  song: Song;
  i: number;
}

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setActiveSong: (state, action: PayloadAction<SetActiveSongPayload>) => {
      state.activeSong = action.payload.song;

      state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    nextSong: (state, action: PayloadAction<number>) => {
      if (state?.currentSongs?.[action.payload]) {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    prevSong: (state, action: PayloadAction<number>) => {
      if (state.currentSongs?.[action.payload]) {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    playPause: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },

    selectGenreListId: (state, action: PayloadAction<string>) => {
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
