import express from "express";
import routerc from "./routers/routerCliente.js";
import routerp from "./routers/routerProducto.js";
import conectarDB from "./configDB/db.js";
import dotenv from "dotenv";

import cors from "cors";

const server = express();
dotenv.config();

conectarDB();

server.use(express.static("dist"));

server.use(cors())

server.use(express.json());

server.use("/api/cliente", routerc);
server.use("/api/producto", routerp);

export default server;
