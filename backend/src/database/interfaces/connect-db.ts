import type { IDatabase } from "./database.interface.js";

export class ConnectDB implements IDatabase {
  private static instance: ConnectDB;

  constructor(private connectionDB: IDatabase){}

  public static getInstance(connectionDB: IDatabase): ConnectDB {
    if (!ConnectDB.instance) {
      ConnectDB.instance = new ConnectDB(connectionDB);
    }

    return ConnectDB.instance;
  }

  public async connect(): Promise<void> {
    return this.connectionDB.connect();
  }

  public async disconnect(): Promise<void> {
    return this.connectionDB.disconnect();
  }
}