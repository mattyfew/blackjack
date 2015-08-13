var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');
var urlencodedBodyParser = bodyParser.urlencoded({extended:false});
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('tsrh.db');
var methodOverride = require('method-override');

app.use(urlencodedBodyParser);
app.set('view_engine','ejs');
app.use(methodOverride('_method'));

app.use(express.static('public'));

app.get('/tsrh/new', function(req,res){
  
  res.render('new.ejs');
});



app.get('/tsrh/:id/edit', function(req,res){
  var id = req.params.id;
  db.get('SELECT * FROM threads WHERE id=?', id, function(err,rows){
    if(err){
      throw err;
    } else {
      res.render('edit.ejs', {threads:rows});
    }
  });
});
app.get('/tsrh/:id', function(req,res){
//  var id = req.params.id;
//  //Do I need this? admin only
//  db.run('UPDATE threads SET title=?, syb')
//  if(err){
//    throw err;
//  } else {
//    res.redirect('/tsrh'+id)
//  }
});
app.post('tsrh', function(req,res){
//  db.run('INSERT INTO threads (title,subtitle,author_id,content,topic_img_id) VALUES (?,?,?,?,?)',
//        req.body.)//need these values!
//  if(err){
//    throw err;
//  } else {
//    res.redirect('/tsrh');
//  }
})
app.delete('/tsrh/:id', function(req,res){
  //Not sure if I need this, only for admin
  db.delete('SELECT * FROM threads', function(err,rows){
    if (err){
      throw errs;
    } else {
      res.redirect('/tsrh');
    }
  });
});
app.get('/tsrh', function(req,res){
  db.all('SELECT * FROM threads', function(err,rows){
    if(err){
      throw err;
    } else{
      res.render('index.ejs'); //add {threads:rows}
    }
  })
})
app.get('/',function(req,res){
  res.redirect('/tsrh');
});

app.listen(3000,function(err){
  console.log('listening on port 3000 bitch');
});