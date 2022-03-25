import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "./Search";
import { Movie } from "../../api/tmdb";

const movieFixtureFightClub = (): Movie => ({
  id: "1",
  name: "Fight Club",
  score: 9.0,
  genres: [{ id: "11", name: "Drama" }],
});

describe("Search", () => {
  it("should show the disabled search button & the input", () => {
    render(
      <Search
        onTitleClick={jest.fn()}
        onSearch={jest.fn()}
        isDirty={false}
        isLoading={false}
        hasError={false}
        movies={[]}
      />
    );

    expect(screen.getByRole("button", { name: /search/i })).toBeDisabled();
    expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
  });

  it("should enable the button if the search field is not empty", () => {
    render(
      <Search
        onTitleClick={jest.fn()}
        onSearch={jest.fn()}
        isDirty={false}
        isLoading={false}
        hasError={false}
        movies={[]}
      />
    );
    const input = screen.getByLabelText(/search/i);
    userEvent.type(input, "The Matrix");

    expect(screen.getByRole("button", { name: /search/i })).toBeEnabled();
  });

  it("should send the query by clicking the button", () => {
    const onSearchSpy = jest.fn();
    const query = "The Matrix";

    render(
      <Search
        onTitleClick={jest.fn()}
        onSearch={onSearchSpy}
        isDirty={false}
        isLoading={false}
        hasError={false}
        movies={[]}
      />
    );
    userEvent.type(screen.getByLabelText(/search/i), "The Matrix");
    userEvent.click(screen.getByRole("button", { name: /search/i }));

    expect(onSearchSpy).toHaveBeenCalledWith(query);
  });

  describe("with data", () => {
    it("should show the search result tile", () => {
      const title = "Fight Club";
      const score = 8.9;
      const movies = [
        {
          id: "1",
          name: title,
          score: score,
          genres: [],
        },
      ];

      render(
        <Search
          onTitleClick={jest.fn()}
          onSearch={jest.fn()}
          isDirty={false}
          isLoading={false}
          hasError={false}
          movies={movies}
        />
      );

      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText(score)).toBeInTheDocument();
    });

    it("should show the genres", () => {
      const genre1 = "Drama";
      const genre2 = "Comedy";

      const movies = [
        {
          id: "1",
          name: "Fight Club",
          score: 8.8,
          genres: [
            { id: "11", name: genre1 },
            { id: "12", name: genre2 },
          ],
        },
      ];

      render(
        <Search
          onTitleClick={jest.fn()}
          onSearch={jest.fn()}
          isDirty={false}
          isLoading={false}
          hasError={false}
          movies={movies}
        />
      );

      expect(screen.getByText(genre1)).toBeInTheDocument();
      expect(screen.getByText(genre2)).toBeInTheDocument();
    });

    it("should call onTitleClick, when clicking on the title", () => {
      const title = "Fight Club";
      const onTitleClickSpy = jest.fn();

      const movies = [
        {
          id: "1",
          name: title,
          score: 8.8,
          genres: [],
        },
      ];

      render(
        <Search
          onTitleClick={onTitleClickSpy}
          onSearch={jest.fn()}
          isDirty={false}
          isLoading={false}
          hasError={false}
          movies={movies}
        />
      );
      userEvent.click(screen.getByText(title));

      expect(onTitleClickSpy).toHaveBeenCalledWith(title);
    });
  });

  describe("when loading", () => {
    it("should show the spinner", () => {
      render(
        <Search
          onTitleClick={jest.fn()}
          onSearch={jest.fn()}
          isDirty={false}
          isLoading={true}
          hasError={false}
          movies={[]}
        />
      );

      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("should show the spinner, even if we have movies", () => {
      render(
        <Search
          onTitleClick={jest.fn()}
          onSearch={jest.fn()}
          isDirty={false}
          isLoading={true}
          hasError={false}
          movies={[movieFixtureFightClub()]}
        />
      );

      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("should show the spinner, even if the search is dirty", () => {
      render(
        <Search
          onTitleClick={jest.fn()}
          onSearch={jest.fn()}
          isDirty={true}
          isLoading={true}
          hasError={false}
          movies={[]}
        />
      );

      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("should show the spinner, even if the search is dirty & have movies", () => {
      render(
        <Search
          onTitleClick={jest.fn()}
          onSearch={jest.fn()}
          isDirty={true}
          isLoading={true}
          hasError={false}
          movies={[movieFixtureFightClub()]}
        />
      );

      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });
  });

  describe("when no data", () => {
    it("should show the not found message, if the search is dirty", () => {
      render(
        <Search
          onTitleClick={jest.fn()}
          onSearch={jest.fn()}
          isDirty={true}
          isLoading={false}
          hasError={false}
          movies={[]}
        />
      );

      expect(
        screen.getByText("No movies found for this search.")
      ).toBeInTheDocument();
    });

    it("should NOT show the not found message, if the search is NOT dirty", () => {
      render(
        <Search
          onTitleClick={jest.fn()}
          onSearch={jest.fn()}
          isDirty={false}
          isLoading={false}
          hasError={false}
          movies={[]}
        />
      );

      expect(
        screen.queryByText("No movies found for this search.")
      ).not.toBeInTheDocument();
    });
  });

  describe("when an error is happened", () => {
    it("should show the error message", () => {
      render(
        <Search
          onTitleClick={jest.fn()}
          onSearch={jest.fn()}
          isDirty={false}
          isLoading={false}
          hasError={true}
          movies={[]}
        />
      );

      expect(
        screen.getByText("Something is wrong with this search.")
      ).toBeInTheDocument();
    });

    it("should show the error message, even it is loading", () => {
      render(
        <Search
          onTitleClick={jest.fn()}
          onSearch={jest.fn()}
          isDirty={false}
          isLoading={true}
          hasError={true}
          movies={[]}
        />
      );

      expect(
        screen.getByText("Something is wrong with this search.")
      ).toBeInTheDocument();
    });

    it("should show the error message, even it has movies", () => {
      render(
        <Search
          onTitleClick={jest.fn()}
          onSearch={jest.fn()}
          isDirty={false}
          isLoading={false}
          hasError={true}
          movies={[movieFixtureFightClub()]}
        />
      );

      expect(
        screen.getByText("Something is wrong with this search.")
      ).toBeInTheDocument();
    });

    it("should show the error message, even it is dirty", () => {
      render(
        <Search
          onTitleClick={jest.fn()}
          onSearch={jest.fn()}
          isDirty={true}
          isLoading={false}
          hasError={true}
          movies={[]}
        />
      );

      expect(
        screen.getByText("Something is wrong with this search.")
      ).toBeInTheDocument();
    });

    it("should show the error message, even it is dirty, has movies and loading", () => {
      render(
        <Search
          onTitleClick={jest.fn()}
          onSearch={jest.fn()}
          isDirty={true}
          isLoading={true}
          hasError={true}
          movies={[movieFixtureFightClub()]}
        />
      );

      expect(
        screen.getByText("Something is wrong with this search.")
      ).toBeInTheDocument();
    });
  });
});
