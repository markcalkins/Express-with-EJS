// require needed modules and create app variable
var express = require('express'),
    fs = require('fs'),
    app = express();

var ejs = require('ejs');
ejs.open = '{{';
ejs.close = '}}';

// set ejs as template engine
app.set('view engine', 'ejs');

// set up app to serve up the css
app.use('/public', express.static(__dirname + '/public'));

// add local variables that can be used in views and throughout app by passing object to app.locals()
app.locals.title = 'Express with EJS';

// loading posts from a json file before responding to routes
app.all('*', function(req, res, next){
   fs.readFile('posts.json', function(err, data){
      res.locals.posts = JSON.parse(data);
      next();
   });
});

// tell express what ejs file to send
app.get('/', function(req, res){ 
   res.render('index.ejs');
});

// listen for requests for a specific blog post by looping through the posts array to find a match 
app.get('/post/:blog', function(req, res, next){ 
   res.locals.posts.forEach(function(post){
      if (req.params.blog === post.blog){
         res.render('post.ejs', {
            post: post 
         });
      }
   })
});

app.listen(3000);
console.log('listening on port 3000');
