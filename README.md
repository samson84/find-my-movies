# Find My Movies

This app demonstrates how to use GraphQL and the wikipedia API
to fetch some basic movie data and show them in a Material 
UI based Application.

## Usage

This app is simple Create React App. Run `npm install` to install
the necessary dependencies, then `npm start` to start the app 
(in development mode).

## Project

### Requirements

- [x] Have a movie title search box on the UI, on enter/click of a button it requests the search results from our graphql sandbox for TMDB: https://tmdb.sandbox.zoosh.ie/dev/grphql
- [x] It displays the results and some of their data (name, category, score) in a list, titles can be clicked
- [x] By clicking on an address, the app tries to find the related English wikipedia page (with a REST request)
- [x] and then displays a summary of it in a detail panel (e.g. first paragraph),
- [x] along with a clickable link that opens in a new window in IMDB and wikipedia
- [-] Bonus: Dual state search engine; a “related” button next to the two links in the movie: this switches the movie list from search results to a list of related movies related to the selected movie.

- [x] A working web page
- [x] Spinner while loading data from TMDBW or wikipedia
- [-] Search for related movies
- [x] Bonus # 1: Use Material-UI library, Material-UI look
- [x] Bonus # 2: Tests

### Worklog

- [x] Learning the basic concept of GraphQL, 2-3 hours
  - based on this tutorial https://www.howtographql.com/react-apollo/1-getting-started/
- [x] basic search, showing the results, connecting GraphQL, 3 hours
- [x] add wikipedia parsing and details with link, 3 hours
- [x] correct the wikipedia parsing, using wikipedia API endpoints, 3 hours
- [x] styling, margins, padding, loading indicator, some error handling 1 hours
- [x] adding presentational component tests, and integration tests for
  the container component (example). 4 hours