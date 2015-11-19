var streamPair = require('stream-pair');
var Interactive = require('multistream-select').Interactive;
var Select = require('multistream-select').Select

var pair = streamPair.create();
var msi = new Interactive();
var mss = new Select();

var Client = require('./lib/codec')
var remote =  document.getElementById('response')

mss.handle(pair.other);

mss.addHandler('/xxx/', function(ds) {
  ds.on('data', function(chunk) {
    console.log(chunk.toString());
  });
  ds.on('end', function() {

  });
});

mss.addHandler('/wtf/', function(ds) {
  ds.on('data', function(chunk) {
    console.log(chunk.toString());
    console.log('w');
  });
  ds.on('end', function() {
    ds.end();
  });
});


msi.handle(pair, function() {
  msi.ls(function(err, result) {
    if (err) {
      return console.log(err)
    }
    console.log('results: ', result);
  });


});

var client = Client();

client.on('wrongformat', function () {
  response.textContent = 'wrong format'
})
client.on('message', function (message) {
  msi.select(message.protocol, function(err, ds) {
    if (err) return  response.textContent = err
    ds.write(message.data)
    ds.end();
  });
})
