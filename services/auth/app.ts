// app.ts

import { app } from "./src/server";

const start = async () => {
  try {
    // Start your app
    await app.listen({ host: "0.0.0.0", port: 3002 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
