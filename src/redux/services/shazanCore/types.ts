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
    albumName?: string;
    artwork?: {
      url?: string;
    };
    previews?: { url: string }[];
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
    artists?: {
      data?: Artist[];
    };
  };
  track?: {};
}
