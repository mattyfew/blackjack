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





app.get('/tsrh', function(req,res){
  res.render('index.ejs');
})

app.get('/',function(req,res){
  res.redirect('/tsrh');
});

app.listen(3000,function(err){
  console.log('listening on port 3000 bitch');
});