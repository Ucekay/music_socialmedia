interface ArtworkObject {
  backgroundColor: string;
  url: URL;
}

export interface Artist {
  artwork: ArtworkObject;
  id: string;
  name: string;
  type: 'artist';
}

export interface Album {
  artistName: string;
  artwork: ArtworkObject;
  id: string;
  title: string;
  type: 'album';
}

export interface Curator {
  artwork: ArtworkObject;
  id: string;
  kind: string;
  name: string;
  type: 'curator';
}

export interface MusicVideo {
  albumTitle: string;
  artistName: string;
  artwork: ArtworkObject;
  id: string;
  title: string;
  type: 'musicVideo';
}
export interface Playlist {
  artwork: ArtworkObject;
  curatorName?: string;
  description?: string;
  id: string;
  name: string;
  type: 'playlist';
}

export interface RadioShow {
  artwork: ArtworkObject;
  id: string;
  name: string;
  type: 'radioShow';
}

export interface RecordLabel {
  artwork: ArtworkObject;
  description: string;
  id: string;
  name: string;
  type: 'recordLabel';
}

export interface Song {
  artistName: string;
  artwork: ArtworkObject;
  id: string;
  title: string;
  type: 'song';
}

export type Suggestion = {
  displayTerm: string;
  id: string;
  searchTerm: string;
};

type RecommendationItem = Album | Playlist | Song;

export type TopSearchResultItem =
  | Artist
  | Album
  | Curator
  | MusicVideo
  | Playlist
  | RadioShow
  | RecordLabel
  | Song;

type Recommendation = {
  id: string;
  title: string;
  items: RecommendationItem[];
  types: ('album' | 'station' | 'playlist')[];
};

export type Recommendations = Recommendation[] | undefined;

export type TopSearchResult = TopSearchResultItem[] | undefined;

export type SearchSuggestions = {
  suggestions: Suggestion[];
  topResults: TopSearchResult;
};
