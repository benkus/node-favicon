var request = require('request')
  , Url     = require('url');


// Public: Find the URL of a web site's favicon.
// 
// url      - The String web site URL.
// callback - Receives `(err, favicon_url, all_favicon_urls)`. 
//            `favicon_url` will be the url of the "best" favicon found (if any icon is discovered),
//             and `null` otherwise.
//            `all_favicon_url` will be all the urls of the favicons found,
//             and `null` otherwise.
// 
// Examples:
// 
//   favicon("http://nodejs.org/", function(err, favicon_url, all_favicons_urls) {
//     
//   });
// 
// Returns Nothing.
module.exports = function(url, callback) {

  if (!url || url == '') {
    return callback("Invalid URL");
  }
  
  url = url.trim();
  if (!url.match(new RegExp('://'))) {
    url = "http://" + url;
  }

  var p    = Url.parse(url)
    , root = p.protocol + "//" + p.host
    , defaultIco  = root + "/favicon.ico";
  
  // Check the root of the web site.
  does_it_render(defaultIco, function(err, renders) {
    var ico;
    if (err) return callback(err);
    
    // Check for <link rel="icon" href="???"> tags to indicate
    // the location of the favicon.
    function checkLinks(rel_re, body) {
      var link_re = /<link (.*)>/gi
        , href_re = /href=["']([^"']*)["']/i
        , match, ico_match;
      var icons = [];

      while (match = link_re.exec(body)) {
        if (rel_re.test(match[1]) && (ico_match = href_re.exec(match[1]))) {
          ico = ico_match[1];
          if (ico.substring(0, 2) == "//") {
            ico = p.protocol + ico;
          } else if (ico[0] == "/") {
            ico = root + ico;
          }
          icons.push(ico);
        }
      }
      if (icons.length == 0) {
        return false;  
      } else {
        return icons;
      }
      
    }

    request(root, function(err, res, body) {
      var apple_rel_re  = /rel=["'][^"]*apple-touch-icon[^"']*["']/i;
      var rel_re  = /rel=["'][^"]*icon[^"']*["']/i;
      var ico;
      var icons = [];

      // check for apple icons first
      var apple_icons = checkLinks(apple_rel_re, body);
      if (apple_icons) 
        icons = icons.concat(apple_icons);

      // then check for regular icons
      var other_icons = checkLinks(rel_re, body);
      if (other_icons) 
        icons = icons.concat(other_icons);

      // then check for /favicon.ico
      if (renders) {
        icons.push(defaultIco);
      }

      if (icons.length == 0) {
        // No favicon could be found.
        return callback(null, null, null);
      }

      // remove duplicate icons
      var uniqueIcons = icons.filter(function(elem, pos) {
        return icons.indexOf(elem) == pos;
      }); 

      return callback(null, uniqueIcons[0], uniqueIcons);
    });
  });
};


// Internal: Check the status code.
function does_it_render(url, callback) {
  request({ url: url, 
            timeout: 4000,
          }, function(err, res, body) {
    if (err) return callback(err);
    callback(null, res.statusCode == 200);
  });
}

