var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req, res) {
  var url = 'http://www.imdb.com/chart/top?sort=rd,desc&mode=simple&page=1';
  request(url, function(err, response, html) {
    if(err){
      res.status(500).send(err);
    } else {
      var $ = cheerio.load(html);
      var titles = $('.chart tr td.titleColumn a');
      var years = $('.chart tr td.titleColumn span.secondaryInfo');
      var data = '';
      for (i=0; i<titles.length; i++) {
        var currentTitle = $(titles[i]).text();
        var currentYear = $(years[i]).text();
        var parsedYear = currentYear.replace(/^\(|\)$/g, '');
        data += currentTitle + ',' + parsedYear + '\n';
      }
      fs.writeFile('scraped.csv', data, function (err) {
        if (err) {
          res.status(500).send(err);
        } else {
          var msg = 'Your file is saved at ' + __dirname + '/scraped.csv';
          res.status(200).send('<h2>' + msg +'</h2>');
        }
      });
    }
  });
});

app.listen('8001');
console.log('browse to http://localhost:8001/scraped');
exports = module.exports = app;