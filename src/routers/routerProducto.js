import { Router } from "express";
import { Producto } from "../models/bdProducto.js";

const routerp = Router();

// ENRUTAMIENTO

routerp.get("/", (request, response) => {
  response.send("<h1>Servidor Backend Node.js appTienda Productos</h1>");
});

routerp.get("/todos", (request, response) => {
  Producto.find({}).then((notes) => {
    response.json(notes);
  });
});

routerp.get("/uno/:id", (request, response) => {
  Producto.findById(request.params.id).then((note) => {
    response.json(note);
  });
});

routerp.get("/uno/:id", (request, response) => {
  Producto.findById(request.params.id).then((cliente) => {
    response.json(cliente);
  });
});

routerp.post("/graba", (request, response) => {
  const body = request.body;
  // console.log("create post", body);

  if (body.nombreProducto === undefined) {
    return response.status(400).json({ error: "infomación incompleta" });
  }

  const producto = new Producto({
    nombreProducto: body.nombreProducto,
    modelo: body.modelo,
  });

  producto.save().then((savedCliente) => {
    response.json(savedCliente);
  });
});

routerp.delete("/borra/:id", (request, response, next) => {
  Producto.findByIdAndDelete(request.params.id)
    .then((result) => {
      response
        .status(200)
        .json({ message: `elemento borrado: ${request.params.id}` });
    })
    .catch((error) => next(error));
});

routerp.put("/update/:id", (request, response, next) => {
  // console.log("put producto", request.params.id);

  const { nombreProducto, modelo } = request.body;

  Producto.findByIdAndUpdate(
    request.params.id,
    { nombreProducto, modelo },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedCliente) => {
      response.json(updatedCliente);
    })
    .catch((error) => next(error));
});


export default routerp;
