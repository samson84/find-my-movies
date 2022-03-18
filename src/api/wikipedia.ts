import { useState, useEffect } from "react";

type Error = {
  code: "not_found" | "internal";
  details?: string;
};

export const useMovieDetails = (query: string) => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const task = async () => {
      setLoading(true);
      try {
        const pages = await openSearch(query);
        const isMovies = await Promise.allSettled(
          pages.map((page) => isMovie(page))
        );
        const firstMovieIndex = isMovies.findIndex(
          (result) => result.status === "fulfilled" && result.value === true
        );
        if (firstMovieIndex === -1) {
          return setError({
            code: "not_found",
          });
        }
        const pageDetails = await getPageDetails(pages[firstMovieIndex]);
        setData(pageDetails);
      } catch (error) {
        setError({ code: "internal", details: String(error) });
      } finally {
        setLoading(false);
      }
    };
    task();
  }, []);

  return { data, loading, error };
};

const BASE_URI =
  "https://en.wikipedia.org/w/api.php?format=json&origin=*&formatversion=2";

const openSearch = async (query: string): Promise<string[]> => {
  const encoded = encodeURI(query);
  const result = await fetch(
    `${BASE_URI}&action=opensearch&search=${encoded}&profile=strict`
  );
  const [originalQuery, results] = await result.json();
  return results;
};

type TemplateResponse = {
  parse: {
    templates: Template[];
  };
};
type Template = {
  title: string;
};
const isMovie = async (page: string): Promise<boolean> => {
  const encoded = encodeURI(page);
  const result = await fetch(
    `${BASE_URI}&action=parse&page=${encoded}&prop=templates`
  );
  const data: TemplateResponse = await result.json();
  return data.parse.templates.some(
    ({ title }) => title === "Template:Infobox film"
  );
};

type PageDetailsResponse = {
  parse: {
    externallinks: string[];
    wikitext: string;
  };
};
type PageDetails = {
  plot: string | undefined;
  imdbLink: string | undefined;
  wikipediaLink: string | undefined;
};
const getPageDetails = async (page: string): Promise<PageDetails> => {
  const encoded = encodeURI(page);
  const result = await fetch(
    `${BASE_URI}&action=parse&page=${encoded}&prop=externallinks%7Cwikitext`
  );
  const data: PageDetailsResponse = await result.json();
  const imdbLink = data.parse.externallinks.find((link) =>
    link.startsWith("https://www.imdb.com/title/")
  );
  const PLOT_FINDER = /== Plot ==([^=]+)==/g;
  const raw = data.parse.wikitext.match(PLOT_FINDER)?.[0];
  const wikipediaLink = `https://en.wikipedia.org/wiki/${page.replaceAll(
    " ",
    "_"
  )}`;
  return { plot: raw, imdbLink, wikipediaLink };
};
