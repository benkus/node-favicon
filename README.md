# Favicon

A Node.js module for finding the URL of a web site's
[favicon](http://en.wikipedia.org/wiki/Favicon).

# Installation

    $ npm install favicon

# Usage

		`favicon_url` will be the url of the "best" favicon found (if any icon is discovered),
		and `null` otherwise.

		 `all_favicon_urls` will be all the urls of the favicons found,
     and `null` otherwise.

    var favicon = require('favicon');
    
    favicon("http://nodejs.org/", function(err, best_favicon_url, all_favicon_urls) {
      // ...
    });

# License

See LICENSE.
