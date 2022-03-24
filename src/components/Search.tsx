import React from "react";
import { useLazyQuery } from "@apollo/client";
import {
  SEARCH_MOVIE_QUERY,
  SearchMovieQueryVars,
  SearchMovieResult,
} from "../api/tmdb";
import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";
import { Box, Grid } from "@mui/material";

type SearchProps = {
  onTitleClick: (title: string) => void;
};

const Search = ({ onTitleClick }: SearchProps) => {
  const [executeSearch, { data, error, loading }] = useLazyQuery<
    SearchMovieResult,
    SearchMovieQueryVars
  >(SEARCH_MOVIE_QUERY);

  const handleSearch = (query: string) =>
    executeSearch({ variables: { query } });

  if (error) {
    return <p>Error</p>;
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box sx={{ mb: 2 }}>
          <SearchInput onSearch={handleSearch} />
        </Box>
      </Grid>
      <Grid item xs={12}>
        {loading ? (
          <p>loading</p>
        ) : (
          data && (
            <SearchResult
              movies={data.searchMovies}
              onTitleClick={onTitleClick}
            />
          )
        )}
      </Grid>
    </Grid>
  );
};

export default Search;
