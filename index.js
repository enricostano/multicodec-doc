
var client = require('./lib/client')()
var multistream = require('./lib/multistreamwrapper.js')()

client.on('wrongformat', function () {
  response.textContent = 'wrong format'
})
client.on('message', function (message) {
  multistream.select(message.protocol, function(err, ds) {
    if (err) return  response.textContent = err
    ds.write(message.data)
    ds.end();
  });
})
