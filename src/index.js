//call all the required packages
import express from "express";
import { productsContainer, memoryContainer } from "./Api/index.js";
import { DATE_UTILS } from "./utils/index.js";

import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";

const MessagesApi = new memoryContainer("messages");
const ProductsApi = new productsContainer("products");

//create express app, http server and socket server
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("public"));

io.on("connection", async (socket) => {
    console.log(`Nuevo cliente conectado ${socket.id}`);
  
    socket.emit("messages", await MessagesApi.getAll());
  
    socket.on("newMessage", ({ email, text }) => {
      const message = { email, text, timestamp: DATE_UTILS.getTimestamp() };
      MessagesApi.save(message);

      io.sockets.emit("messages", message);
    });
  
    socket.emit("products", await ProductsApi.getAll());
  
    socket.on("add-product", async (data) => {
      const products = await ProductsApi.save(data);
  
      io.sockets.emit("products", products);
    });
  });

//listen to server
const PORT = 8080 || process.env.PORT;;

const connectedServer = httpServer.listen(PORT, function () {
    console.log(
        `Server is listening on port ${connectedServer.address().port}.`
    );
});

connectedServer.on("error", (error) => console.log(`Server error ${error}`));