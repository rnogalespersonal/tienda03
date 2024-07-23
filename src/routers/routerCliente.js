import { Router } from "express";
import { Cliente } from "../models/bdCliente.js";
import logger from "../logger/logger.js";

const routerc = Router();

// ENRUTAMIENTO

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  logger.warn(
    "Cliente:Method:Path:Body",
    request.method + ":" + request.path + ":" + request.body
  );
  console.log("---");
  next();
};

const errorHandler = (error, request, response, next) => {
  console.error(error);
  console.error(error.message);
  logger.error(error.message);

  if (error.name === "CastError") {
    logger.error({ error: "id incorrecto" });
    return response.status(400).send({ error: "id incorrecto" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

routerc.use(requestLogger);

const unknownEndpoint = (request, response) => {
  logger.error({ error: "url desconocida" });
  response.status(404).send({ error: "url desconocida" });
};

routerc.get("/", (request, response) => {
  response.send("<h1>Servidor Backend Node.js appTienda Clientes</h1>");
});


routerc.get("/todos", (request, response) => {
  // console.log('routerc todos',request);
  Cliente.find({}).then((listadoClientes) => {
    response.json(listadoClientes);
  });
});

/* 
routerc.get("/uno/:id", (request, response) => {
  Cliente.findById(request.params.id).then((cliente) => {
    response.json(cliente);
  });
});
 */

routerc.get("/uno/:id", (request, response, next) => {
  Cliente.findById(request.params.id)
    .then((cliente) => {
      response.json(cliente) })
    .catch((error) => next(error))
});


routerc.post("/graba", (request, response) => {
  const body = request.body;
  console.log('create post',body);

  if (body.nombreCliente === undefined) {
    return response.status(400).json({ error: "infomación incompleta" });
  }

  const cliente = new Cliente({
    nombreCliente: body.nombreCliente,
    numero: body.numero,
  });

  cliente.save().then((savedCliente) => {
    response.json(savedCliente);
  });
});


routerc.delete("/borra/:id", (request, response, next) => {
  Cliente.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(200).json({ message: `elemento borrado: ${request.params.id}` });
    })
    .catch((error) => next(error));
});


routerc.put("/update/:id", (request, response, next) => {
  const { nombreCliente, numero } = request.body;

  Cliente.findByIdAndUpdate(
    request.params.id,
    { nombreCliente, numero },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedCliente) => {
      response.json(updatedCliente);
    })
    .catch((error) => next(error));
});

routerc.use(unknownEndpoint);
routerc.use(errorHandler);

export default routerc;
