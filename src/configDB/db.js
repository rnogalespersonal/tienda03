import mongoose from "mongoose";
import colors from "colors";
import logger from "../logger/logger.js";

/* 
const password = "Universo65";
const bdatos = "appTienda";
const url = `mongodb+srv://rnogales:${password}@cluster0.klrhknl.mongodb.net/${bdatos}?retryWrites=true&w=majority&appName=Cluster0`;
*/


const conectarDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);

    const urld = `${db.connection.host}:${db.connection.port}`;
    console.log(colors.bgRed.black(`MongoDB conectado en: ${urld}`));
    logger.info(colors.bgRed.black(`MongoDB conectado en: ${urld}`));
  } catch (error) {
    console.log(`error: ${error.message}`);
    logger.error(`error: ${error.message}`);
    process.exit(1);
  }
};

export default conectarDB;
