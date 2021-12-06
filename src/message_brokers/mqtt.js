import mqtt from 'mqtt'

const rmq = mqtt.connect('ws://localhost:15675/ws', {
  username: '/:guest',
  password: 'guest',
  clientId: 'ParkingGate-' + Math.random().toString(16).substr(2, 8) + '-punclut-',
  protocolId: 'MQTT',
  keepalive: 1
})

export default rmq
