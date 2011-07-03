var _ = require('common/util');
var ImageView = require('ui').ImageView;
var app = this;


_.extend(exports, {
	
	':state': function(param) {
		var self = this;
		self.get('header').get('pic-box').clear();
		self.get('header').get('pic-box').add('pic', new ImageView({
			style: {
				width: 84,
				height: 84
			}
		}));
		self.get('header').get('pic-box').get('pic').resource(param.Poster);
		
		self.get('header').get('title-box').get('title').label(param.Title);
		self.get('header').get('title-box').get('year').label(param.Year);
		self.get('header').get('title-box').get('rating').label('Rating: ' + param.Rating);
		
		self.get('genre').label('Genre: ' + param.Genre);
		self.get('released').label('Released: ' + param.Released);
		self.get('rated').label('Rated: ' + param.Rated);
		self.get('runtime').label('Runtime: ' + param.Runtime);
		self.get('director').label('Director: ' + param.Director);
		self.get('writer').label('Writer: ' + param.Writer);
		self.get('actors').label('Actors: ' + param.Actors);
		self.get('plot').label('Plot: ' + param.Plot);
	},
	
	':keypress': function(key) {
		if (this.index === undefined) {
			if (this.size() > 0) {
				this.focusItem(0);
			}
		} else if (key === 'up' || key === 'down') {
			var next = this.index + (key === 'up' ? -1 : 1);

			if (next < 0) {
				next = 0;
			} else if (next > (this.size()-1)) {
				next = this.size()-1;
			}

			if (this.index === next) {
				return;
			}

			this.focusItem(next);
		} else if (key === 'fire') {
			this.get(this.index).emit('activate');
		}
	},
	
	focusItem: function(index) {
		if (this.index !== undefined) {
			this.get(this.index).emit('blur');
		}

		this.index = index;
		this.get(index).emit('focus');
		this.scrollTo(index);
	}
});