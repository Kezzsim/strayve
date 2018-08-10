# Strayve.io
Node powered silent disco, tune in from your phone.

Open source software by @kezzism (Kari A Barry). Detailed dependency list to come.

## This is the first push - if you are reading this the software kinda works but it is not ready for primetime. We’re just setting up to have our work saved to a repository and collaborated on. That being said if you want to try it in this state here’s a few things you should know:
- Only built / run / tested in MacOS High Sierra
- Even the first public release of this software will require a Shoutcast / Icecast server running elsewhere to get music into Strayve. **The stream must be in MP3 format** although we are working on OGG support, that means if you plan on using Traktor, try to use a tool like [Broadcast Using This Tool](https://danielnoethen.de/) to route the audio into an mp3 compressed stream. We are considering building in a node based Icecast server but currently we are trying to keep the package size down and the runtime light, we might also start piping in local audio sources with OS dependent input libraries if that feature is requested enough.
- The URL to an Shoutcast / Icecast server **must** be included as an argument when you start the server eg. `strayve {server URL}`

That being said, if you’re feeling lucky; clone our code to your machine, navigate to the folder and hit `npm install` followed by `node start `npm start 'http://momori.animenfo.com:8000'` !

### TODO NOW:
- [x] Replace art for initial push
- [x] gitignore node-modules
- [x] Push raw code to GitHub for version 0.0.1
- [ ] Create the website, make gh-pages branch
- [ ] Actually finish readme with info from the site
- [ ] get project on NPM
- [ ] Setup CI testing

### Larger scope TODO:
- [ ] user configurable album art, artist and album fields
- [ ] Cleaning of unused modules that were bundled with Express-CLI
- [ ] Requests - adding a request box via foundation on the client side, requests show up next to client names in the terminal.
- [ ] SYNCHRONIZATION - find a way to synchronize client playback of the mp3 stream or switch over to piping binary data through the web sockets. Neither option seems feasible right now.
- [ ] Captive portal feedback - the execution is so much better with a captive audience, attempt to use Chilispot, Sputnik or other methods running on an access point to redirect towards Strayve.
