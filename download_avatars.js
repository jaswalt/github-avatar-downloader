var request = require('request');
var GITHUB_USER = "jaswalt";
var GITHUB_TOKEN = "24ceafb8196410add9a17479e722b322bc3ea0cb";
var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

function getRepoContributors(repoOwner, repoName, cb) {

}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});