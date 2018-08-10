var addr;
$.getJSON("tmp/connect.json", function(data) {
  addr = (data.ip + ':' + data.port);

  var socket = io.connect('http://' + addr);
  ntp.init(socket);
  // setInterval(function() {
  //   $('#albumTitle').text(ntp.offset());
  // }, 1000);
  socket.on('nowPlaying', function(trknm) {
    $("#currentTitle").text(trknm);
    //TODO: Waiting for future release of Amplitude with setMetaData method
    //Amplitude.setMetaData(0, {'title': trknm});
  });

  socket.on('peerList', function(peers) {
    peers.forEach(function(peer) {
      console.log(peer.name);
    });
  });

  Amplitude.init({
    "bindings": {
      37: 'prev',
      39: 'next',
      32: 'play_pause'
    },
    "songs": [{
      "name": "Strayve : Silent Disco",
      "artist": "Strayve",
      "album": "Strayve",
      "url": "stream.mp3",
      "genre": "Disco",
      "live": true,
      "cover_art_url": "/img/AlbumCover.jpg"
    }]
  });

  // Actually does something : No network until Play is pressed
  $(Amplitude.audio()).attr("preload", "none");
  Amplitude.audio().oncanplay = function() {

  };

  window.onkeydown = function(e) {
    return !(e.keyCode == 32);
  };

  //The lines below may be boilerplate / supurfluous 
  window.addEventListener('touchstart', function() {

    // create empty buffer
    var buffer = myContext.createBuffer(1, 1, 22050);
    var source = myContext.createBufferSource();
    source.buffer = buffer;

    // connect to output (your speakers)
    source.connect(myContext.destination);

    // play the file
    source.noteOn(0);

  }, false);

});
