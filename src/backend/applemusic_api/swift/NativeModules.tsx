import { requireNativeModule } from 'expo-modules-core';

export const RequestAuthorization = requireNativeModule('requestAuthorization');
export const getAuthorizationStatus = requireNativeModule(
  'getAuthorizationStatus',
);
export const getSubscriptionStatus = requireNativeModule(
  'getSubscriptionStatus',
);
export const setDeveloperToken = requireNativeModule('setDeveloperToken');
export const SearchAll = requireNativeModule('SearchAll');
export const SearchMusic = requireNativeModule('SearchMusic');
export const GetInformationDetails = requireNativeModule(
  'GetInformationDetails',
);
export const CreatePlaylist = requireNativeModule('createPlaylist');
export const GetPlaylists = requireNativeModule('getPlaylists');
export const AddMusicToPlaylist = requireNativeModule('addMusicToPlaylist');
export const EditPlaylist = requireNativeModule('editPlaylist');
export const Play = requireNativeModule('play');
export const Stop = requireNativeModule('stop');
export const NextTrack = requireNativeModule('NextTrack');
export const Previous = requireNativeModule('Previous');
export const TopChart = requireNativeModule('fetchTopCharts');
export const PersonalizedChart = requireNativeModule(
  'fetchPersonalizedRecommendations',
);
