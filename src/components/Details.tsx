import React from "react";
import { useMovieDetails } from "../api/wikipedia";
import {
  Paper,
  Typography as T,
  Link,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";

type DetailsProps = {
  title?: string | null | undefined;
};

const Details = ({ title }: DetailsProps) => {
  const { data, error, loading } = useMovieDetails(title);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error..</div>;
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
