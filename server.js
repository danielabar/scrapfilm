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
      var data = [];
      for (i=0; i<titles.length; i++) {
        var currentTitle = $(titles[i]).text();
        var currentYear = $(years[i]).text();
        var parsedYear = currentYear.replace(/^\(|\)$/g, '');
        var dataRow = currentTitle + ',' + parsedYear + '\n';
        fs.appendFile('scraped.csv', dataRow, function (err) {
          if (err) {
            console.dir(err);
          }
        });
        data.push(dataRow);

      }
      res.status(200).send(data);
    }
  });

});

app.listen('8001');
console.log('listening on 8001');
exports = module.exports = app;