import log4js from "log4js";

log4js.configure({
  appenders: {
    data: { type: "file", filename: "./data.log" },
  },
  categories: { default: { appenders: ["data"], level: "ALL" } },
});

const logger = log4js.getLogger("data");

export default logger
