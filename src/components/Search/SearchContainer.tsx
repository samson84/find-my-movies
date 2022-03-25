import React from "react";
import { useMovieSearch } from "../../api/tmdb";
import Search from "./Search";

type SearchContainerProps = {
  onTitleClick: (title: string) => void;
};

const SearchContainer = ({ onTitleClick }: SearchContainerProps) => {
  const { isDirty, movies, error, isLoading, performSearch } = useMovieSearch();

  return (
    <Search
      onSearch={performSearch}
      onTitleClick={onTitleClick}
      isLoading={isLoading}
      isDirty={isDirty}
      hasError={error !== undefined}
      movies={movies}
    />
  );
};

export default SearchContainer;
