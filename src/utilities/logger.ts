const createLogger = () => {
  return {
    debug: console.debug,
    info: console.info,
    log: console.log,
    warn: console.warn,
    error: console.error
  };
};

export default createLogger;
