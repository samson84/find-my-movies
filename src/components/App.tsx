import { Container, Grid, Stack } from "@mui/material";
import React from "react";
import Search from "./Search";

const App = () => (
  <Container>
    <Grid container direction="row" spacing="2" justifyContent="space-between">
      <Grid item xs={6}>
        <Search />
      </Grid>
      <Grid item xs={6}>
        <p>Details</p>
      </Grid>
    </Grid>
  </Container>
);
export default App;
