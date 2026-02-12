export interface MovieDirector {
  id: number;
  firstname: string;
  lastname: string;
}

export interface MovieActor {
  id: number;
  firstname: string;
  lastname: string;
  roleInMovie: string;
}

export interface MovieReview {
  id: number;
  username: string;
  rating: number;
  comment: string;
}

export interface MovieDetails {
  id: number;
  name: string;
  description: string;
  releaseDate: string;
  imageUrl: string;
  director: MovieDirector;
  actors: MovieActor[];
  reviews: MovieReview[];
}
