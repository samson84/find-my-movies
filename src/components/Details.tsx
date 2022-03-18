import React from "react";
import { useMovieDetails } from "../api/wikipedia";
import { Paper, Typography as T, Link } from "@mui/material";

type DetailsProps = {
  title?: string;
};

const Details = ({ title = "The Matrix" }: DetailsProps) => {
  const { data, error, loading } = useMovieDetails(title);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error..</div>;
  }
  if (!data) {
    return null;
  }

  return (
    <Paper elevation={2}>
      <T variant="h3">{title}</T>
      <T variant="h4">Plot</T>
      <T variant="body1" paragraph>
        {data.plot}
      </T>
      <T variant="h4">Links</T>
      <div>{data.imdbLink && <Link href={data.imdbLink}>IMDB</Link>}</div>
      <div>
        {data.wikipediaLink && <Link href={data.wikipediaLink}>Wikipedia</Link>}
      </div>
    </Paper>
  );
};

export default Details;
