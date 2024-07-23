// https://mongoosejs.com/docs/queries.html

import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  nombreProducto: String,
  modelo: String,
});

productoSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Producto = mongoose.model("Producto", productoSchema);
