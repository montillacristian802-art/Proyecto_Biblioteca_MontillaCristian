import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function ActualizarLibro() {
    const [titulo, setTitulo] = useState("")
    const [isbn, setIsbn] = useState("")
    const [anio_publicacion, setAnio_publicacion] = useState("")
    const [cantidad, setCantidad] = useState("")
    const [autor_id, setAutor_id] = useState("")
    const [categoria_id, setCategoria_id] = useState("")
    const [autores, setAutores] = useState([])
    const [categorias, setCategorias] = useState([])
    let {id} = useParams()
    let navigate = useNavigate()

    async function consultarAutores() {
        let respuesta = await fetch("http://localhost:3001/api/autores")
        let datos = await respuesta.json()
        setAutores(datos)
    }

    async function consultarCategorias() {
        let respuesta = await fetch("http://localhost:3001/api/categorias")
        let datos = await respuesta.json()
        setCategorias(datos)
    }

    useEffect(() => {
        consultarAutores()
        consultarCategorias()
    }, [])

    async function actualizar() {
        let respuesta = await fetch("http://localhost:3001/api/libros/"+id,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                titulo:titulo,
                isbn:isbn,
                anio_publicacion:anio_publicacion,
                cantidad:cantidad,
                autor_id:autor_id,
                categoria_id:categoria_id
            })
        })
        let datos = await respuesta.json()
        alert(datos.mensaje)
        navigate("/libros")
    }

    return(
        <div>
            <h1>Actualizar libro</h1>
            <input type="text" placeholder="Título" value={titulo} onChange={(e)=>setTitulo(e.target.value)}/>
            <input type="text" placeholder="ISBN" value={isbn} onChange={(e)=>setIsbn(e.target.value)}/>
            <input type="number" placeholder="Año de publicación" value={anio_publicacion} onChange={(e)=>setAnio_publicacion(e.target.value)}/>
            <input type="number" placeholder="Cantidad" value={cantidad} onChange={(e)=>setCantidad(e.target.value)}/>
            <select value={autor_id} onChange={(e)=>setAutor_id(e.target.value)}>
                <option value="">Seleccione autor</option>
                {autores.map((autor)=>(
                    <option key={autor.id} value={autor.id}>{autor.nombre}</option>
                ))}
            </select>
            <select value={categoria_id} onChange={(e)=>setCategoria_id(e.target.value)}>
                <option value="">Seleccione categoría</option>
                {categorias.map((categoria)=>(
                    <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                ))}
            </select>
            <button onClick={actualizar}>Actualizar libro</button>
        </div>
    )
}

export default ActualizarLibro