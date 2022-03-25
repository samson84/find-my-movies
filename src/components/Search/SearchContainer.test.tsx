import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import SearchContainer from "./SearchContainer";
import { SEARCH_MOVIE_QUERY } from "../../api/tmdb";
import userEvent from "@testing-library/user-event";
import { GraphQLError } from "graphql";

const tmdbQraphQlRequestFixture = () => ({
  query: SEARCH_MOVIE_QUERY,
  variables: { query: "matrix" },
});

const tmdbQraphQlSuccessFixtrue = () => [
  {
    request: tmdbQraphQlRequestFixture(),
    result: {
      data: {
        searchMovies: [
          {
            id: "624860",
            name: "The Matrix Resurrections",
            score: 6.8,
            genres: [
              {
                id: "878",
                name: "Science Fiction",
              },
              {
                id: "28",
                name: "Action",
              },
              {
                id: "12",
                name: "Adventure",
              },
            ],
          },
        ],
      },
    },
  },
];

describe("SearchContainaer (Integration)", () => {
  it("should search for the results", async () => {
    const onTitleClickSpy = jest.fn();
    render(
      <MockedProvider mocks={tmdbQraphQlSuccessFixtrue()} addTypename={false}>
        <SearchContainer onTitleClick={onTitleClickSpy} />
      </MockedProvider>
    );

    const input = screen.getByLabelText(/search/i);
    userEvent.type(input, "matrix");
    const button = screen.getByRole("button", { name: /search/i });
    userEvent.click(button);
    const title = await screen.findByText("The Matrix Resurrections");
    userEvent.click(title);

    expect(screen.getByText("6.8")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Adventure")).toBeInTheDocument();
    expect(onTitleClickSpy).toHaveBeenCalledWith("The Matrix Resurrections");
  });

  it("should handle the network error", async () => {
    const networkErrorMock = [
      {
        request: tmdbQraphQlRequestFixture(),
        error: new Error("something went worng"),
      },
    ];

    render(
      <MockedProvider mocks={networkErrorMock} addTypename={false}>
        <SearchContainer onTitleClick={jest.fn()} />
      </MockedProvider>
    );

    const input = screen.getByLabelText(/search/i);
    userEvent.type(input, "matrix");
    const button = screen.getByRole("button", { name: /search/i });
    userEvent.click(button);
    const alert = await screen.findByText(
      "Something is wrong with this search."
    );

    expect(alert).toBeInTheDocument();
  });

  it("should handle the graphQL error", async () => {
    const graphQlErrorMock = [
      {
        request: tmdbQraphQlRequestFixture(),
        result: { errors: [new GraphQLError("something wrong")] },
      },
    ];

    render(
      <MockedProvider mocks={graphQlErrorMock} addTypename={false}>
        <SearchContainer onTitleClick={jest.fn()} />
      </MockedProvider>
    );

    const input = screen.getByLabelText(/search/i);
    userEvent.type(input, "matrix");
    const button = screen.getByRole("button", { name: /search/i });
    userEvent.click(button);
    const alert = await screen.findByText(
      "Something is wrong with this search."
    );

    expect(alert).toBeInTheDocument();
  });

  it("should show the notfound message", async () => {
    const graphQlNoResponse = [
      {
        request: tmdbQraphQlRequestFixture(),
        result: { data: { searchMovies: [] } },
      },
    ];

    render(
      <MockedProvider mocks={graphQlNoResponse} addTypename={false}>
        <SearchContainer onTitleClick={jest.fn()} />
      </MockedProvider>
    );

    const input = screen.getByLabelText(/search/i);
    userEvent.type(input, "matrix");
    const button = screen.getByRole("button", { name: /search/i });
    userEvent.click(button);
    const alert = await screen.findByText("No movies found for this search.");

    expect(alert).toBeInTheDocument();
  });
});
