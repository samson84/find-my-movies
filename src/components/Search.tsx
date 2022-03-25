import React from "react";
import { Movie } from "../api/tmdb";
import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";
import { Box, Grid, Alert, CircularProgress } from "@mui/material";
import SomethingWentWrong from "./SomethingWentWrong";

type SearchProps = {
  onTitleClick: (title: string) => void;
  onSearch: (query: string) => void;
  isLoading: boolean;
  isDirty: boolean;
  hasError: boolean;
  movies?: Movie[];
};

const NotFound = () => (
  <Alert severity="info">No movies found for this search.</Alert>
);

const Search = ({
  onTitleClick,
  onSearch,
  isDirty,
  isLoading,
  hasError,
  movies,
}: SearchProps) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box sx={{ mb: 2 }}>
          <SearchInput onSearch={onSearch} isDisabled={isLoading} />
        </Box>
      </Grid>
      <Grid item xs={12}>
        {hasError ? (
          <SomethingWentWrong />
        ) : isLoading ? (
          <CircularProgress />
        ) : movies?.length ? (
          <SearchResult movies={movies} onTitleClick={onTitleClick} />
        ) : isDirty ? (
          <NotFound />
        ) : null}
      </Grid>
    </Grid>
  );
};

export default Search;
