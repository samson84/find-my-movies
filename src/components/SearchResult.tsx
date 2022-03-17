import {
  Stack,
  Paper,
  Typography as T,
  Card,
  CardContent,
  Link,
} from "@mui/material";
import React from "react";
import { Movie, SearchMovieResult } from "../api/tmdb";

type ItemProps = {
  movie: Movie;
};
const Item = ({ movie }: ItemProps) => (
  <Card elevation={2}>
    <CardContent>
      <Link variant="body1" component="button">
        {movie.name}
      </Link>
      <T>{movie.score}</T>
    </CardContent>
  </Card>
);

type SearchResultProps = {
  movies: Movie[];
};
const SearchResult = ({ movies }: SearchResultProps) => (
  <Stack spacing={2}>
    {movies.map((movie) => (
      <Item key={movie.id} movie={movie} />
    ))}
  </Stack>
);

export default SearchResult;
