import { Container, Grid } from "@mui/material";
import React, { useState } from "react";
import Details from "./Details";
import Search from "./Search";

const App = () => {
  const [title, setTitle] = useState<string | null | undefined>(null);

  return (
    <Container>
      <Grid
        container
        direction="row"
        spacing="2"
        justifyContent="space-between"
      >
        <Grid item xs={6}>
          <Search onTitleClick={(title) => setTitle(title)} />
        </Grid>
        <Grid item xs={6}>
          <Details title={title} />
        </Grid>
      </Grid>
    </Container>
  );
};
export default App;
