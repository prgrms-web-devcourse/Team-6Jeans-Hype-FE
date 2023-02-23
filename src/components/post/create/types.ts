export interface Values {
  musicInfo: Music;
  selectedGenre: string;
  description: string;
  battleAvailability: boolean;
}

export interface Music {
  trackId: number;
  trackName: string;
  artistName: string;
  artworkUrl100: string;
  previewUrl: string;
}
