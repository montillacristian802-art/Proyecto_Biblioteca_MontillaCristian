import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function TablaPrestamos() {
    const [prestamos, setPrestamos] = useState([])
    const [usuarios, setUsuarios] = useState([])
    const [libros, setLibros] = useState([])
    const [usuario_id, setUsuario_id] = useState("")
    const [libro_id, setLibro_id] = useState("")
    const [fecha_prestamo, setFecha_prestamo] = useState("")
    const [fecha_devolucion, setFecha_devolucion] = useState("")
    const [estado, setEstado] = useState("")
    const navigate=useNavigate();

    async function consultarPrestamos() {
        let respuesta = await fetch("http://localhost:3001/api/prestamos")
        let datos = await respuesta.json()
        setPrestamos(datos)
    }

    async function consultarUsuarios() {
        let respuesta = await fetch("http://localhost:3001/api/usuarios")
        let datos = await respuesta.json()
        setUsuarios(datos)
    }

    async function consultarLibros() {
        let respuesta = await fetch("http://localhost:3001/api/libros")
        let datos = await respuesta.json()
        setLibros(datos)
    }

    useEffect(() => {
        consultarPrestamos()
        consultarUsuarios()
        consultarLibros()
    }, [])

    async function insertar() {
        let respuesta = await fetch("http://localhost:3001/api/prestamos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario_id: usuario_id,
                libro_id: libro_id,
                fecha_prestamo: fecha_prestamo,
                fecha_devolucion: fecha_devolucion,
                estado: estado
            })
        })
        let datos = await respuesta.json()
        alert(datos.mensaje)
        setUsuario_id("")
        setLibro_id("")
        setFecha_prestamo("")
        setFecha_devolucion("")
        setEstado("")
        consultarPrestamos()
    }

    async function eliminar(id) {
        let respuesta = await fetch("http://localhost:3001/api/prestamos/" + id, {
            method: "DELETE"
        })
        let datos = await respuesta.json()
        alert(datos.mensaje)
        consultarPrestamos()
    }

    async function actualizarPrestamo(id){
        navigate("/prestamos/"+id)
    }

    return(
        <div>
            <h1>Registrar préstamo</h1>
            <select value={usuario_id} onChange={(e)=>setUsuario_id(e.target.value)}>
                <option value="">Seleccione usuario</option>
                {usuarios.map((usuario)=>(
                    <option key={usuario.id} value={usuario.id}>{usuario.nombre}</option>
                ))}
            </select>
            <select value={libro_id} onChange={(e)=>setLibro_id(e.target.value)}>
                <option value="">Seleccione libro</option>
                {libros.map((libro)=>(
                    <option key={libro.id} value={libro.id}>{libro.titulo}</option>
                ))}
            </select>
            <label>Fecha de préstamo</label>
            <input type="date" value={fecha_prestamo} onChange={(e)=>setFecha_prestamo(e.target.value)}/>
            <label>Fecha de devolución</label>
            <input type="date" value={fecha_devolucion} onChange={(e)=>setFecha_devolucion(e.target.value)}/>
            <input type="text" placeholder="Estado" value={estado} onChange={(e)=>setEstado(e.target.value)}/>
            <button onClick={insertar}>Registrar</button>

            <h1>Lista de préstamos</h1>
            <table border={1}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Usuario</th>
                        <th>Libro</th>
                        <th>Fecha préstamo</th>
                        <th>Fecha devolución</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {prestamos.map((prestamo)=>(
                        <tr>
                            <td>{prestamo.id}</td>
                            <td>{prestamo.usuario_nombre}</td>
                            <td>{prestamo.libro_titulo}</td>
                            <td>{prestamo.fecha_prestamo}</td>
                            <td>{prestamo.fecha_devolucion}</td>
                            <td>{prestamo.estado}</td>
                            <td>
                                <button onClick={()=>actualizarPrestamo(prestamo.id)}> Editar </button>
                                <button onClick={()=>eliminar(prestamo.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TablaPrestamos