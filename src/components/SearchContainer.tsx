import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  SEARCH_MOVIE_QUERY,
  SearchMovieQueryVars,
  SearchMovieResult,
} from "../api/tmdb";
import Search from "./Search";

type SearchContainerProps = {
  onTitleClick: (title: string) => void;
};

const SearchContainer = ({ onTitleClick }: SearchContainerProps) => {
  const [dirty, setDirty] = useState(false);
  const [executeSearch, { data, error, loading }] = useLazyQuery<
    SearchMovieResult,
    SearchMovieQueryVars
  >(SEARCH_MOVIE_QUERY);

  const handleSearch = (query: string) => {
    setDirty(true);
    executeSearch({ variables: { query } });
  };

  return (
    <Search
      onSearch={handleSearch}
      onTitleClick={onTitleClick}
      isLoading={loading}
      isDirty={dirty}
      hasError={error !== undefined}
      movies={data?.searchMovies}
    />
  );
};

export default SearchContainer;
