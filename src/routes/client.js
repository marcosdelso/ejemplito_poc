const express = require("express");
const clientSchema = require("../models/client");

const router = express.Router();

// create client
router.post("/clients", (req, res) => {
  const client = clientSchema(req.body);
  client
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get all clients
router.get("/clients", (req, res) => {
  clientSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get a client
router.get("/clients/:id", (req, res) => {
  const { id } = req.params;
  clientSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// delete a client
router.delete("/clients/:id", (req, res) => {
  const { id } = req.params;
  clientSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update a client
router.put("/clients/:id", (req, res) => {
  const { id } = req.params;
  const { dni, firstName, lastName, phone, address, email } = req.body;
  clientSchema
    .updateOne({ _id: id }, { $set: { dni, firstName, lastName, phone, address, email } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
