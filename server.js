// server.js
import express from "express";
import { createRequestHandler } from "@react-router/express";
import * as build from "./build/server/index.js"; // путь к твоему SSR-билду

const app = express();

// Обслуживание статики
app.use(express.static("build/client"));

// SSR через React Router
app.use(createRequestHandler({ build }));
// Игнорируем служебные запросы Chrome DevTools и др.
app.use("/.well-known", (req, res) => {
  res.status(404).send("Not found");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
