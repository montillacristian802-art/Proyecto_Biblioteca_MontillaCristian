let conectar = require("../Conexion/db");

class AutoresController {

    ver = async (req, res) => {
        let [respuesta] = await conectar.query(
            "SELECT id, nombre, nacionalidad, DATE_FORMAT(fecha_nacimiento, '%Y-%m-%d') AS fecha_nacimiento FROM autores"
        );
        return res.json(respuesta);
    }

    insertar = async (req, res) => {
        let { nombre, nacionalidad, fecha_nacimiento } = req.body;
        let respuesta = await conectar.query(
            "INSERT INTO autores (nombre, nacionalidad, fecha_nacimiento) VALUES (?, ?, ?)",
            [nombre, nacionalidad, fecha_nacimiento]
        );
        return res.json({
            mensaje: "Autor registrado correctamente"
        });
    }

    actualizar = async (req, res) => {
        let { nombre, nacionalidad, fecha_nacimiento } = req.body;
        let respuesta = await conectar.query(
            "UPDATE autores SET nombre=?, nacionalidad=?, fecha_nacimiento=? WHERE id=?",
            [nombre, nacionalidad, fecha_nacimiento, req.params.id]
        );
        return res.json({
            mensaje: "Autor actualizado correctamente"
        });
    }

    eliminar = async (req, res) => {
        let respuesta = await conectar.query(
            "DELETE FROM autores WHERE id=?",
            [req.params.id]
        );
        return res.json({
            mensaje: "Autor eliminado correctamente"
        });
    }
}
module.exports = AutoresController;