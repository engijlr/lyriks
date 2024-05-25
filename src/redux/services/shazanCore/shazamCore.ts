import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Song } from "./types";

interface GenreCountryQuery {
  genre: string;
  country: string;
}

interface SongIdQuery {
  songid?: string;
}

interface ArtistIdQuery {
  artistId?: string;
}

interface SearchTermQuery {
  searchTerm?: string;
}

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        //@ts-expect-error
        import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY as string
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query<Song[], string>({
      query: (country) => `/v1/charts/world?country_code=${country}`,
    }),
    getSongsByGenre: builder.query<any, GenreCountryQuery>({
      query: ({ genre, country }) =>
        `/v1/charts/genre-world?genre_code=${genre}&country_code=${country}`,
    }),
    getSongDetails: builder.query<any, SongIdQuery>({
      query: ({ songid }) => `/v2/tracks/details?track_id=${songid}`,
    }),
    getSongRelated: builder.query<any, SongIdQuery>({
      query: ({ songid }) => `/v2/tracks/similarities?track_id=${songid}`,
    }),
    getArtistDetails: builder.query<any, ArtistIdQuery>({
      query: ({ artistId }) => `/v2/artists/details?artist_id=${artistId}`,
    }),
    getSongsByCountry: builder.query<any, string>({
      query: (country) => `/v1/charts/country?country_code=${country}`,
    }),
    getSongsBySearch: builder.query<any, SearchTermQuery>({
      query: ({ searchTerm }) =>
        `/v1/search/multi?query=${searchTerm}&search_type=SONGS_ARTISTS`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
} = shazamCoreApi;
