import { useParams } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function ActualizarAutor() {
    const [nombre, setNombre] = useState("")
    const [nacionalidad, setNacionalidad] = useState("")
    const [fecha_nacimiento, setFecha_nacimiento] = useState("")
    let {id} = useParams()
    let navigate = useNavigate()

    async function actualizar() {
        let respuesta = await fetch("http://localhost:3001/api/autores/"+id,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                nombre:nombre,
                nacionalidad:nacionalidad,
                fecha_nacimiento:fecha_nacimiento
            })
        })
        let datos = await respuesta.json()
        alert(datos.mensaje)
        navigate("/autores")
    }

    return(
        <div>
            <h1>Actualizar autor</h1>
            <input type="text" placeholder="Nombre" value={nombre} onChange={(e)=>setNombre(e.target.value)}/>
            <input type="text" placeholder="Nacionalidad" value={nacionalidad} onChange={(e)=>setNacionalidad(e.target.value)}/>
            <input type="date" value={fecha_nacimiento} onChange={(e)=>setFecha_nacimiento(e.target.value)}/>
            <button onClick={actualizar}>Actualizar autor</button>
        </div>
    )
}

export default ActualizarAutor