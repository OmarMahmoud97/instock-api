const router = require("express").Router();
const helpers = require("../utils/helpers");

router.use((req, res, next) => {
  if (
    req.post === "POST" &&
    req.headers["content-type" !== "application/json"]
  ) {
    res.status(400).send("Sever requires application/json");
  } else {
    next();
  }
});

router.get("/", (req, res) => {
  let warehouses = helpers.readWarehouses();
  warehouses = warehouses.map((warehouse) => {
    return {
      id: warehouse.id,
      name: warehouse.name,
      address: warehouse.address,
      city: warehouse.city,
      country: warehouse.country,
      contactname: warehouse.contact.name,
      position: warehouse.contact.position,
      phone: warehouse.contact.phone,
      email: warehouse.contact.email,
    };
  });

  res.status(200).json(warehouses);
});

module.exports = router;
