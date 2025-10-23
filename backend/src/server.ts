import { createApp } from "./app";
import envs from "./config/envs.config";
import { MongoConfig } from "./config/mongo-db.config";
import { ConnectDB } from "./database/interfaces/connect-db";

async function start() {

  const app = createApp();
  const port = envs.PORT;

  app.listen(port, async () => {
    await ConnectDB.getInstance(new MongoConfig()).connect();
    console.log(`Server running on port ${port}`);
  })
}

start();