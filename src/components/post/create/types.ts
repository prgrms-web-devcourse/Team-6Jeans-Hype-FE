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
}

export interface ImageInfo {
  coverart: string;
}
