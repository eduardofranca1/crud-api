import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import Routers from "./routes";
import { mongodb, openapiSpecification } from "./config";

mongoose.connect(mongodb);

const server = express();

server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

server.use(Routers);

server.listen(process.env.PORT ?? 3001, () => {
  console.log(`server running on ${process.env.PORT ?? 3001}`);
});
