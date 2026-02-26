import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"; 
import productsRouter from "./routes/products.route.js"
import categoriesRouter from "./routes/categories.route.js"
import cartRouter from "./routes/cart.route.js"
import usersRouter from "./routes/users.route.js"
import handlebars from "express-handlebars"
import path from "path"
import { fileURLToPath } from "url"
import viewsRouter from "./routes/views.route.js"

const app = express ();


//Configuracion de handlebars
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "views"))

app.use("/", viewsRouter)


dotenv.config();


app.use(express.json());


mongoose.connect(process.env.MONGODB_URI);


//IMPORTACION DE RUTAS
//RUTAS DE PRODUCTOS
app.use ("/api/products", productsRouter)

//RUTAS DE CATEGORIAS
app.use ("/api/categories", categoriesRouter)

//RUTAS DE CARRITO
app.use ("/api/cart", cartRouter)

//RUTAS DE USUARIOS
app.use ('/api/users', usersRouter)

app.listen (process.env.PORT, ()=> {
console.log(`Servidor corriendo en puerto ${process.env.PORT} 🚀`);
}) 