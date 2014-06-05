digitalocean.js
===============

A Node.js/browser API implementation for [DigitalOcean](https://developers.digitalocean.com/).
 
# Getting Started
Install the module via [npm](https://www.npmjs.org/package/digitalocean.js) with: `npm install digitalocean.js`

```javascript
var doa = require('digitalocean.js');
```
## Documentation

### Quick Reference:
- [Setup](#setup)
- [Sending a Simple Email](#sending-a-simple-email)
- [Sending Raw HTML](#sending-raw-html)
- [Sending a Pretty Jade Template](#sending-a-pretty-jade-template)
- [One Last Thing](#one-last-thing)

### Setup
Start by initializing the api. Pass your access key for DigitalOcean like so:
```javascript
doa.init('9784654897453132165', 'shhhh+its/asecrettttttttt+42')
```

### API Structure
The structure of the API is rather self-explenatory. It mirrors the DigitalOcean's API guide.

#### Droplets
```javascript
doa.droplets.all(cb) //returns a list of all active droplets
doa.droplets.create(data, cb) //creates a new droplet
doa.dropelets.get(id, cb) //fetches a droplet's details
doa.droplets.reboot(id, done) //reboots a droplet
doa.droplets.cycle(id, done) //does a power cycle
doa.droplets.shutdown(id, cb) //shutdown a droplet
doa.droplets.off(id, cb) //turn a droplet off
doa.droplets.on(id, cb) //turn a droplet on
doa.dropelets.snapshot(id, imageName cb) //creates a new image from a droplet
doa.droplets.restore(id, image, done) //restores a droplet using an image
doa.droplets.rebuild(id, image, done) //rebuilds a droplet using an image
doa.dropelets.rename(id, newName, cb) //rename a droplet
doa.droplets.destroy(id, done) //remove a droplet
```
The same goes for images, events, regions, and sizes - take a peek at the source to see all the different API calls.

## License
Copyright (c) 2014 Yotam Tanay. Licensed under the MIT license.
