export interface ValuesType {
  musicInfo: TrackInfo | string;
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
