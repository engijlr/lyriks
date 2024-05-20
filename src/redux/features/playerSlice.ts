import { createSlice } from "@reduxjs/toolkit";

export interface Artist {
  id: string;
  attributes?: {
    name?: string;
    genreNames: string[];
    artwork?: {
      url: string;
    };
  };
}
export interface Song {
  id?: string;
  attributes?: {
    name?: string;
    artistName?: string;
    albumName: string;
    artwork?: {
      url?: string;
    };
    previews: { url: string }[];
  };
  name?: string;
  artistName?: string;
  albumName?: string;
  title?: string;
  subtitle?: string;
  images?: {
    coverart?: string;
  };
  genres?: {
    primary?: any;
  };
  relationships?: {
    artists: {
      data: Artist[];
    };
  };
  track?: {};
}

export interface PlayerState {
  currentSongs?: Song[];
  currentIndex: number;
  isActive: boolean;
  isPlaying: boolean;
  activeSong?: Song;
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
