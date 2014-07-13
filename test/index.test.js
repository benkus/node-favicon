var should  = require('should')
  , favicon = require(__dirname + '/../');

describe("favicon", function() {
  it("discovers a favicon.ico in the web site root", function(done) {
    favicon("http://nodejs.org/", function(err, url, allFavIcons) {
      if (err) return done(err);
      url.should.eql("http://nodejs.org/favicon.ico");
      allFavIcons.indexOf("http://nodejs.org/favicon.ico").should.not.equal(-1);
      done();
    });
  });
  
  it("discovers a favicon found from a <link> tag", function(done) {
    favicon("http://hyperpolyglot.org/lisp", function(err, url, allFavIcons) {
      if (err) return done(err);
      url.should.eql("http://hyperpolyglot.org/touch-icon-iphone-retina.png");
      allFavIcons.indexOf("http://hyperpolyglot.org/favicon.gif").should.not.equal(-1);
      allFavIcons.indexOf("http://hyperpolyglot.org/touch-icon-iphone-retina.png").should.not.equal(-1);
      allFavIcons.indexOf("http://hyperpolyglot.org/touch-icon-ipad-retina.png").should.not.equal(-1);
      done();
    });
  });
  
  it("can handle https protocol", function(done) {
    favicon("https://github.com/sentientwaffle/gift", function(err, url, allFavIcons) {
      if (err) return done(err);
      url.should.eql("https://github.com/apple-touch-icon-114.png")
      allFavIcons.indexOf("https://assets-cdn.github.com/favicon.ico").should.not.equal(-1);
      allFavIcons.indexOf("https://github.com/apple-touch-icon-144.png").should.not.equal(-1);
      allFavIcons.indexOf("https://github.com/apple-touch-icon-114.png").should.not.equal(-1);
      allFavIcons.indexOf("https://github.com/favicon.ico").should.not.equal(-1);
      allFavIcons.indexOf("https://github.com/fluidicon.png").should.not.equal(-1);
      done();
    });
  });
  
  it("handles single quotes", function(done) {
    favicon("http://hashrocket.com/articles", function(err, url, allFavIcons) {
      if (err) return done(err);
      
      url.should.eql("http://d15zqjc70bk603.cloudfront.net/apple-touch-icon-144x144-precomposed.png");
      allFavIcons.indexOf("http://d15zqjc70bk603.cloudfront.net/apple-touch-icon-57x57-precomposed.png").should.not.equal(-1);
      allFavIcons.indexOf("http://d15zqjc70bk603.cloudfront.net/apple-touch-icon-144x144-precomposed.png").should.not.equal(-1);
      allFavIcons.indexOf("http://d15zqjc70bk603.cloudfront.net/apple-touch-icon-72x72-precomposed.png").should.not.equal(-1);
      allFavIcons.indexOf("http://d15zqjc70bk603.cloudfront.net/apple-touch-icon-114x114-precomposed.png").should.not.equal(-1);
      allFavIcons.indexOf("http://d15zqjc70bk603.cloudfront.net/favicon.png").should.not.equal(-1);
      done();
    });
  });
});
