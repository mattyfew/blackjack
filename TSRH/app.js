var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');
var urlencodedBodyParser = bodyParser.urlencoded({
	extended: false
});
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('tsrh.db');
var methodOverride = require('method-override');

app.use(urlencodedBodyParser);
app.set('view_engine', 'ejs');
app.use(methodOverride('_method'));

app.use(express.static('public'));
db.run('PRAGMA foreign_keys=ON;');

app.get('/tsrh/new', function (req, res) {
	res.render('new.ejs');
});
app.get('/tsrh/:id/edit', function (req, res) {
	var id = req.params.id;
	db.get('SELECT * FROM threads WHERE id=?', id, function (err, rows) {
		if (err) {
			throw err;
		} else {
			res.render('edit.ejs', {
				threads: rows
			});
		}
	});
});

//SHOW GET MASTER
app.get('/tsrh/:id', function (req, res) {
	var id = req.params.id;
	db.all('SELECT * FROM threads INNER JOIN users ON author_id WHERE threads.author_id = users.user_id AND id=?', id, function (err, rows) {
		if (err) {
			throw err;
		} else {
			db.all('SELECT * FROM comments WHERE thread_id = ?', id, function (err, cmmnts) {
				if (err) {
					throw err;
				} else {
					res.render('show.ejs', {
						thread: rows,
						cmmnts: cmmnts,
					});
				}
			});
		}
	});
});

/*APP.POST --> will post to the main thread page. First it grabs ddselectedvalue,
it inserts username into the users table, then it creates the post using this.lastId
to create the relationship.*/
app.post('/tsrh', function (req, res) {
	//in jquery.ddslickback.min.js, made edit on line 96
	var ddslick = req.body.mf_dd_selected_value;
	var userName = req.body.author_name;

	db.run('INSERT INTO users (username) VALUES (?)', userName, function (err) {
		if (err) {
			throw err;
		} else {
			var id = this.lastID;
			db.run('INSERT INTO threads (title, subtitle, author_id, topic_img_url, content, total_upvotes) VALUES (?,?,?,?,?,?)', req.body.thread_title, req.body.thread_subtitle, id, ddslick, req.body.thread_content,0, function (err) {
				if (err) {
					throw err;
				} else {
					res.redirect('/tsrh');
				}
			});
		}
	})
});

//PUT Total upvotes for each thread
//app.get('/tsrh/:id', function(req,res){
//	var id = req.params.id;
//	db.run("UPDATE threads SET upvotes = upvotes+1 WHERE id=?", id, function(err){});
//}

//POST upvotes
app.put('/tsrh/:id/upvote', function (req, res) {
	var id = req.params.id;
	db.run('INSERT INTO upvotes (thread_id) VALUES (?)', id, function (err) {
		if (err) {
			throw err;
		} else {
			res.redirect('/tsrh/' + id);
		}
	})
})

//COMMENT POST --> this will post a comment from each different post
app.post('/tsrh/:id', function (req, res) {
	var id = req.params.id;
	db.run('INSERT INTO comments (comment_author_id, content, thread_id) VALUES (?,?,?)', req.body.comment_author_name, req.body.comment_content_name, id, function (err, rows) {
		if (err) {
			throw err;
		} else {
			res.redirect('/tsrh/' + id);
		}
	})
})
app.delete('/tsrh/:id', function (req, res) {
	//Not sure if I need this, only for admin
	db.delete('SELECT * FROM threads', function (err, rows) {
		if (err) {
			throw errs;
		} else {
			res.redirect('/tsrh');
		}
	});
});
app.get('/tsrh', function (req, res) {
	db.all('SELECT * FROM threads INNER JOIN users ON author_id WHERE threads.author_id = users.user_id', function (err, rows) {
		if (err) {
			throw err;
		} else {
			res.render('index.ejs', {
				threads: rows,
			});
		}
	})
})

app.post('/tsrh/:id/upvote', function(req,res){
	var id = req.params.id;
	db.run("UPDATE threads SET total_upvotes = total_upvotes+1 WHERE id=?", id, function(err,row){
		if(err){
			throw err;
		} else {
			console.log(row)
			res.redirect('/tsrh/' + id);
		}
	});
})

app.get('/', function (req, res) {
	res.redirect('/tsrh');
});
app.listen(3000, function (err) {
	console.log('listening on port 3000 bitch');
});
