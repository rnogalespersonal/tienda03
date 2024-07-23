import server from "./server.js";
import logger from "./logger/logger.js";


logger.info("Inicio Backend");

const PORT = process.env.PORT || 4000
server.listen(PORT, () => {
  console.log(`REST API en el puerto ${PORT}`)
  logger.info(`REST API en el puerto ${PORT}`)
});
