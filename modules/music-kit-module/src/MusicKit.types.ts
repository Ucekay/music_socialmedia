interface ArtworkObject {
  backgroundColor: string;
  url: URL;
}

export interface Playlist {
  artwork: ArtworkObject;
  curatorName?: string;
  description?: string;
  id: string;
  lastModifiedDate: string;
  name: string;
  type: 'playlist';
}

interface RecommendationItem {
  artwork: ArtworkObject;
  id: string;
  name?: string;
  type: 'album' | 'station' | 'playlist';
  curatorName?: string;
  artistName?: string;
  title?: string;
}

type Recommendation = {
  id: string;
  title: string;
  items: RecommendationItem[];
  types: ('album' | 'station' | 'playlist')[];
};

export interface Track {
  artistName: string;
  artwork: ArtworkObject;
  id: string;
  title: string;
  type: 'song';
}

export type Recommendations = Recommendation[] | undefined;
