import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const mqttClient = ClientProxyFactory.create({
  transport: Transport.MQTT,
  options: {
    url: process.env.MQTT_URL ?? 'mqtt://localhost:1883',
  },
});
