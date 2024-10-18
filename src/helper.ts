import prisma from "./config/db.config";
import { producer, consumer } from "./config/kafka.config";

// Manually track the consumer's connection state
let isConsumerConnected = false;

// Function to produce messages to Kafka
export const produceMessage = async (topic: string, message: any) => {
  try {
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    console.log("Message produced:", message);
  } catch (error) {
    console.error("Error producing message:", error);
  }
};

// Function to consume messages from Kafka
export const consumeMessages = async (topic: string) => {
  try {
    // Check if the consumer is already connected
    if (!isConsumerConnected) {
      await consumer.connect();
      isConsumerConnected = true;
      console.log("Kafka Consumer connected...");
    }

    // Subscribe to the topic if not already subscribed
    await consumer.subscribe({ topic: topic, fromBeginning: true });
    console.log(`Subscribed to topic: ${topic}`);

    // Start consuming messages
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const messageValue = message.value?.toString();

        try {
          // Parse message and log details
          const data = JSON.parse(messageValue);
          console.log({
            partition,
            offset: message.offset,
            value: data,
          });

          // Insert into Prisma
          await prisma.chats.create({
            data: data,
          });

        } catch (error) {
          // Handle invalid JSON or other errors gracefully
          console.error("Error processing message:", {
            value: messageValue,
            error: error.message,
          });
        }
      },
    });
  } catch (error) {
    console.error("Error setting up Kafka Consumer:", error);
  }
};
