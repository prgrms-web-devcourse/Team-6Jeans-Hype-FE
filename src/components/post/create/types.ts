export interface ValuesType {
  musicInfo: selectedMusicInfo | string;
  description: string;
  battleAvailability: boolean;
}

export interface MusicInfo {
  track: TrackInfo;
}

export interface TrackInfo {
  key: string;
  title: string;
  subtitle: string;
  images: ImageInfo;
  hub: HubInfo;
}

export interface ImageInfo {
  coverart: string;
}

export interface HubInfo {
  actions: ActionInfo[];
}

export interface ActionInfo {
  id: string;
  uri: string;
}

export interface selectedMusicInfo {
  id: string;
  musicTitle: string;
  singerName: string;
  coverArt: string;
  genre: string;
  m4a: string;
}

export interface Loadings {
  isFirst: boolean;
  listLoading: boolean;
  detailLoading: boolean;
}
