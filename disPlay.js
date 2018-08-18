const chalk = require('chalk');
const chalkAnimation = require('chalk-animation');
var figlet = require('figlet');

var roster = [];
var address;
var track;

//TODO: General optimizations, potentially using node Terminal-kit instead of chalkAnimation
//TODO: Display requests from Socket.io

function notifier(client) {
  if (!roster.includes(client)) {
    roster.push(client);
    chalkAnimation.rainbow(client.name + " Connected!");
    reset();

  } else {
    chalkAnimation.pulse(client.name + " left...");
    var i = roster.indexOf(client);
    roster.splice(i, 1);
    reset();

  }

  function reset() {
    setTimeout(() => {
      header(address);
    }, 5000);
  }

  return roster;
}

function updater(currentTrack) {
  track = currentTrack;
  header(address);
  return currentTrack.StreamTitle;
}

function header(host) {
  setTimeout(() => {
    var serverTitle = "Now Playing: " + track.StreamTitle.replace(/[^a-zA-Z ]/g, "");
    if (serverTitle.length >= process.stdout.columns) {
      chalkAnimation.neon(serverTitle.substring(0, process.stdout.columns));
    } else {
      chalkAnimation.neon(serverTitle);
    }
  }, 1000);
  address = host;
  process.stdout.write('\033c\033[3J');
  figlet.text('Strayve', {
    font: 'Slant',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  }, function(err, data) {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    process.stdout.write(data);
    process.stdout.write(chalk.bgMagenta("\n        Node powered Silent Disco       "));
    process.stdout.write(chalk.bgMagenta.bold("\n  Server is live at " + host.ip + ":" + host.port+"  \n"));
    if (!roster.length) {
      process.stdout.write(chalk.bgWhite.grey("         No Clients connected           \n"));
    }
    else {
      console.log(chalk.bgGreen.bold("           Connected Clients:           "));
      roster.forEach(function(clint) {
        console.log(chalk.bgGreen(clint.name));
      });
    }
  });

}

process.on('SIGINT', function() {
    process.stdout.write('\033c\033[3J');
    console.log(chalk.yellow(" -SHOW OVER-"));
    process.exit();
});

module.exports = {
  notify: notifier,
  update: updater,
  start: header
};
