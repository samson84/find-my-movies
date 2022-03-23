import React from "react";
import { useMovieDetails } from "../api/wikipedia";
import { Paper, Typography as T, Link } from "@mui/material";

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
    <Paper elevation={2}>
      <T variant="h3">{title}</T>
      <T variant="body1" paragraph>
        {data.intro}
      </T>
      <div>
        {data.imdbLink && (
          <Link href={data.imdbLink} target="_blank" rel="noreferrer">
            IMDB
          </Link>
        )}
      </div>
      <div>
        {data.wikipediaLink && (
          <Link href={data.wikipediaLink} target="_blank" rel="noreferrer">
            Wikipedia
          </Link>
        )}
      </div>
    </Paper>
  );
};

export default Details;
