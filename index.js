/**
*@define dependencies
*/
// var allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'example.com');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//
//     next();
// }
var express = require('express')
  , cors = require('cors')
  , app = express()
,port = process.env.PORT||4004
,bodyParser = require('body-parser');
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});
app.use(cors({credentials: true, origin: true}));
app.options('*',cors());
app.use(bodyParser.json());
app.use(express.static('./app'));
app.use('/',function(req,res){
  console.log(req.url);
});
// app.use(allowCrossDomain);
app.listen(port,function(){
  console.log('server started at'+port);
});
