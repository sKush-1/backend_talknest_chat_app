import prisma from "./config/db.config";
import { producer, consumer } from "./config/kafka.config";

let isConsumerConnected = false;

export const produceMessage = async (topic: string, message: any) => {
  try {
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  } catch (error) {
    console.error("Error producing message:", error);
  }
};

export const consumeMessages = async (topic: string) => {
  try {
    if (!isConsumerConnected) {
      await consumer.connect();
      isConsumerConnected = true;
      console.log("Kafka Consumer connected...");
    }

    // Subscribe to the topic if not already subscribed
    await consumer.subscribe({ topic: topic, fromBeginning: true });

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
