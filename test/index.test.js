var should  = require('should')
  , favicon = require(__dirname + '/../');

describe("favicon", function() {
  it("discovers a favicon.ico in the web site root", function(done) {
    favicon("http://nodejs.org/", function(err, url) {
      if (err) return done(err);
      url.should.eql("http://nodejs.org/favicon.ico");
      done();
    });
  });

  it("discovers favicon.ico in the web site root (verifying all favicon urls)", function(done) {
    favicon.allFavicons("http://nodejs.org/", function(err, allFavIcons) {
      if (err) return done(err);
      var allFavIconUrls = allFavIcons.map(function(icon) { return icon.url; });
      allFavIconUrls.indexOf("http://nodejs.org/favicon.ico").should.not.equal(-1);
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
  
  it("discovers a favicon found from a <link> tag  (verifying all favicon urls)", function(done) {
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
    favicon("https://github.com/sentientwaffle/gift", function(err, url) {
      if (err) return done(err);
      url.should.eql("https://github.com/fluidicon.png")
      done();
    });
  });

  it("can handle https protocol  (verifying all favicon urls)", function(done) {
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
    favicon("http://hashrocket.com/articles", function(err, url) {
      if (err) return done(err);
      url.should.eql("http://d15zqjc70bk603.cloudfront.net/apple-touch-icon-144x144-precomposed.png");
      done();
    });
  });

  it("handles single quotes  (verifying all favicon urls)", function(done) {
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
