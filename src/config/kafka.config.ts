import { Kafka, logLevel } from "kafkajs";
import fs from "fs";
import path from "path";

// Path to your CA certificate
const sslCertsDir = path.resolve(__dirname, './certs');  // Update this path to where you save the CA certificate

export const kafka = new Kafka({
  clientId: "next-chat-app",
  brokers: [process.env.KAFKA_BROKER], // Aiven Kafka broker address from environment variable
  logLevel: logLevel.ERROR,
  ssl: {
    rejectUnauthorized: true, // Ensures the certificate is properly verified
    ca: [fs.readFileSync(path.join(sslCertsDir, "ca.pem"), "utf-8")], // CA certificate
  },
  sasl: {
    mechanism: 'plain', // SASL/PLAIN for username/password authentication
    username: process.env.KAFKA_USERNAME,  // Aiven Kafka username (avnadmin)
    password: process.env.KAFKA_PASSWORD,  // Aiven Kafka password
  },
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({
  groupId: "chat-group",
  sessionTimeout: 30000,  
  heartbeatInterval: 10000,
});

// Connect Kafka Producer with error handling
export const connectKafkaProducer = async () => {
  try {
    await producer.connect();
    console.log("Kafka Producer connected...");
  } catch (error) {
    console.error("Error connecting Kafka Producer:", error);
  }
};
