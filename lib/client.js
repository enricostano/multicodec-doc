var eventEmitter = require('events')
var util = require('util')

module.exports = function () {

  util.inherits(Codec, eventEmitter)

  var input = document.getElementById('input')
  var check = document.getElementById('check')

  function Codec(){
    eventEmitter.call(this)
    fireDomEvents.call(this)
  }

  function fireDomEvents() {
    var self = this
    //button check ev
    check.addEventListener('click', function (e) {
      var inputs = input.value.split('/').splice(1)
      var protocol = inputs[0] || null
      var data = inputs[1] || null

      if(!protocol || !data ) return self.emit('wrongformat')

      self.emit('message',{
        protocol: '/' + protocol + '/',
        data: data
      })
    })
  }
  return new Codec()
}
