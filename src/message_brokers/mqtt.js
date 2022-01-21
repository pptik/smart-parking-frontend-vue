import mqtt from 'mqtt'

const rmq = mqtt.connect('ws://192.168.0.2:15675/ws', {
  username: '/parkir:parkir',
  password: 'parkir123',
  clientId: 'ParkingGate-' + Math.random().toString(16).substr(2, 8) + '-punclut-',
  protocolId: 'MQTT',
  keepalive: 1
})

export default rmq
