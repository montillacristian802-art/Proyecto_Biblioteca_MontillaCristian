import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import TablaUsuarios from "./components/Usuarios/TablaUsuarios";
import ActualizarUsuario from "./components/Usuarios/ActualizarUsuario";
import TablaAutores from "./components/Autores/TablaAutores";
import ActualizarAutor from "./components/Autores/ActualizarAutor";
import TablaCategorias from "./components/Categorias/TablaCategorias";
import ActualizarCategoria from "./components/Categorias/ActualizarCategoria";
import TablaLibros from "./components/Libros/TablaLibros";
import ActualizarLibro from "./components/Libros/ActualizarLibro";
import TablaPrestamos from "./components/Prestamos/TablaPrestamo";
import ActualizarPrestamo from "./components/Prestamos/ActualizarPrestamo";

function App() {
  return (
    <BrowserRouter>

      <h1>Sistema de Gestión de Biblioteca</h1>

      <nav>
        <Link to="/usuarios"> Usuarios </Link>
        <Link to="/autores"> Autores </Link>
        <Link to="/categorias"> Categorias </Link>
        <Link to="/libros"> Libros </Link>
        <Link to="/prestamos"> Prestamos </Link>
      </nav>

      <Routes>
        <Route path="/" element={<TablaUsuarios></TablaUsuarios>}></Route>
        <Route path="/usuarios" element={<TablaUsuarios></TablaUsuarios>}></Route>
        <Route path="/usuarios/:id" element={<ActualizarUsuario></ActualizarUsuario>}></Route>

        <Route path="/autores" element={<TablaAutores></TablaAutores>}></Route>
        <Route path="/autores/:id" element={<ActualizarAutor></ActualizarAutor>}></Route>

        <Route path="/categorias" element={<TablaCategorias></TablaCategorias>}></Route>
        <Route path="/categorias/:id" element={<ActualizarCategoria></ActualizarCategoria>}></Route>

        <Route path="/libros" element={<TablaLibros></TablaLibros>}></Route>
        <Route path="/libros/:id" element={<ActualizarLibro></ActualizarLibro>}></Route>

        <Route path="/prestamos" element={<TablaPrestamos></TablaPrestamos>}></Route>
        <Route path="/prestamos/:id" element={<ActualizarPrestamo></ActualizarPrestamo>}></Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;