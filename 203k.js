//
//  RTD2 - Twitter bot that tweets about the most popular github.com news
//  Also makes new friends and prunes its followings.
//
var Twit = require('twit')
  , config1 = require('./config')
  , markov = require('markov');

var T = new Twit(config1);
var M = markov(1);

console.log('RTD2: Running.');

//get date string for today's date (e.g. '2011-01-01')
function datestring () {
  var d = new Date(Date.now() - 5*60*60*1000);  //est timezone
  return d.getUTCFullYear()   + '-'
     +  (d.getUTCMonth() + 1) + '-'
     +   d.getDate();
};

setInterval(function() {
T.get('statuses/home_timeline', function(err, data, response) {
  //console.log(data);
  var seed = '';
  for (s in data) {
    //console.log(data[s].text);
    var myRegex = new RegExp("(http|ftp|https):\/\/.*");
    seed += data[s].text.replace(myRegex,"");
  };
  M.seed(seed, function() {
    var message = M.respond(data[0].text, (Math.random() * 10) + 3 ).join(' ');
    console.log(message);
  });
});
}, 10000);

function handleError(err) {
  console.error('response status:', err.statusCode);
  console.error('data:', err.data);
}
