import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TablaUsuarios() {

    const [usuarios, setUsuarios] = useState([]);

    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [estado, setEstado] = useState("");
    const navigate=useNavigate();

    async function consultar() {
        let respuesta = await fetch("http://localhost:3001/api/usuarios");
        let datos = await respuesta.json();
        setUsuarios(datos);
    }

    useEffect(() => {
        consultar();
    }, []);

    async function insertar() {
        let respuesta = await fetch("http://localhost:3001/api/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre,
                correo: correo,
                telefono: telefono,
                estado: estado
            })
        });

        let datos = await respuesta.json();

        alert(datos.mensaje);

        setNombre("");
        setCorreo("");
        setTelefono("");
        setEstado("");

        consultar();
    }

    async function eliminar(id) {
        let respuesta = await fetch("http://localhost:3001/api/usuarios/" + id, {
            method: "DELETE"
        });
        let datos = await respuesta.json();
        alert(datos.mensaje);
        consultar();
    }

    async function actualizarUsuario(id){
        navigate("/usuarios/"+id)
    }

    return (
        <div>
            <h2>Gestión de usuarios</h2>

            <h3>Registrar usuario</h3>

            <input type="text" placeholder="Escriba nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
            <input type="email" placeholder="Escriba correo" value={correo}onChange={(e) => setCorreo(e.target.value)} />
            <input type="text" placeholder="Escriba teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)}/>
            <input type="text" placeholder="Escriba estado" value={estado} onChange={(e) => setEstado(e.target.value)}/>

            <button onClick={insertar}>Registrar</button>

            <h3>Lista de usuarios</h3>

            <table border={1}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Teléfono</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>

                    {usuarios.map((usuario) => (
                        <tr>
                            <td>{usuario.id}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.correo}</td>
                            <td>{usuario.telefono}</td>
                            <td>{usuario.estado}</td>

                            <td>
                                <button onClick={()=>actualizarUsuario(usuario.id)}> Editar </button>
                                <button onClick={() => eliminar(usuario.id)}> Eliminar </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default TablaUsuarios;