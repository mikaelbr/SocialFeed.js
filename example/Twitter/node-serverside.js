/**
 * A very naive/simple server-side tweet fetch-server. 
 * 
 * This is needed because of Twitters API rules. 
 * It is a sort of proxy, serving the tweets of a user to SocialFeed.js
 * 
 * Host on your server, or in the cloud (e.g. Heroku)
 */
var http = require('http')
  , url = require('url')
  , util = require('util')
  , Twit = require('twit') // npm install twit
  ;

var port = process.env.PORT || 3000
  , T = new Twit({
      consumer_key:         '..'
    , consumer_secret:      '...'
    , access_token:         '...'
    , access_token_secret:  '...'
  }) 
  , username = 'mikaelbrevik'
  ;

http.createServer(function (req, res) {
  var _query = url.parse(req.url, true).query

  _query.screen_name = username;
  var callback = _query.callback;
  delete _query.callback;
  delete _query._;

  T.get('/statuses/user_timeline', _query, function(err, reply) {
    if (err) {
      res.writeHead(500, {'Content-Type': 'application/json'});
      res.write(JSON.stringify({ 
        error: err
      }));
      res.end();
      return;
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(callback + '(' + JSON.stringify(reply) + ')');
    res.end();
  })
}).listen(port);


console.log('Server running at http://127.0.0.1:'+port+'/');
