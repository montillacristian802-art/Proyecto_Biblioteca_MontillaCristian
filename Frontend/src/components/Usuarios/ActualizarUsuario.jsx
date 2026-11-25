import { useParams } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function ActualizarUsuario() {
    const [nombre, setNombre] = useState("")
    const [correo, setCorreo] = useState("")
    const [telefono, setTelefono] = useState("")
    const [estado, setEstado] = useState("")
    let {id} = useParams()
    let navigate = useNavigate()


    async function actualizar() {
        let respuesta = await fetch("http://localhost:3001/api/usuarios/" + id,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                nombre:nombre,
                correo:correo,
                telefono:telefono,
                estado:estado
            })
        })
        let datos = await respuesta.json()
        alert(datos.mensaje)
        navigate("/usuarios")
    }

    return(
        <div>
            <h1>Actualizar usuario</h1>
            <input type="text" placeholder="Nombre" value={nombre} onChange={(e)=>setNombre(e.target.value)}/>
            <input type="text" placeholder="Correo" value={correo} onChange={(e)=>setCorreo(e.target.value)}/>
            <input type="text" placeholder="Teléfono" value={telefono} onChange={(e)=>setTelefono(e.target.value)}/>
            <input type="text" placeholder="Estado" value={estado} onChange={(e)=>setEstado(e.target.value)}/>
            <button onClick={actualizar}>Actualizar usuario</button>
        </div>
    )
}

export default ActualizarUsuario