let express = require("express");
let cors = require("cors");
let PORT = 3001;

const UsuariosRoutes = require("./Routes/UsuariosRoutes");
const AutoresRoutes = require("./Routes/AutoresRoutes");
const CategoriasRoutes = require("./Routes/CategoriasRoutes");
const LibrosRoutes = require("./Routes/LibrosRoutes");
const PrestamosRoutes = require("./Routes/PrestamosRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/usuarios", UsuariosRoutes);
app.use("/api/autores", AutoresRoutes);
app.use("/api/categorias", CategoriasRoutes);
app.use("/api/libros", LibrosRoutes);
app.use("/api/prestamos", PrestamosRoutes);


app.listen(PORT, () => {
    console.log("Servidor ejecutandose correctamente " + PORT);
});