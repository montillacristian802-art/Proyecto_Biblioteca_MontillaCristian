const express = require("express");
const router = express.Router();

const PrestamosController = require("../Controllers/PrestamosController");

const prestamosController = new PrestamosController();

router.get("/", prestamosController.ver);
router.post("/", prestamosController.insertar);
router.put("/:id", prestamosController.actualizar);
router.delete("/:id", prestamosController.eliminar);

module.exports = router;