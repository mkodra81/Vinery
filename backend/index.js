  import { config } from "dotenv";
  import express from "express";
  import { connectDb } from "./config/db.js";
  import ProductRouter from "./routes/productsRoutes.js";
  import OrderRouter from "./routes/ordersRoutes.js";
  // import UserRouter from "./routes/userRoutes.js";
  import cors from "cors"
  import path from "path";

  const app = express();

  config();
  const PORT = process.env.PORT;

  app.use(express.json()); 
  app.use(cors());
  app.use("/images", express.static(path.join(path.resolve(), "images"))); 

  app.use("/api/products", ProductRouter);
  app.use("/api/orders", OrderRouter);
  // app.use("/api/users", UserRouter);

  app.listen(PORT, () => {
    connectDb();
    console.log("Server started at http://localhost:" + PORT);
  });
