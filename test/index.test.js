var should  = require('should')
  , favicon = require(__dirname + '/../');

describe("favicon failure situations", function() {

  it("fails properly when the url is unavailable", function(done) {
    favicon("http://asdfadsafasfas.com", function(err, url) {
      should.exist(err);
      should.not.exist(url);
      done();
    });
  });

  it("allFavicons fails properly when the url is unavailable", function(done) {
    favicon.allFavicons("http://asdfadsafasfas.com", function(err, allFavicons) {
      should.exist(err);
      should.not.exist(allFavicons);
      done();
    });
  });
});


describe("find highest res favicon", function() {

  it("discovers a favicon.ico in the web site root", function(done) {
    favicon("http://nodejs.org/", function(err, url) {
      if (err) return done(err);
      url.should.eql("http://nodejs.org/favicon.ico");
      done();
    });
  });

  it("discovers a favicon found from a <link> tag", function(done) {
    favicon("http://hyperpolyglot.org/lisp", function(err, url) {
      if (err) return done(err);
      url.should.eql("http://hyperpolyglot.org/touch-icon-ipad-retina.png");
      done();
    });
  });
  
  it("can handle https protocol", function(done) {
    favicon("https://github.com/sentientwaffle/gift", function(err, url) {
      if (err) return done(err);
      url.should.eql("https://github.com/fluidicon.png")
      done();
    });
  });

  it("handles single quotes", function(done) {
    favicon("http://hashrocket.com/articles", function(err, url) {
      if (err) return done(err);
      url.should.eql("http://d15zqjc70bk603.cloudfront.net/apple-touch-icon-144x144-precomposed.png");
      done();
    });
  });

});

describe("find all favicons", function() {
  it("discovers favicon.ico in the web site root", function(done) {
    favicon.allFavicons("http://nodejs.org/", function(err, allFavIcons) {
      if (err) return done(err);
      allFavIcons[0].url.should.equal("http://nodejs.org/favicon.ico");
      allFavIcons[0].format.should.equal("image/x-icon");
      allFavIcons[0].size.should.equal(1150);
      allFavIcons[0].base64img.should.equal(
        "AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAD///8A////AP///wD///8A////AP///wD8/v0DvurVXMHr11f///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDV8eQ6b9Giz07Hjf9Ox43/ddOmx9rz5zL///8A////AP///wD///8A////AP///wD///8A////AOj38B+L2rSnTseN/07Hjf9Ox43/TseN/07Hjf9Ox43/kNy4n+759Bj///8A////AP///wD///8A+f37B6TixINTyJD3TseN/07Hjf9Ox43/TseN/07Hjf9Ox43/TseN/07Hjf9WyZLzrOTKd/z+/QP///8A////AKnkyHtOx43/TseN/07Hjf9Ox43/TseN/07Hjf9Ox43/TseN/07Hjf9Ox43/TseN/07Hjf+y5s1v////AP///wCn48Z+TseN/07Hjf9Ox43/TseN/07Hjf9Ox43/TseN/07Hjf9Ox43/TseN/07Hjf9Ox43/p+PGfv///wD///8Ap+PGfk7Hjf9Ox43/TseN/07Hjf9Ox43/TseN/07Hjf9Ox43/TseN/07Hjf9Ox43/TseN/6fjxn7///8A////AKfjxn5Ox43/TseN/07Hjf9Ox43/TseN/07Hjf9Ox43/TseN/07Hjf9Ox43/TseN/07Hjf+n48Z+////AP///wCn48Z+TseN/07Hjf9Ox43/TseN/07Hjf9Ox43/TseN/07Hjf9Ox43/TseN/07Hjf9Ox43/p+PGfv///wD///8Ap+PGfk7Hjf9Ox43/TseN/07Hjf9Ox43/TseN/07Hjf9Ox43/TseN/07Hjf9Ox43/TseN/6fjxn7///8A////AKfjxn5Ox43/TseN/07Hjf9Ox43/TseN/07Hjf9Ox43/TseN/07Hjf9Ox43/TseN/07Hjf+n48Z+////AP///wC86dNgTseN/07Hjf9Ox43/TseN/07Hjf9Ox43/TseN/07Hjf9Ox43/TseN/07Hjf9Qx476xOzZU////wD///8A////ANfy5Tdy0qTKTseN/07Hjf9Ox43/TseN/07Hjf9Ox43/TseN/07Hjf961am/3fTpL////wD///8A////AP///wD///8A////ALzp02BezJfnTseN/07Hjf9Ox43/TseN/2TOm97B69dX////AP///wD///8A////AP///wD///8A////AP///wD///8A9vz5DKHhwodTyJD3U8iQ96nkyHv5/fsH////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A6PfwH+759Bj///8A////AP///wD///8A////AP///wD///8A//8AAPw/AADwDwAAwAcAAMADAADAAwAAwAMAAMADAADAAwAAwAMAAMADAADAAwAA4AcAAPgfAAD8fwAA//8AAA==");
      done();
    });
  });

  it("discovers a favicon found from a <link> tag", function(done) {
    favicon.allFavicons("http://hyperpolyglot.org/lisp", function(err, allFavIcons) {
      if (err) return done(err);
      var allFavIconUrls = allFavIcons.map(function(icon) { return icon.url; });
      allFavIconUrls.indexOf("http://hyperpolyglot.org/favicon.gif").should.not.equal(-1);
      allFavIconUrls.indexOf("http://hyperpolyglot.org/touch-icon-iphone-retina.png").should.not.equal(-1);
      allFavIconUrls.indexOf("http://hyperpolyglot.org/touch-icon-ipad-retina.png").should.not.equal(-1);
      done();
    });
  });

  it("can handle https protocol", function(done) {
    favicon.allFavicons("https://github.com/sentientwaffle/gift", function(err, allFavIcons) {
      if (err) return done(err);
      var allFavIconUrls = allFavIcons.map(function(icon) { return icon.url; });
      allFavIconUrls.indexOf("https://assets-cdn.github.com/favicon.ico").should.not.equal(-1);
      allFavIconUrls.indexOf("https://github.com/apple-touch-icon-144.png").should.not.equal(-1);
      allFavIconUrls.indexOf("https://github.com/apple-touch-icon-114.png").should.not.equal(-1);
      allFavIconUrls.indexOf("https://github.com/favicon.ico").should.not.equal(-1);
      allFavIconUrls.indexOf("https://github.com/fluidicon.png").should.not.equal(-1);
      done();
    });
  });

   it("handles single quotes", function(done) {
    favicon.allFavicons("http://hashrocket.com/articles", function(err, allFavIcons) {
      if (err) return done(err);
      var allFavIconUrls = allFavIcons.map(function(icon) { return icon.url; });
      allFavIconUrls.indexOf("http://d15zqjc70bk603.cloudfront.net/apple-touch-icon-57x57-precomposed.png").should.not.equal(-1);
      allFavIconUrls.indexOf("http://d15zqjc70bk603.cloudfront.net/apple-touch-icon-144x144-precomposed.png").should.not.equal(-1);
      allFavIconUrls.indexOf("http://d15zqjc70bk603.cloudfront.net/apple-touch-icon-72x72-precomposed.png").should.not.equal(-1);
      allFavIconUrls.indexOf("http://d15zqjc70bk603.cloudfront.net/apple-touch-icon-114x114-precomposed.png").should.not.equal(-1);
      allFavIconUrls.indexOf("http://d15zqjc70bk603.cloudfront.net/favicon.png").should.not.equal(-1);
      done();
    });
  });
});