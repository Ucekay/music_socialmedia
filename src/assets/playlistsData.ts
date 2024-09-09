import type { PlaylistDetailType } from '../types';

const playlistsData: PlaylistDetailType[] = [
  {
    playlistID: '12345',
    playlistName: 'Chill Vibes',
    ImageURL: 'https://via.placeholder.com/150?text=Chill+Vibes',
    songs: [
      {
        musicID: '1',
        musicName: 'Song One',
        artistName: 'Artist A',
        artworkURL: 'https://via.placeholder.com/100?text=Song+One',
      },
      {
        musicID: '2',
        musicName: 'Song Two',
        artistName: 'Artist B',
        artworkURL: 'https://via.placeholder.com/100?text=Song+Two',
      },
      {
        musicID: '3',
        musicName: 'Song Three',
        artistName: 'Artist C',
        artworkURL: 'https://via.placeholder.com/100?text=Song+Three',
      },
    ],
  },
  {
    playlistID: '67890',
    playlistName: 'Workout Hits',
    ImageURL: 'https://via.placeholder.com/150?text=Workout+Hits',
    songs: [
      {
        musicID: '4',
        musicName: 'Song Four',
        artistName: 'Artist D',
        artworkURL: 'https://via.placeholder.com/100?text=Song+Four',
      },
      {
        musicID: '5',
        musicName: 'Song Five',
        artistName: 'Artist E',
        artworkURL: 'https://via.placeholder.com/100?text=Song+Five',
      },
      {
        musicID: '6',
        musicName: 'Song Six',
        artistName: 'Artist F',
        artworkURL: 'https://via.placeholder.com/100?text=Song+Six',
      },
    ],
  },
  {
    playlistID: '54321',
    playlistName: 'Relax & Unwind',
    ImageURL: 'https://via.placeholder.com/150?text=Relax+%26+Unwind',
    songs: [
      {
        musicID: '7',
        musicName: 'Song Seven',
        artistName: 'Artist G',
        artworkURL: 'https://via.placeholder.com/100?text=Song+Seven',
      },
      {
        musicID: '8',
        musicName: 'Song Eight',
        artistName: 'Artist H',
        artworkURL: 'https://via.placeholder.com/100?text=Song+Eight',
      },
      {
        musicID: '9',
        musicName: 'Song Nine',
        artistName: 'Artist I',
        artworkURL: 'https://via.placeholder.com/100?text=Song+Nine',
      },
    ],
  },
];

export default playlistsData;
