const User = require('../models/user')
const Business = require('../models/business')
const Twitter = require('twitter')
require("dotenv").config({
  path: '../.env'
});

//getting api keys 
var keys = require("../keys");

var client = new Twitter(keys.twitter);

//set up to find business by Id

module.exports = {
  index: (req, res, next) => {
    if (req.user.id) {
      User.findById(req.user.id)
        .then(user => res.json({
          user
        }))
        .catch(err => next(err));
    } else {
      Business.findById(req.user.id)
      console.log(req.user.id)
        .then(business => res.json({
          business
        }))
        .catch(err => next(error))

    }
  }
}

function myTweets() {
  console.log("Stay off Twitter!");
  client.get('search/tweets', {
    q: 'fully_coded',

  }, function (error, tweets, response) {
    console.log(tweets);
    for (i = 0; i < tweets.statuses.length; i++) {
      if (i === 21) {
        break;

      }
      // log the actual tweet
      console.log(tweets.statuses[i].text);
      // logs when the tweet was created
      console.log(tweets.statuses[i].created_at);

    }

  });
}

//myTweets();

function getMyFollowers() {
  console.log("Here are the Walkers!");
  client.get('followers/list', {
    screen_name: 'fully_coded',
    count: 200,


  }, function (error, followers, response) {
    console.log(followers.users.length);
    for (i = 0; i < followers.users.length; i++) {
     
      

    }

  });
}

getMyFollowers();