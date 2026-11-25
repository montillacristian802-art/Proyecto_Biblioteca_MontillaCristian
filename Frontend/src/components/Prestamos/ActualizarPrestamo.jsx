import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function ActualizarPrestamo() {
    const [usuario_id, setUsuario_id] = useState("")
    const [libro_id, setLibro_id] = useState("")
    const [fecha_prestamo, setFecha_prestamo] = useState("")
    const [fecha_devolucion, setFecha_devolucion] = useState("")
    const [estado, setEstado] = useState("")
    const [usuarios, setUsuarios] = useState([])
    const [libros, setLibros] = useState([])
    let {id} = useParams()
    let navigate = useNavigate()

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
        consultarUsuarios()
        consultarLibros()
    }, [])

    async function actualizar() {
        let respuesta = await fetch("http://localhost:3001/api/prestamos/"+id,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                usuario_id:usuario_id,
                libro_id:libro_id,
                fecha_prestamo:fecha_prestamo,
                fecha_devolucion:fecha_devolucion,
                estado:estado
            })
        })
        let datos = await respuesta.json()
        alert(datos.mensaje)
        navigate("/prestamos")
    }

    return(
        <div>
            <h1>Actualizar préstamo</h1>
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
            <button onClick={actualizar}>Actualizar préstamo</button>
        </div>
    )
}

export default ActualizarPrestamo