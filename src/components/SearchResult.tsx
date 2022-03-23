import { Stack, Typography as T, Card, CardContent, Link } from "@mui/material";
import React from "react";
import { Movie } from "../api/tmdb";

type ItemProps = {
  movie: Movie;
  onTitleClick: (title: string) => void;
};
const Item = ({ movie, onTitleClick }: ItemProps) => (
  <Card elevation={2}>
    <CardContent>
      <Link
        variant="body1"
        component="button"
        onClick={() => onTitleClick(movie.name)}
      >
        {movie.name}
      </Link>
      <T>{movie.score}</T>
    </CardContent>
  </Card>
);

type SearchResultProps = {
  movies: Movie[];
  onTitleClick: (title: string) => void;
};
const SearchResult = ({ movies, onTitleClick }: SearchResultProps) => (
  <Stack spacing={2}>
    {movies.map((movie) => (
      <Item key={movie.id} movie={movie} onTitleClick={onTitleClick} />
    ))}
  </Stack>
);

export default SearchResult;
