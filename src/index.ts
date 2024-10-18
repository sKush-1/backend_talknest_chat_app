import express, { Application, Request, Response} from "express";
import dotenv from "dotenv"
import router from "./routes/index"
import cors from "cors"
import {Server} from "socket.io"
import {createServer} from "http"
import { setupSocket } from "./socket";
import { createAdapter } from "@socket.io/redis-streams-adapter";
import redis from "./config/redis.config";
import { instrument } from "@socket.io/admin-ui";
import { connectKafkaProducer } from "./config/kafka.config";
import { consumeMessages } from "./helper";

dotenv.config();


const PORT =  process.env.PORT || 4000 ;
const app:Application = express();
const server = createServer(app);
const io = new Server(server, {
    cors:{
        origin: [process.env.FRONTEND_URL, "https://admin.socket.io"],
        credentials: true
    },
    adapter:createAdapter(redis)
});

instrument(io, {
    auth: false,
    mode: "development",
  });

// * Add Kafka Producer
connectKafkaProducer().catch((err) => console.log("Kafka Consumer error", err));

consumeMessages(process.env.KAFKA_TOPIC!).catch((err) =>
  console.log("The Kafka Consume error", err)
);
setupSocket(io);
export {io};



app.use(cors({
    origin: [process.env.FRONTEND_URL,"https://admin.socket.io"],
    credentials: true
}));

app.use(express.json());

app.get("/health", (req:Request,res:Response) => {
    res.status(200).send("Health is ok!")
})

app.use("/api", router);

server.listen(PORT, () => {
    console.log(`Server is up at PORT:${PORT}`)
})