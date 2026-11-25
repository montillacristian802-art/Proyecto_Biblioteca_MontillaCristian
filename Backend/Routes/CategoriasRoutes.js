const express = require("express");
const router = express.Router();

const CategoriasController = require("../Controllers/CategoriasController");

const categoriasController = new CategoriasController();

router.get("/", categoriasController.ver);
router.post("/", categoriasController.insertar);
router.put("/:id", categoriasController.actualizar);
router.delete("/:id", categoriasController.eliminar);

module.exports = router;