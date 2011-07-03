// IMDB -- backend.js
var http    = require('blaast/simple-http');
var QS = require('querystring');
var _ = require('underscore');
var scaling = new (require('blaast/scaling').Scaling)();


app.message(function(client, action, data) {
	if (action === 'search') {
	//http://www.imdbapi.com/?t=dark%20night&plot=short&tomatoes=true
  //http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20music.track.search%20where%20keyword%3D%22kangen%20band%22&format=json&diagnostics=true&callback=cbfunc
		var param = {format: 'json', q: 'select * from music.track.search where keyword="'+data.title+'", diagnostics:'true', callback:'cbfunc'};
//		if (data.year && data.year.length !== 0) {
//			param = _.extend(param, {y: data.year});
//		}
		var url = "http://query.yahooapis.com/v1/public/yql?" + QS.stringify(param);
		console.log('url : ' + url);
		http.get(url, { type: 'binary' }, {
			ok: function(data) {
				console.log(data);
				data = JSON.parse(data);
				client.msg('search', data);
			},
			error: function(err) {
				client.msg('search', {error: err});
			}
		});
		
	}
});


app.setResourceHandler(function(request, response) {

	app.debug('Client requested resource-id=' + request.id);

	function sendReply(response, error, imageType, data) {
		if (error) {
			app.warn('Failed to load image: ' + error);
			response.failed();
		} else {
			app.debug('Loaded image.');
			response.reply(imageType, data);
		}
	}
	
	scaling.scale(request.id, request.display_width, request.display_height, 'image/jpeg',
		function(err, data) {
			sendReply(response, err, 'image/jpeg', data);
		}
	);
});
