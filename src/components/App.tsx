import { Container, Grid } from "@mui/material";
import React, { useState } from "react";
import DetailsContainer from "./DetailsContainer";
import SearchContainer from "./SearchContainer";

const App = () => {
  const [query, setQuery] = useState<string | undefined>(undefined);

  return (
    <Container>
      <Grid
        container
        direction="row"
        spacing={2}
        justifyContent="space-between"
      >
        <Grid item xs={6}>
          <SearchContainer onTitleClick={(query) => setQuery(query)} />
        </Grid>
        <Grid item xs={6}>
          <DetailsContainer query={query} />
        </Grid>
      </Grid>
    </Container>
  );
};
export default App;
