const url = require('url');
const http = require('http');
var path = require('path');
const express = require('express');
var qs = require('querystring');
var bodyParser=require('body-parser')
const mysql = require('mysql');
var fs = require('fs')
var cheerio = require('cheerio');

var urlencodedParser=bodyParser.urlencoded({extended:false});


const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: "scoreboard"
});

function refresh(){
  var topFive = [];
  con.query("SELECT * FROM `players` ORDER BY `score` DESC", function (err, result, fields) {//result[0].score vypíše skóre prvního hráče
    if (err) throw err;
    for(var i=0;i<5;i++){
      topFive[i]=i+1+"."+result[i].nick+" "+result[i].score;
    }
    var htmlPath = __dirname + '/index.html';
    var outPath = __dirname + '/index.html';
    fs.readFile(htmlPath, {encoding: 'utf8'}, function(error, data) {
    var $ = cheerio.load(data); // load in the HTML into cheerio
    $('.board').each(function(i, elem) {
      $(this).text(topFive[i]);
    });
  
    fs.writeFileSync(outPath, $.html(), {encoding: 'utf8'}, data, (error) => { console.log(error)});
  });
  });
}


const app = express();

app.use(express.static('source'));
app.listen(process.env.PORT || 3000, () => {
  console.log('listening on 3000');
});



app.get('/', (req, res) => {
  refresh();
  setTimeout(function(){  res.sendFile(path.join(__dirname, 'index.html')); }, 1000);
});

app.post('',urlencodedParser, function(req,res) {
    var sql = "INSERT INTO players (nick, score) VALUES ('"+req.body.nick+"','"+req.body.score+"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
    refresh();
    setTimeout(function(){  res.sendFile(path.join(__dirname, 'index.html')); }, 1000);
});
