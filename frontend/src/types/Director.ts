export interface DirectorMovie {
  id: number;
  name: string;
  imageUrl: string;
  releaseDate: string;
}

export interface Director {
  id: number;
  firstname: string;
  lastname: string;
  birthdate: string;
  movies: DirectorMovie[];
}
