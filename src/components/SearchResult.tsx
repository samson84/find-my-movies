import {
  Stack,
  Typography as T,
  Card,
  CardContent,
  Link,
  Box,
  Chip,
} from "@mui/material";
import React from "react";
import { Movie } from "../api/tmdb";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const Score = ({ score }: { score: number }) => (
  <Stack alignItems="strech" direction="row">
    <StarBorderIcon fontSize="small" />
    <T variant="body1" component="span">
      {score}
    </T>
  </Stack>
);

type GenresProp = {
  genres: Movie["genres"];
};
const Genres = ({ genres }: GenresProp) => (
  <Box component="span">
    {genres.map((genre) => (
      <Chip key={genre.id} variant="outlined" label={genre.name} size="small" />
    ))}
  </Box>
);

type ItemProps = {
  movie: Movie;
  onTitleClick: (title: string) => void;
};
const Item = ({ movie, onTitleClick }: ItemProps) => (
  <Card elevation={2}>
    <CardContent>
      <Stack spacing={1}>
        <Box>
          <Link
            variant="body1"
            component="button"
            onClick={() => onTitleClick(movie.name)}
          >
            <T>{movie.name}</T>
          </Link>
        </Box>
        <Stack direction="row" spacing={1}>
          <Score score={movie.score} />
          <Genres genres={movie.genres} />
        </Stack>
      </Stack>
    </CardContent>
  </Card>
);

type SearchResultProps = {
  movies?: Movie[];
  onTitleClick: (title: string) => void;
};
const SearchResult = ({ movies = [], onTitleClick }: SearchResultProps) => {
  return (
    <Stack spacing={2}>
      {movies.map((movie) => (
        <Item key={movie.id} movie={movie} onTitleClick={onTitleClick} />
      ))}
    </Stack>
  );
};

export default SearchResult;
