import * as mongoose from "mongoose";

export async function configureMongoose(mongoUri: string) {
  mongoose.connection.on("connected", async () => {
    console.log(`[db] mongoose connection open to ${mongoUri}`);
  });

  mongoose.connection.on("error", (err) => {
    console.log(`[db] mongoose connection error: ${err}`);
    process.exit(1);
  });

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
  });

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log("[db] mongoose connection disconnected through app termination");
      process.exit(0);
    });
  });
}
