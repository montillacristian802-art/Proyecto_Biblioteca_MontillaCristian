import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function TablaLibros() {
    const [libros, setLibros] = useState([])
    const [autores, setAutores] = useState([])
    const [categorias, setCategorias] = useState([])
    const [titulo, setTitulo] = useState("")
    const [isbn, setIsbn] = useState("")
    const [anio_publicacion, setAnio_publicacion] = useState("")
    const [cantidad, setCantidad] = useState("")
    const [autor_id, setAutor_id] = useState("")
    const [categoria_id, setCategoria_id] = useState("")
    const navigate=useNavigate();

    async function consultarLibros() {
        let respuesta = await fetch("http://localhost:3001/api/libros")
        let datos = await respuesta.json()
        setLibros(datos)
    }

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
        consultarLibros()
        consultarAutores()
        consultarCategorias()
    }, [])

    async function insertar() {
        let respuesta = await fetch("http://localhost:3001/api/libros", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                titulo: titulo,
                isbn: isbn,
                anio_publicacion: anio_publicacion,
                cantidad: cantidad,
                autor_id: autor_id,
                categoria_id: categoria_id
            })
        })
        let datos = await respuesta.json()
        alert(datos.mensaje)
        setTitulo("")
        setIsbn("")
        setAnio_publicacion("")
        setCantidad("")
        setAutor_id("")
        setCategoria_id("")
        consultarLibros()
    }

    async function eliminar(id) {
        let respuesta = await fetch("http://localhost:3001/api/libros/" + id, {
            method: "DELETE"
        })
        let datos = await respuesta.json()
        alert(datos.mensaje)
        consultarLibros()
    }

    async function actualizarLibro(id){
        navigate("/libros/"+id)
    }

    return(
        <div>
            <h1>Registrar libro</h1>
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

            <button onClick={insertar}>Registrar</button>

            <h1>Lista de libros</h1>
            <table border={1}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>ISBN</th>
                        <th>Año</th>
                        <th>Cantidad</th>
                        <th>Autor</th>
                        <th>Categoría</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {libros.map((libro)=>(
                        <tr>
                            <td>{libro.id}</td>
                            <td>{libro.titulo}</td>
                            <td>{libro.isbn}</td>
                            <td>{libro.anio_publicacion}</td>
                            <td>{libro.cantidad}</td>
                            <td>{libro.autor_nombre}</td>
                            <td>{libro.categoria_nombre}</td>
                            <td>
                                <button onClick={()=>actualizarLibro(libro.id)}> Editar </button>
                                <button onClick={()=>eliminar(libro.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TablaLibros