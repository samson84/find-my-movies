# Find My Movies

This app demonstrates how to use GraphQL to fetch some basic
movie data and show them in a Material UI based Application.

## Usage

This app is simple Create React App. Run `npm install` to install
the necessary dependencies, then `npm start` to start the app 
(in development mode)

## Project

### Requirements

- [ ] Have a movie title search box on the UI, on enter/click of a button it requests the search results from our graphql sandbox for TMDB: https://tmdb.sandbox.zoosh.ie/dev/grphql
- [ ] It displays the results and some of their data (name, category, score) in a list, titles can be clicked
- [ ] By clicking on an address, the app tries to find the related English wikipedia page (with a REST request)
- [ ] and then displays a summary of it in a detail panel (e.g. first paragraph),
- [ ] along with a clickable link that opens in a new window in IMDB and wikipedia
- [ ] Bonus: Dual state search engine; a “related” button next to the two links in the movie: this switches the movie list from search results to a list of related movies related to the selected movie.

- [ ] A working web page
- [ ] Spinner while loading data from TMDBW or wikipedia
- [ ] Search for related movies
- [ ] Bonus # 1: Use Material-UI library, Material-UI look
- [ ] Bonus # 2: Tests

### Worklog

- [x] Learning the basic concept of GraphQL, 2-3 hours
  - based on this tutorial https://www.howtographql.com/react-apollo/1-getting-started/ 