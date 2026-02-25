import { Router} from "express";
import {getAllProducts, getProductsByPriceAndStock,
    getProductsPaginate,
    etProductsAggregate,getProductsAggregatePaginate, 
    createProduct} from "../controllers/products.controller.js"


const router = Router ()

router.get("/",getAllProducts);

//Router con filtro segun precio y stock//
router.get("/find-by-price-stock",getProductsByPriceAndStock)
//--------------------------------

//Router con paginacion//
router.get('/paginate/:page/:limit/:sort', getProductsPaginate)
//------------------------

//Router de agregacion----
router.get ("/aggregate", getProductsAggregate)
//---------------------

//Router combinacion de agregacion y paginacion--------------
router.get("/aggregate-paginate/:page", getProductsAggregatePaginate)


// Ruta para crear un producto

router.post ("/", createProduct)



export default router;
