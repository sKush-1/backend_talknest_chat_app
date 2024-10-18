import { Kafka, logLevel } from "kafkajs";

export const kafka = new Kafka({
  clientId: "next-chat-app",
  brokers: [process.env.KAFKA_BROKER],
  logLevel: logLevel.ERROR,
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({
  groupId: "chat-group",
  sessionTimeout: 30000,  
  heartbeatInterval: 10000,
});

export const connectKafkaProducer = async () => {
  try {
    await producer.connect();
    console.log("Kafka Producer connected...");
  } catch (error) {
    console.error("Error connecting Kafka Producer:", error);
  }
};
