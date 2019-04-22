import { connect, connection, disconnect } from "mongoose";

export async function configureMongoose(mongoUri: string) {
  connection.on("connected", () => {
    console.log(`[db] mongoose connection open to ${mongoUri}`);
  });

  connection.on("error", (err: any) => {
    console.log(`[db] mongoose connection error: ${err}`);
    process.exit(0);
  });

  connection.on("disconnected", () => {
    console.log(`[db] mongoose connection disconnected`);
  });

  await connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
  });

  process.on("SIGINT", () => {
    connection.close(() => {
      console.log("[db] mongoose connection disconnected through app termination");
      process.exit(0);
    });
  });
}

export async function disconnectFromMongoDb(): Promise<any> {
  return disconnect();
}
