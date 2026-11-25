import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function TablaCategorias() {
    const [categorias, setCategorias] = useState([])
    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const navigate=useNavigate();

    async function consultar() {
        let respuesta = await fetch("http://localhost:3001/api/categorias")
        let datos = await respuesta.json()
        setCategorias(datos)
    }

    useEffect(() => {
        consultar()
    }, [])

    async function insertar() {
        let respuesta = await fetch("http://localhost:3001/api/categorias", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre,
                descripcion: descripcion
            })
        })
        let datos = await respuesta.json()
        alert(datos.mensaje)
        setNombre("")
        setDescripcion("")
        consultar()
    }

    async function eliminar(id) {
        let respuesta = await fetch("http://localhost:3001/api/categorias/" + id, {
            method: "DELETE"
        })
        let datos = await respuesta.json()
        alert(datos.mensaje)
        consultar()
    }

    async function actualizarCategoria(id){
        navigate("/categorias/"+id)
    }

    return(
        <div>
            <h1>Registrar categoría</h1>
            <input type="text" placeholder="Nombre" value={nombre} onChange={(e)=>setNombre(e.target.value)}/>
            <input type="text" placeholder="Descripción" value={descripcion} onChange={(e)=>setDescripcion(e.target.value)}/>
            <button onClick={insertar}>Registrar</button>

            <h1>Lista de categorías</h1>
            <table border={1}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map((categoria)=>(
                        <tr>
                            <td>{categoria.id}</td>
                            <td>{categoria.nombre}</td>
                            <td>{categoria.descripcion}</td>
                            <td>
                                <button onClick={()=>actualizarCategoria(categoria.id)}> Editar </button>
                                <button onClick={()=>eliminar(categoria.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TablaCategorias