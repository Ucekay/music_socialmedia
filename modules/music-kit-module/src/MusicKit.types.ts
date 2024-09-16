type ArtworkObject = {
  backgroundColor: string;
  url: string;
};

type Item = {
  artwork: ArtworkObject;
  id: string;
  name?: string;
  type: 'album' | 'station' | 'playlist';
  curatorName?: string;
  artistName?: string;
  title?: string;
};

type Recommendation = {
  id: string;
  title: string;
  items: Item[];
  types: ('album' | 'station' | 'playlist')[];
};

export type Recommendations = Recommendation[] | undefined;
