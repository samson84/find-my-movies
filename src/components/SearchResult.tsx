import {
  Stack,
  Typography as T,
  Card,
  CardContent,
  Link,
  Grid,
} from "@mui/material";
import React from "react";
import { Movie } from "../api/tmdb";
import StarBorderIcon from "@mui/icons-material/StarBorder";

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
      <Stack alignItems="strech" direction="row">
        <StarBorderIcon fontSize="small" />
        <T variant="body1" component="span">
          {movie.score}
        </T>
      </Stack>
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
