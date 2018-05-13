export interface GameItem {
  title: string;
  url: string;
  platform: string;
  score: number;
  genre: string;
  editors_choice: string;
  release_year: string;
}

export interface State {
  data: Array<GameItem> | null;
  isFetching: boolean;
  processedData: Array<GameItem> | null;
}
