export interface ActorMovie {
  id: number;
  name: string;
  imageUrl: string;
  roleInMovie: string;
}

export interface Actor {
  id: number;
  firstname: string;
  lastname: string;
  birthdate: string;
  movies: ActorMovie[];
}
