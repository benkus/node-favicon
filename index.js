var request     = require('request')
  , Url         = require('url');
var imageinfo   = require('imageinfo');


module.exports = function(url, callback) {
  getFavicons(url, function(err, favicons) {
    if (favicons && favicons.length > 0) {
      callback(err, favicons[0].url);
    } else {
      callback(err, null);
    }
  });
}

module.exports.allFavicons = function(url, callback) {
  getFavicons(url, function(err, favicons) {
    callback(err, favicons);
  });
}

function getFavicons(url, callback) {

  if (!url || url == '') {
    return callback("Invalid URL");
  }
  
  url = url.trim();
  if (!url.match(new RegExp('://'))) {
    url = "http://" + url;
  }

  var p    = Url.parse(url)
    , root = p.protocol + "//" + p.host;
  
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
        } else if (ico.substring(0, 4) != 'http') {
          ico = root + "/" + ico;
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
    if (err) {
      return callback(err);
    }
    var ico;
    var icons = [];

    // include apple icons first
    var apple_rel_re  = /rel=["'][^"]*apple-touch-icon[^"']*["']/i;
    var apple_icons = checkLinks(apple_rel_re, body);
    if (apple_icons) 
      icons = icons.concat(apple_icons);

    // then regular icons
    var rel_re  = /rel=["'][^"]*icon[^"']*["']/i;
    var other_icons = checkLinks(rel_re, body);
    if (other_icons) 
      icons = icons.concat(other_icons);

    // then check for /favicon.ico
    var defaultIco  = root + "/favicon.ico";
    icons.push(defaultIco);

    if (icons.length == 0) {
      // No favicon could be found.
      return callback(null, null);
    }

    // remove duplicate icons
    var urls = icons.filter(function(elem, pos) {
      return icons.indexOf(elem) == pos;
    }); 

    // get info for each image
    var faviconsInfo = [];
    var responses = [];
    var completed_requests = 0;
    for (var i=0; i<urls.length; i++) {
      request({ url: urls[i], 
                encoding: null,
                timeout: 5000, 
              }, function(err, res, body) {
        if (res && body) {
          responses.push({
            url: res.request.uri.href, 
            err: err, 
            res: res, 
            body: body
          });
        }
        completed_requests++;

        if (completed_requests == urls.length) { 
          // got all the images, now process them
          for (var j=0; j<responses.length; j++) {
            if (responses[j].res.statusCode == 200) { // ignore broken favicon urls
              var imageData = extractImageData(responses[j]);
              if (imageData.format !== '' ) { // ignore formats we don't recognize
                faviconsInfo.push(imageData);
              }
            }
          }
          // sort by size
          faviconsInfo = faviconsInfo.sort(compare); 
          return callback(null, faviconsInfo);
        }
      });
    }
  });
};

function extractImageData(favIconResponse) {
  var imageData = {
    url      : '',
    format   : '',
    size     : 0,
    height   : 0,
    width    : 0,
  };

  imageData.url = favIconResponse.url;
  if (favIconResponse.err) {
    return imageData;
  } else {
    var data = favIconResponse.body;
    var info = imageinfo(data);
    if (info.mimeType) {
      imageData.format = info.mimeType;
    } else if (imageData.url.substr(-3).toLowerCase() === "ico") {
       imageData.format = "image/x-icon";
    }
    imageData.size = data.length;
    imageData.width = info.width;
    imageData.height = info.height;
  }
  return imageData;
}

function compare(a,b) {
  if (!a.height && !b.height)
    return 0;
  if (!a.height) 
    return 1;
  if (!b.height)
    return -1;
  if (a.height < b.height)
     return 1;
  if (a.height > b.height)
    return -1;
  return 0;
}
