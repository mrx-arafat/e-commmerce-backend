import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

// Load environment variables from .env file
dotenv.config({ path: path.join(process.cwd(), ".env") });

console.log("Environment Variables Loaded:");
console.log("Database URL:", process.env.DATABASE_URL);
console.log("Port:", process.env.PORT);

async function main() {
  try {
    if (!config.database_url) {
      throw new Error(
        "Database URL is not defined in the environment variables"
      );
    }

    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log("Failed to connect to the database or start the server:", err);
  }
}

main();
