
module.exports = function () {
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
}
