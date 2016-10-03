/**
*@define dependencies
*/
var express = require('express')
,app = express()
,cors = require('cors')
,http = require('http').Server(app)
,port = process.env.PORT||4002
,bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('./app'));
app.use('/',function(req,res){
  console.log(req.url);
});
http.listen(port,function(){
  console.log('server started at'+port);
});
