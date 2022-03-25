import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Stack } from "@mui/material";

type SearchInputProps = {
  onSearch: (query: string) => void;
  isDisabled: boolean;
};

const SearchInput = ({ onSearch, isDisabled }: SearchInputProps) => {
  const [query, setQuery] = useState("");

  const searchDisabled = query.length === 0 || isDisabled;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(event.target.value);

  const handleSearch = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (searchDisabled) {
      return;
    }
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch}>
      <Stack direction="row">
        <TextField
          variant="outlined"
          label="Search"
          onChange={handleChange}
          fullWidth
          sx={{ mr: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={searchDisabled}
          type="submit"
        >
          Search
        </Button>
      </Stack>
    </form>
  );
};

export default SearchInput;
