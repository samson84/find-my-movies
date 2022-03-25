import React from "react";
import { MovieDetails } from "../../api/wikipedia";
import {
  Typography as T,
  Card,
  CardContent,
  CardActions,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import SomethingWentWrong from "../SomethingWentWrong";

type DetailsProps = {
  title?: string;
  details?: MovieDetails;
  errorCode?: string;
  isLoading: boolean;
};

const NotFound = () => (
  <Alert severity="info">No movie details found on Wikipedia.</Alert>
);

const Details = ({ title, details, errorCode, isLoading }: DetailsProps) => {
  if (errorCode) {
    if (errorCode === "not_found") {
      return <NotFound />;
    }
    return <SomethingWentWrong />;
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!details) {
    return null;
  }

  return (
    <Card>
      <CardContent>
        <T variant="h4" component="div" sx={{ mb: 1 }}>
          {title}
        </T>
        <T variant="body2" paragraph>
          {details.intro}
        </T>
      </CardContent>
      <CardActions>
        {details.imdbLink && (
          <Button href={details.imdbLink} target="_blank" rel="noreferrer">
            IMDB
          </Button>
        )}
        {details.wikipediaLink && (
          <Button href={details.wikipediaLink} target="_blank" rel="noreferrer">
            Wikipedia
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Details;
