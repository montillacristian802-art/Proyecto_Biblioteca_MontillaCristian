let conectar = require("../Conexion/db");

class PrestamosController {

    ver = async (req, res) => {
        let [respuesta] = await conectar.query(
            `SELECT prestamos.id, prestamos.usuario_id, prestamos.libro_id,
            DATE_FORMAT(prestamos.fecha_prestamo, '%Y-%m-%d') AS fecha_prestamo,
            DATE_FORMAT(prestamos.fecha_devolucion, '%Y-%m-%d') AS fecha_devolucion,
            prestamos.estado,
            usuarios.nombre AS usuario_nombre,
            libros.titulo AS libro_titulo
            FROM prestamos
            INNER JOIN usuarios ON prestamos.usuario_id = usuarios.id
            INNER JOIN libros ON prestamos.libro_id = libros.id`
        );
        return res.json(respuesta);
    }

    insertar = async (req, res) => {
        let { usuario_id, libro_id, fecha_prestamo, fecha_devolucion, estado } = req.body;
        let respuesta = await conectar.query(
            "INSERT INTO prestamos (usuario_id, libro_id, fecha_prestamo, fecha_devolucion, estado) VALUES (?, ?, ?, ?, ?)",
            [usuario_id, libro_id, fecha_prestamo, fecha_devolucion, estado]
        );
        return res.json({
            mensaje: "Prestamo registrado correctamente"
        });
    }

    actualizar = async (req, res) => {
        let { usuario_id, libro_id, fecha_prestamo, fecha_devolucion, estado } = req.body;
        let respuesta = await conectar.query(
            "UPDATE prestamos SET usuario_id=?, libro_id=?, fecha_prestamo=?, fecha_devolucion=?, estado=? WHERE id=?",
            [usuario_id, libro_id, fecha_prestamo, fecha_devolucion, estado, req.params.id]
        );
        return res.json({
            mensaje: "Prestamo actualizado correctamente"
        });
    }

    eliminar = async (req, res) => {
        let respuesta = await conectar.query(
            "DELETE FROM prestamos WHERE id=?",
            [req.params.id]
        );
        return res.json({
            mensaje: "Prestamo eliminado correctamente"
        });
    }
}
module.exports = PrestamosController;