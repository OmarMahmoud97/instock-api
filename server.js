const express = require("express");
const app = express();
const PORT = process.env.PORT || 8081;
const warehouseRoutes = require("./routes/warehouseRoutes");

app.use(express.json());

const cors = require("cors");

app.use(express.static("public"));
app.use(cors());

app.use((req, res, next) => {
  console.log(
    `Incoming request:  ${req.path},  Host: ${req.hostname} / IP: ${req.ip}`
  );
  next();
});

app.use("/warehouses", warehouseRoutes);

app.listen(PORT, () => {});
