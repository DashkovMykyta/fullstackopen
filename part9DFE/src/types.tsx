export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}

export interface Entry {
  id: string;
  date: string;
  visibility: Visibility | string;
  weather: Weather | string;
  comment: string;
}

export type EntryFormValues = Omit<Entry, "id">;
