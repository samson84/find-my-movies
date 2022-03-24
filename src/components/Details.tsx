import React from "react";
import { useMovieDetails } from "../api/wikipedia";
import {
  Typography as T,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import SomethingWentWrong from "./SomethingWentWrong";

type DetailsProps = {
  title?: string | null | undefined;
};

const NotFound = () => (
  <Alert severity="info">No movie details found on Wikipedia.</Alert>
);

const Details = ({ title }: DetailsProps) => {
  const { data, error, loading } = useMovieDetails(title);

  if (error) {
    if (error.code === "not_found") {
      return <NotFound />;
    }
    return <SomethingWentWrong />;
  }

  if (loading) {
    return <CircularProgress />;
  }

  if (!data || !title) {
    return null;
  }

  return (
    <Card>
      <CardContent>
        <T variant="h4" component="div" sx={{ mb: 1 }}>
          {title}
        </T>
        <T variant="body2" paragraph>
          {data.intro}
        </T>
      </CardContent>
      <CardActions>
        {data.imdbLink && (
          <Button href={data.imdbLink} target="_blank" rel="noreferrer">
            IMDB
          </Button>
        )}
        {data.wikipediaLink && (
          <Button href={data.wikipediaLink} target="_blank" rel="noreferrer">
            Wikipedia
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Details;
