var request = require('request');
var fs = require('fs');

var GITHUB_USER = "jaswalt";
var GITHUB_TOKEN = "24ceafb8196410add9a17479e722b322bc3ea0cb";

var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

console.log('Welcome to the Github Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  // create valid url

  if (repoOwner == null || repoName == null) {
    console.log("Error: Please input repo owner and repo name.");
    return;
  }

  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  // fetch the list of contributors via HTTPS
  var options = {
    url: requestURL,
    method: 'get',
    headers: {
      'User-Agent': 'request'
    }
  };

  // defining callback function
  function callbackForRequestModule(error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      // cb is the callback passed in; and it takes in 2 arguments
      // cb => function(err, result)
      // good place to execute a callback is where we have access to the data it needs
      cb(error, data);
    }
  }

  // HTTPS request to GitHub
  request(options, callbackForRequestModule);
};

var cbInsideOfGetRepoContributors = function(err, contributors) {
  console.log("Errors:", err);
  console.log("Contributors:", contributors);
  var avatarURLs = [];
  for (i = 0; i < contributors.length; i++) {
    avatarURLs.push(contributors[i].avatar_url);
    downloadImageByURL(contributors[i].avatar_url, 'avatars/' + contributors[i].login + '.jpg')
  }
};

// takes in 3 arguments; first 2 arguments are to build the URL
// third argument is for getting contributors from github API
getRepoContributors(repoOwner, repoName, cbInsideOfGetRepoContributors);


function downloadImageByURL(url, filePath) {
  // The function will make a request to a given url, saving the resulting image file to a specified filePath.
  request.get(url)
         .pipe(fs.createWriteStream(filePath));
}