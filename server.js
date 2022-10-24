const cors = require("cors");
const express = require("express");
const fs = require("fs");
const router = require("express").Router();

const warehousesRoutes = require("./routes/warehousesRoutes");
const inventoryRoutes = require("./routes/inventoriesRoutes");

const app = express();

require("dotenv").config();

const port = process.env.PORT;
app.use(express.json());
app.use(cors());

// For backend to accept both JSON and form data
app.use(express.json()); // Used to parse JSON bodies

// ---------------- Routes ----------------------------------- //
app.use("/warehouses", warehousesRoutes);
app.use("/inventory", inventoryRoutes);

app.listen(port, () => {
  console.log(`🔋📡 app is listening on port: ${port}  🔋📡`);
});
