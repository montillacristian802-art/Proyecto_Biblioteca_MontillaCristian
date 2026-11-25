const express = require("express");
const router = express.Router();

const AutoresController = require("../Controllers/AutoresController");

const autoresController = new AutoresController();

router.get("/", autoresController.ver);
router.post("/", autoresController.insertar);
router.put("/:id", autoresController.actualizar);
router.delete("/:id", autoresController.eliminar);

module.exports = router;