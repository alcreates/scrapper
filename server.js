var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static('app/public'));



//Database configuration
mongoose.connect('mongodb://localhost/scrapper');
var db = mongoose.connection;

db.on('error', function (err) {
console.log('Mongoose Error: ', err);
});
db.once('open', function () {
console.log('Mongoose connection successful.');
});

var Note = require('./app/model/Note.js');
var Article = require('./app/model/Article.js');

app.get('/', function(req, res){

	res.send(index.html);
});
//scrapes the website for titles and content. Then populates database with scraped information.
app.get('/scrape', function(req, res){
	request('http://www.techcrunch.com/', function(error, response, html){
		var $ = cheerio.load(html);
		$('.block-content').each(function(i, element){

			var result = {};

			result.title = $(this).children('h2').text();
			console.log("this is the title : " + result.title);
			result.content = $(this).children('p').text();
			console.log("this is the content : " + result.content)
			var entry = new Article(result);

			entry.save(function(err, doc){
				if(err){
					console.log(err);
				}else{
					console.log(doc);
				}
			});

		});
	});
	res.send("Scrape Complete");

});
//gets all the articles scraped and sends then to client. 

app.get('/articles', function(req, res){
	Article.find({}, function(err, doc){
		if (err){
			console.log(err);
		} else {
			res.json(doc);
		}
	});
});
//populates the artical documents with notes. 
app.get('/articles/:id', function(req, res){
	Article.findOne({'_id': req.params.id})
	.populate('note')
	.exec(function(err, doc){
		if(err){
			console.log(err);
		}else{
			res.json(doc);
		}
	});
});
// creates a new note or updates existing note. //this needs to be attached to the save button. 
app.post('/articles/:id', function(req, res){
	var newNote =new Note(req.body);
	newNote.save(function(err, doc){
		if(err){
			console.log(err);
		}else{
			Article.findOneAndUpdate({'_id': req.params.id}, {'note': doc_id})
			.exec(function(err, doc){
				if(err){
					console.log(err);
				}else {
					res.send(doc);
				}
			});
		}
	});
});









app.listen(3000, function() {
  console.log('App running on port 3000!');
});
