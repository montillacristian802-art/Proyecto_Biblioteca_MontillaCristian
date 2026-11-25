let conectar = require("../Conexion/db");

class CategoriasController {

    ver = async (req, res) => {
        let [respuesta] = await conectar.query(
            "SELECT * FROM categorias"
        );
        return res.json(respuesta);
    }

    insertar = async (req, res) => {
        let { nombre, descripcion } = req.body;
        let respuesta = await conectar.query(
            "INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)",
            [nombre, descripcion]
        );
        return res.json({
            mensaje: "Categoria registrada correctamente"
        });
    }

    actualizar = async (req, res) => {
        let { nombre, descripcion } = req.body;
        let respuesta = await conectar.query(
            "UPDATE categorias SET nombre=?, descripcion=? WHERE id=?",
            [nombre, descripcion, req.params.id]
        );
        return res.json({
            mensaje: "Categoria actualizada correctamente"
        });
    }

    eliminar = async (req, res) => {
        let respuesta = await conectar.query(
            "DELETE FROM categorias WHERE id=?",
            [req.params.id]
        );
        return res.json({
            mensaje: "Categoria eliminada correctamente"
        });
    }
}
module.exports = CategoriasController;