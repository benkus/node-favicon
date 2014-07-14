# Favicon

A Node.js module for finding the URL of a web site's
[favicon](http://en.wikipedia.org/wiki/Favicon).

## Installation

    $ npm install favicon

## Usage

The simplest way to get a favicon for a given url:

    var favicon = require('favicon');
 
    favicon("http://nodejs.org/", function(err, favicon_url) {
      // ...
    });

`favicon_url` will be the url of the highest resolution favicon found (if any icon is discovered) and `null` otherwise.


Often websites have several favicon images in different formats and different sizes. To get a list of all the favicons offered from a site, use the `favicon.allFavicons` function:

    var favicon = require('favicon');
  
    favicon.allFavicons("http://nodejs.org/", function(err, allFavicons) {
      // ...
    });

`allFavicons` will contain an array of all the valid favicons found on the site with additional information about the images. For instance:
		favicon.allFavicons("http://github.com/", function(err, allFavicons) {
      // ...
    });

Results in:
[
  {
    "url": "https://github.com/fluidicon.png",
    "format": "image/png",
    "size": 40976,
    "height": 512,
    "width": 512
  },
  {
    "url": "https://github.com/apple-touch-icon-144.png",
    "format": "image/png",
    "size": 3200,
    "height": 144,
    "width": 144
  },
  {
    "url": "https://github.com/apple-touch-icon-114.png",
    "format": "image/png",
    "size": 2679,
    "height": 114,
    "width": 114
  },
  {
    "url": "https://assets-cdn.github.com/favicon.ico",
    "format": "icon",
    "size": 6518
  },
  {
    "url": "https://github.com/favicon.ico",
    "format": "icon",
    "size": 6518
  }
]

## License

MIT
