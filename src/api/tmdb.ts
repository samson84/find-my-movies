import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  gql,
} from "@apollo/client";

const httpLink = createHttpLink({
  uri: "https://tmdb.sandbox.zoosh.ie/dev/grphql",
});

export const tmdbClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export interface SearchMovieQueryVars {
  query: string;
}

export interface SearchMovieResult {
  searchMovies: Movie[];
}

export type Movie = {
  id: string;
  name: string;
  score: number;
  genres: { id: string; name: string }[];
};

export const SEARCH_MOVIE_QUERY = gql`
  query SearchMovies($query: String!) {
    searchMovies(query: $query) {
      id
      name
      score
      genres {
        id
        name
      }
    }
  }
`;
