import React from "react";
import { render, screen } from "@testing-library/react";
import Details from "./Details";
import { MovieDetails } from "../../api/wikipedia";
import { execPath } from "process";

const detailsFixture = (overrides?: Partial<MovieDetails>) => ({
  intro: "The Matrix is a 1999 science fiction action...",
  wikipediaLink: "https://en.wikipedia.org/wiki/The_Matrix",
  imdbLink: "https://www.imdb.com/title/tt0133093/",
  ...overrides,
});

describe("Details", () => {
  describe("when data available", () => {
    it("should show the title & description", () => {
      const title = "Some Title";
      const intro = "Some Intro";

      render(
        <Details
          title={title}
          details={detailsFixture({ intro })}
          errorCode={undefined}
          isLoading={false}
        />
      );
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText(intro)).toBeInTheDocument();
    });
    describe("Links", () => {
      it("should show the IMDB link if present in the details", () => {
        const imdbLink = "http://some.imdb.link";

        render(
          <Details
            title="The Matrix"
            details={detailsFixture({ imdbLink })}
            errorCode={undefined}
            isLoading={false}
          />
        );
        expect(screen.getByText("IMDB").closest("a")).toHaveAttribute(
          "href",
          imdbLink
        );
      });

      it("should show the Wikipedia link if present in the details", () => {
        const wikipediaLink = "http://some.wikipedia.link";

        render(
          <Details
            title="The Matrix"
            details={detailsFixture({ wikipediaLink })}
            errorCode={undefined}
            isLoading={false}
          />
        );
        expect(screen.getByText("Wikipedia").closest("a")).toHaveAttribute(
          "href",
          wikipediaLink
        );
      });

      it("shouldn't show the IMDB link, if it is missing from the details", () => {
        const imdbLink = undefined;

        render(
          <Details
            title="The Matrix"
            details={detailsFixture({ imdbLink })}
            errorCode={undefined}
            isLoading={false}
          />
        );

        expect(screen.queryByText("IMDB")).not.toBeInTheDocument();
      });

      it("shouldn't show the Wikipedia link, if it is missing from the details", () => {
        const wikipediaLink = undefined;

        render(
          <Details
            title="The Matrix"
            details={detailsFixture({ wikipediaLink })}
            errorCode={undefined}
            isLoading={false}
          />
        );

        expect(screen.queryByText("Wikipedia")).not.toBeInTheDocument();
      });
    });
  });

  describe("When an error is happened", () => {
    it("should show a not found error", () => {
      const title = "Some title";

      render(
        <Details
          title={title}
          details={undefined}
          errorCode={"not_found"}
          isLoading={false}
        />
      );

      expect(
        screen.getByText("No movie details found on Wikipedia.")
      ).toBeInTheDocument();
      expect(screen.queryByText(title)).not.toBeInTheDocument();
    });

    it("should show a general error, but not the title", () => {
      const title = "Some title";
      render(
        <Details
          title={title}
          details={undefined}
          errorCode={"something_else"}
          isLoading={false}
        />
      );

      expect(
        screen.getByText("Something is wrong with this search.")
      ).toBeInTheDocument();
      expect(screen.queryByText(title)).not.toBeInTheDocument();
    });

    it("should show the error only even it is loading", () => {
      render(
        <Details
          title="The Matrix"
          details={undefined}
          errorCode={"not_found"}
          isLoading={true}
        />
      );

      expect(
        screen.getByText("No movie details found on Wikipedia.")
      ).toBeInTheDocument();
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });

    it("should show the error only, even it has details", () => {
      const intro = "Some intro";

      render(
        <Details
          title="The Matrix"
          details={detailsFixture({ intro })}
          errorCode={"not_found"}
          isLoading={true}
        />
      );

      expect(
        screen.getByText("No movie details found on Wikipedia.")
      ).toBeInTheDocument();
      expect(screen.queryByText(intro)).not.toBeInTheDocument();
    });
  });

  describe("when loading", () => {
    it("should show the loader, but not the title", () => {
      const title = "Some title";

      render(
        <Details
          title={title}
          details={undefined}
          errorCode={undefined}
          isLoading={true}
        />
      );

      expect(screen.getByRole("progressbar")).toBeInTheDocument();
      expect(screen.queryByText(title)).not.toBeInTheDocument();
    });
  });

  describe("when no data", () => {
    it("should return empty component", () => {
      const component = render(
        <Details
          title={undefined}
          details={undefined}
          errorCode={undefined}
          isLoading={false}
        />
      );

      expect(component).toBeEmptyDOMElement();
    });
  });
});
