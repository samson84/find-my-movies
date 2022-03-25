import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  gql,
  useLazyQuery,
} from "@apollo/client";
import { useState } from "react";

const httpLink = createHttpLink({
  uri: "https://tmdb.sandbox.zoosh.ie/dev/grphql",
});

export const tmdbClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

interface SearchMovieQueryVars {
  query: string;
}

interface SearchMovieResult {
  searchMovies: Movie[];
}

export type Movie = {
  id: string;
  name: string;
  score: number;
  genres: { id: string; name: string }[];
};

const SEARCH_MOVIE_QUERY = gql`
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

export const useMovieSearch = () => {
  const [dirty, setDirty] = useState(false);
  const [executeSearch, { data, error, loading }] = useLazyQuery<
    SearchMovieResult,
    SearchMovieQueryVars
  >(SEARCH_MOVIE_QUERY);

  const performSearch = (query: string) => {
    setDirty(true);
    executeSearch({ variables: { query } });
  };

  return {
    isDirty: dirty,
    movies: data?.searchMovies,
    error,
    isLoading: loading,
    performSearch,
  };
};
