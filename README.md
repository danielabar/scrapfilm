# IMDB Top 250 Screen Scraper

Scrapes the top 250 movie titles and release years from [IMDB](http://www.imdb.com/chart/top?sort=rd,desc&mode=simple&page=1)
and outputs to csv format.

## Why I wrote this

For a [MOOC](http://en.wikipedia.org/wiki/Massive_open_online_course)
I'm taking on [Information Visualization](http://ivmooc.cns.iu.edu/),
wanted some IMDB data on top movies in csv format to conduct temporal and topical analysis.

## How to run it

Go ahead and install [node.js](http://nodejs.org/) if you don't already have it.

Clone this repo, `cd` to project directory and run

  ```
  npm install
  node server.js
  ```

Open a browser and go to [http://localhost:8001/scrape](http://localhost:8001/scrape)

Check your project directory, it should have generated `scraped.csv` with the movie data.

## Inspiration

Thanks to [this blog post](https://scotch.io/tutorials/scraping-the-web-with-node-js)
for demonstrating how to use [request](https://github.com/request/request) and
[cheerio](https://github.com/cheeriojs/cheerio) for screen scraping.