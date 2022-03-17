import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Stack } from "@mui/material";

type SearchInputProps = {
  onSearch: (query: string) => void;
};

const SearchInput = ({ onSearch }: SearchInputProps) => {
  const [query, setQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(event.target.value);

  const handleSearch = () => onSearch(query);

  return (
    <Stack direction="row">
      <TextField variant="outlined" label="Search" onChange={handleChange} />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </Stack>
  );
};

export default SearchInput;
