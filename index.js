/**
*@define dependencies
*/
var cors = require('cors')
var express = require('express')
,app = express()
,port = process.env.PORT||4003
,bodyParser = require('body-parser');
app.all('/*', function (request, response, next) {
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Headers", "X-Requested-With");
        response.header("Access-Control-Allow-Methods", "GET, POST", "PUT", "DELETE");
        next();
    });
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('./app'));
app.use('/',function(req,res){
  console.log(req.url);
});
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
//     res.setHeader("Access-Control-Allow-Credentials",true);
//     if ('OPTIONS' === req.method) {
//         res.status(200).send();
//     }
//     else {
//         next();
//     }
// });
app.listen(port,function(){
  console.log('server started at'+port);
});
