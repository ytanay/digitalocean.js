var doa = DigitalOcean = {

	base: 'https://api.digitalocean.com/v1/',

	__responseSuccess: function(response, callback){
		//assume we have already parsed the response as JSON
		if(response.status !== 'OK')
			return callback(response);
		else //else not necessary here - but pretty nevertheless
			return callback(null, response);
	},

	__responseFail: function(error, callback){
		if(error === 'Unauthorized')
			return callback('digitalocean authentication failed - perhaps you have the wrong key?');
		return callback('digitalocean: unknown error: ' + error);
	},

	extend: function(data){
		data.client_id = doa.auth.client_id;
		data.api_key = doa.auth.api_key;
		return data;
	},

	request: function(uri, data, done){
		if(!doa.auth || !doa.auth.client_id || !doa.auth.api_key)
			done('digitalocean: not initialized - please use doa.init()!');

		if(!done){ //jumble around our args
			done = data;
			data = {};
		}

		if(jQuery){
			jQuery.getJSON(base + uri, jQuery.extend(doa.auth, data))
				.done(function(response){
					doa.__responseSuccess(response, done);
				})
				.fail(function(xhr, status, error){
					doa.__responseFail(error, done);
				});
		} else if(require) {
			var request = require('request');
			request(base + uri, doa.extend(data), function(err, res, contents){
				if(err)
					return done('digitalocean: request error: ' + err);
				if(response.statusCode !== 200)
					return doa.__responseFail(body, done);
				else return doa.__responseSuccess(body, fonr);
			});
		}
	},

	init: function(id, key){
		doa.auth = {
			client_id: id,
			api_key: key
		};
		doa.ready = true;
	},

	droplets: {
		all: function(done){
			doa.request('droplets/', done);
		},
		create: function(data, done){
			doa.request('droplets/new', data, done);
		},
		get: function(id, done){
			doa.request('droplets/' + id, done);
		},
		reboot: function(id, done){
			doa.request('droplets/' + id + '/reboot/');
		},
		cycle: function(id, done){
			doa.request('droplets/' + id + '/power_cycle/');
		},
		shutdown: function(id, done){
			doa.request('droplets/' + id + '/shutdown/');
		},
		off: function(id, done){
			doa.request('droplets/' + id + '/power_off/');
		},
		on: function(id, done){
			doa.request('droplets/' + id + '/power_on/');
		},
		snapshot: function(id, name, done){
			doa.request('droplets/' + id + '/snapshot/', {name: name}, done);
		},
		restore: function(id, image, done){
			doa.request('droplets/' + id + '/restore/', {image_id: image}, done);
		},
		rebuild: function(id, image, done){
			doa.request('droplets/' + id + '/rebuild/', {image_id: image}, done);
		},
		rename: function(id, name, done){
			doa.request('droplets/' + id + '/rename/', {name: name}, done);
		},
		destroy: function(id, done){
			doa.request('droplets/' + id + '/destroy/', done);
		},
	},

	images: {
		all: function(done){
			doa.request('images/', done);
		},
		get: function(image, done){
			doa.request('images/' + image, done);
		},
		destroy: function(image, done){
			doa.request('images/' + image + '/destroy/', done);
		},
		transfer: function(image, region, done){
			doa.request('images/' + image + '/transfer/', region, done);
		}

	},

	regions: function(done){
		doa.request('regions/', done);
	},

	sizes: function(done){
		doa.request('sizes/', done);
	},

	event: function(id, done){
		doa.request('events/' + id + '/', done)
	}

};

if(module && module.exports){ // if we are in a node environment
	module.exports = DigitalOcean; //export our DigitalOcean object
} else  { // otherwise, we are probably in a browser environment
	window.DigitalOcean = DigitalOcean; // in theory, this isn't necessary, as unscoped functions are inherently global
}