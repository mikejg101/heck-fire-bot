import storage from "node-persist";

const initStorage = async () => {
  await storage.init({
    dir: "./data",
    expiredInterval: 2 * 60 * 1000
  });
  return storage;
};

export default initStorage;
