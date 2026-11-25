import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function TablaAutores() {
    const [autores, setAutores] = useState([])
    const [nombre, setNombre] = useState("")
    const [nacionalidad, setNacionalidad] = useState("")
    const [fecha_nacimiento, setFecha_nacimiento] = useState("")
    const navigate=useNavigate();

    async function consultar() {
        let respuesta = await fetch("http://localhost:3001/api/autores")
        let datos = await respuesta.json()
        setAutores(datos)
    }

    useEffect(() => {
        consultar()
    }, [])

    async function insertar() {
        let respuesta = await fetch("http://localhost:3001/api/autores", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre,
                nacionalidad: nacionalidad,
                fecha_nacimiento: fecha_nacimiento
            })
        })
        let datos = await respuesta.json()
        alert(datos.mensaje)
        setNombre("")
        setNacionalidad("")
        setFecha_nacimiento("")
        consultar()
    }

    async function eliminar(id) {
        let respuesta = await fetch("http://localhost:3001/api/autores/" + id, {
            method: "DELETE"
        })
        let datos = await respuesta.json()
        alert(datos.mensaje)
        consultar()
    }

    async function ActualizarAutor(id){
        navigate("/autores/"+id)
    }

    return(
        <div>
            <h1>Registrar autor</h1>
            <input type="text" placeholder="Nombre" value={nombre} onChange={(e)=>setNombre(e.target.value)}/>
            <input type="text" placeholder="Nacionalidad" value={nacionalidad} onChange={(e)=>setNacionalidad(e.target.value)}/>
            <input type="date" value={fecha_nacimiento} onChange={(e)=>setFecha_nacimiento(e.target.value)}/>
            <button onClick={insertar}>Registrar</button>

            <h1>Lista de autores</h1>
            <table border={1}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Nacionalidad</th>
                        <th>Fecha nacimiento</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {autores.map((autor)=>(
                        <tr>
                            <td>{autor.id}</td>
                            <td>{autor.nombre}</td>
                            <td>{autor.nacionalidad}</td>
                            <td>{autor.fecha_nacimiento}</td>
                            <td>
                                <button onClick={()=>ActualizarAutor(autor.id)}> Editar </button>
                                <button onClick={()=>eliminar(autor.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TablaAutores