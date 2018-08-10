var fs = require('fs');
var program = require('commander');
var inquirer = require('inquirer');
var ip = require('ip');
var display = require('./disPlay');

var urlcheck = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);
var configuration;
var questions = [{
  type: 'input',
  name: 'url',
  message: "Enter a Shoutcast URL: ",
  validate: function(value) {
    var pass = value.match(urlcheck);
    if (pass) {
      return true;
    }
    return 'invalid URL';
  }
}];

exports = module.exports = startApp;

function startApp() {
  /**
   * Fire up Commander to get those command line arguments
   */
  program
    .version('0.0.1')
    .arguments('<streamURL>')
    .action(function(streamURL) {
      stream = streamURL;
      setting(streamURL);
    })
    .parse(process.argv)

  if (typeof stream === 'undefined' || !(stream.match(urlcheck))) {
    inquirer.prompt(questions).then(answers => {
      setting(answers.url);
    });
  }
  /**
   * Then start by putting our server's IP in a place where our Client can get it, this can include other credentials.
   * Store this in a configuration object which the main application can access at any time after initialization.
   */
  function setting(surl) {
    configuration = {
      ip: ip.address(),
      port: (process.env.PORT || '3000'),
      url: surl
    }

    display.start(configuration);
    exports.config = configuration;

    fs.writeFile("tmp/connect.json", JSON.stringify(configuration), function(err) {
      if (err) {
        return console.log(err);
      }
    });
  }

}
