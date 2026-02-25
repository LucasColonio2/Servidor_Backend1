import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"; 
import productsRouter from "./routes/products.route.js"
import categoriesRouter from "./routes/categories.route.js"
import cartRouter from "./routes/cart.route.js"
import usersRouter from "./routes/users.route.js"



dotenv.config();

const app = express ();

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