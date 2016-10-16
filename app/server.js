var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var request = require('request');

var nodemailer = require('nodemailer');

var responseStatus;
var token;
var expDate;
var phone = "787-310-1824";
var referenceNumber;

//var agent = require('./_header'), device = require('./device');

//mongodb://heroku_v1zwb08j:1d35gvn2kao04toi8u8i5730mm@ds059316.mlab.com:59316/heroku_v1zwb08j

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
var router = express.Router();

router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'Giddy up cowboy' });
});

router.get('/here', function(req, res){
  res.json({response: 200});
});

router.get('/rs', function(req, res){
  request({
  method: 'POST',
  url: 'http://athmapi.westus.cloudapp.azure.com/athm/requestSession',
  headers: {
    'Content-Type': 'application/json'
  },
  body: "{  \"commUsername\": \"lednax\",  \"commPassword\": \"loslobos\"}"
}, function (error, response, body) {
  var jresp = JSON.parse(body);
  token = jresp.token;
  expDate = jresp.expDate;

  res.json({response: response.statusCode});
  });
});

router.post('/pur',function(req, res){

  /*agent.createMessage()
    .device(device)
    .alert('There\'s a new customer pickup!')
    .set('pickup',req.body.puaddress)
    .set('pickupClient',req.body.puname)
    .set('pickupClientPhone',req.body.puphone)
    .set('dropoff',req.body.doaddress)
    .set('dropoffClient',req.body.doname)
    .set('dropoffClientPhone',req.body.dophone)
    .set('specinst',req.body.specinst)
    .send();*/
});

router.post('/complete',function(req, res){
  var transporter = nodemailer.createTransport({
        service: 'Yahoo',
        auth: {
            user: 'lednax@yahoo.com', // Your email id
            pass: 'loslobos434' // Your password
        }
    });

  var text = 'Package has been delivered';

  var mailOptions = {
    from: 'lednax@yahoo.com',
    to: 'xandel.guzman@gmail.com',
    subject: 'Hauler - Delivery Confirmation',
    text: text
  };

  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          console.log(error);
          res.json({yo: 'error'});
      }else{
          console.log('Message sent: ' + info.response);
          res.json({yo: info.response});
      };
  });

  //TODO: add algorith to calculate price by distance.
  console.log(token);
  request({
    method: 'POST',
    url: 'http://athmapi.westus.cloudapp.azure.com/athm/requestPayment',
    headers: {
      'Content-Type': 'application/json'
    },
    body: "{  \"token\": \""+token+"\",  \"phone\": \""+phone+"\",  \"amount\": 10}"
    }, function (error, response, body) {
      var jresp = JSON.parse(body);
      referenceNumber = jresp.referenceNumber;
    });

    res.json({response: 200});
});

router.post('/verify',function(req, res){
  request({
  method: 'POST',
  url: 'http://athmapi.westus.cloudapp.azure.com/athm/verifyPaymentStatus',
  headers: {
    'Content-Type': 'application/json'
  },
  body: "{  \"token\": \""+token+"\",  \"referenceNumber\": \""+referenceNumber+"\"}"
  }, function (error, response, body) {
    var jresp = JSON.parse(body);
    });
    res.json({response: 200});
});

app.use('/api', router);

app.listen(port);
console.log('Port ' + port);
