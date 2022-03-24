import { useState, useEffect } from "react";

export type MovieDetailsError = {
  code: "not_found";
};

export type MovieDetails = {
  intro?: string;
  imdbLink?: string;
  wikipediaLink?: string;
};
export const useMovieDetails = (query: string | null | undefined) => {
  const [data, setData] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<MovieDetailsError | null>(null);

  useEffect(() => {
    if (!query) {
      return;
    }
    const task = async () => {
      setError(null);
      setLoading(true);
      try {
        const pages = await search(query);
        const templateResults = await Promise.allSettled(
          pages.map((page) => getTemplates(page))
        );
        const firstMovieIndex = templateResults.findIndex(
          (result) => result.status === "fulfilled" && isMovie(result.value)
        );
        if (firstMovieIndex === -1) {
          return setError({
            code: "not_found",
          });
        }
        const firstMoviePage = pages[firstMovieIndex];
        const { intro, links } = await getDetails(firstMoviePage);
        setData({
          intro,
          imdbLink: links?.[0],
          wikipediaLink: createWikipediaLink(firstMoviePage),
        });
      } finally {
        setLoading(false);
      }
    };
    task();
  }, [query]);

  return { data, loading, error };
};

const BASE_URI =
  "https://en.wikipedia.org/w/api.php?format=json&origin=*&formatversion=2";

const search = async (query: string): Promise<string[]> => {
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
const getTemplates = async (pageId: string): Promise<Template[]> => {
  const result = await fetch(
    `${BASE_URI}&action=parse&page=${encodeURI(pageId)}&prop=templates`
  );
  const response: TemplateResponse = await result.json();
  return response.parse.templates;
};

const isMovie = (templates: Template[]): boolean =>
  templates.some(({ title }) => title === "Template:Infobox film");

const createWikipediaLink = (pageId: string): string =>
  `https://en.wikipedia.org/wiki/${pageId.replaceAll(" ", "_")}`;

type PageDetailsReponse = {
  query: {
    pages: { extract: string; extlinks: { url: string }[] }[];
  };
};
type PageDetails = {
  intro?: string;
  links: string[];
};
const getDetails = async (pageId: string): Promise<PageDetails> => {
  const response = await fetch(
    `${BASE_URI}&action=query&prop=extracts%7Cextlinks&titles=${encodeURI(
      pageId
    )}&exsentences=5&exintro=1&explaintext=1&exsectionformat=plain&elprotocol=https&elquery=www.imdb.com`
  );
  const result: PageDetailsReponse = await response.json();
  const intro = result?.query?.pages?.[0]?.extract;
  const links = result?.query?.pages?.[0]?.extlinks.map((link) => link.url);
  return {
    intro,
    links: links ?? [],
  };
};
