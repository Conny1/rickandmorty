export type ResidentsType = {
  status: string;
  name: string;
  image: string;
  id: string;
  species: string;
  type: string;
  gender: string;

  location: {
    name: string;
    url: string;
  };
  episode: string[];
};
export type LocationType = {
  id: number;
  name: string;
  residents: string[];
  type: string;
  url: string;
};

export type Episodes = {
  name: string;
  air_date: string;
  episode: string;
};

export enum STATUSENUMS {
  DEAD = "Dead",
  ALIVE = "Alive",
  UNKNOWN = "unknown",
}
