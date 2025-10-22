import { createApp } from "./app.js";
import envs from "./config/envs.config.js";
import { MongoConfig } from "./config/mongo-db.config.js";
import { ConnectDB } from "./database/interfaces/connect-db.js";

async function start() {

  const app = createApp();
  const port = envs.PORT;

  app.listen(port, async () => {
    await ConnectDB.getInstance(new MongoConfig()).connect();
    console.log(`Server running on port ${port}`);
  })
}

start();