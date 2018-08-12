var icy = require('icy');
var lame = require('lame');
const path = require('path');
var ntp = require('socket-ntp');
var Moniker = require('moniker');
var Speaker = require('speaker');
var socket = require('socket.io');
var display = require('./disPlay');

var here = path.join(path.dirname(require.main.filename),'..');
var names = Moniker.generator([Moniker.adjective, path.join(here, 'res', 'friendsname.txt')]);

exports = module.exports = broadCast;

function broadCast(conf, serv, app) {
  var currentTrack = {
    StreamTitle : "Loading"
  };
  var fmt;
  var decoder = lame.Decoder();
  decoder.on('format', function(format) {
    fmt = format;
  });
  var encoder = lame.Encoder(fmt);
  encoder.on("data", function(chunk) {
    //io.sockets.send(chunk);
  });
  icy.get(conf.url, function(res) {
    res.on('metadata', function(metadata) {
      currentTrack = icy.parse(metadata);
      io.sockets.emit('nowPlaying', display.update(currentTrack));
    });

    res.pipe(decoder)
       .pipe(encoder);
  });
  //TODO: Test latency issues with Terminal speaker output
  //decoder.pipe(new Speaker());

  app.get('/stream.mp3', function(req, res) {
    res.set({
      'Content-Type': 'audio/mpeg3',
      'Transfer-Encoding': 'chunked'
    });
    encoder.pipe(res);
  });

  //Start the socket server
  var io = socket(serv);
  //Handle client connections
  io.on('connection', function(socket) {
    ntp.sync(socket);
    var client = {
      id: socket.id,
      name: names.choose()
    };
    socket.emit('nowPlaying', currentTrack.StreamTitle);
    //Notify on Join, push list of connected clients
    io.emit('peerList', display.notify(client));

    socket.on('disconnect', function() {
      //Notify on leave, update list of connected clients
      io.emit('peerList', display.notify(client));
    });
  });



}
