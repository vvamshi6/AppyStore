/**
*@define dependencies
*/
var express = require('express')
,app = express()
,cors = require('cors')
,port = process.env.PORT||4002
,bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('./app'));
app.use('/',function(req,res){
  console.log(req.url);
});
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    if ('OPTIONS' === req.method) {
        res.status(204).send();
    }
    else {
        next();
    }
});
app.listen(port,function(){
  console.log('server started at'+port);
});
