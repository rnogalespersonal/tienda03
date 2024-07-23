// https://mongoosejs.com/docs/queries.html

import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema({
    nombreCliente: String,
    numero: String,
})

clienteSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

export const Cliente = mongoose.model("Cliente", clienteSchema);
