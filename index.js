/**
*@define dependencies
*/
var express = require('express')
,app = express()
,http = require('http').Server(app)
// ,io = require('socket.io')(http)
,port = process.env.PORT||4001
,bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static('./app'));
app.use('/',function(req,res){
  console.log(req.url);
});
http.listen(port,function(){
  console.log('server started at'+port);
});
