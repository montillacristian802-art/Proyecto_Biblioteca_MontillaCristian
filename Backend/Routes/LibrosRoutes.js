const express = require("express");
const router = express.Router();

const LibrosController = require("../Controllers/LibrosController");

const librosController = new LibrosController();

router.get("/", librosController.ver);
router.post("/", librosController.insertar);
router.put("/:id", librosController.actualizar);
router.delete("/:id", librosController.eliminar);

module.exports = router;