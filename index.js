/**
*@define dependencies
*/
// var allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//     // intercept OPTIONS method
//     if ('OPTIONS' == req.method) {
//       res.send(200);
//     }
//     else {
//       next();
//     }
// };
// Enables CORS
// var enableCORS = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//
//     // intercept OPTIONS method
//     if ('OPTIONS' == req.method) {
//       res.send(200);
//     }
//     else {
//       next();
//     }
// };
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials','true');
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(204);
    }
    else {
      next();
    }
};
var express = require('express')
  , cors = require('cors')
  , app = express()
,port = process.env.PORT||4004
,bodyParser = require('body-parser');
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
//   next();
// });
// enable CORS!
// app.use(enableCORS);
//--------------------------------------------------------------------------------
app.use(allowCrossDomain);
app.use(cors());
app.options('*',cors());
app.use(bodyParser.json());
app.use(express.static('./app'));
app.use('/',function(req,res){
  console.log(req.url);
});
app.listen(port,function(){
  console.log('server started at'+port);
});
