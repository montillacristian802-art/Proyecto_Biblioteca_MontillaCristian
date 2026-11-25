import { useParams } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function ActualizarCategoria() {
    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")
    let {id} = useParams()
    let navigate = useNavigate()

    async function actualizar() {
        let respuesta = await fetch("http://localhost:3001/api/categorias/"+id,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                nombre:nombre,
                descripcion:descripcion
            })
        })
        let datos = await respuesta.json()
        alert(datos.mensaje)
        navigate("/categorias")
    }

    return(
        <div>
            <h1>Actualizar categoría</h1>
            <input type="text" placeholder="Nombre" value={nombre} onChange={(e)=>setNombre(e.target.value)}/>
            <input type="text" placeholder="Descripción" value={descripcion} onChange={(e)=>setDescripcion(e.target.value)}/>
            <button onClick={actualizar}>Actualizar categoría</button>
        </div>
    )
}

export default ActualizarCategoria