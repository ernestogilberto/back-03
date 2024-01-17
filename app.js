import express from 'express';
import ProductManager from './src/productManager.js';

const path = './src/db/productos.json'

const manager = new ProductManager(path)

const app=express()
app.listen(8080,()=>{console.log("listening on port 8080")})

// Main page route (http://localhost:8080) showing a welcome message
app.get("/",(req,res)=>{res.send ("Pagina Principal")})

// Route to get all products from the file of persisted products. If the limit query parameter is passed, it should return only the first n products.
app.get("/products/",async(req,res)=>{
    let {limit}=req.query
    if(!limit)
    {
        res.send(await manager.getProducts().then(r=>r.payload || r.error))
    }
    else{
        res.send(await manager.getProducts().then(r=>r.payload.slice(0,limit) || r.error))
    }

})

// Route to get a product by its ID. If the product is not found, it should return a 404 status code and a message.
app.get("/products/:pid",async(req,res)=>{
    let id=parseInt(req.params.pid)
    res.send(await manager.getProductById(id).then(r=>r.payload || r.error))})