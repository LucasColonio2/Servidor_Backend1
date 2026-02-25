import Product from "../models/product.model.js"



//Crear producto
export const createProduct = async (req,res)=> {
    const {name, price, stock, description, category} = req.body;
    //Validaracion------------------
    if (!name|| !price || !stock || !description ||!category
    ) {
        return res.status (400).json({message: "Todos los campos son requeridos"}
        )
    }
    //------------------------------------
    
    const newProduct = await Product.create ({ name, price,stock,description,category}) 
    res.json(newProduct)



}



//Se im
export const getAllProducts = async(req,res) => {
    const products = await Product.find().populate("category")
    res.json(products)
}

//Controlador de busqueda personalizada-------------
export const getProductsByPriceAndStock = async (req,res)=> {
    const products = await Product.find().sort ({price: 1, stock: -1 })
    res.json(products)
}
//-----------------------


//ProductoControladorAggregateandPaginate
export const getProductsAggregatePaginate = async (req,res)=> {
    const {page}= req.params;

    const products =await Product.aggregatePaginate({},{
        limit:10,
        page: Number(page) || 1,
        populate: "category"
    } )
    const result = await Product.aggregatePaginate()

    
    res.json (products)


}


//--------Paginatecontroller----
export const getProductsPaginate =async (req,res) => {
    const {page,limit, sort} = req.params;
    const products =await Product.paginate({}, {
        limit: Number (limit) || 10, 
        sort: sort ? {price:1, stock: -1}: null,
        page: Number (page) || 1 ,
        populate :"category"})
    res.json(products);
}

export const getProductsAggregate =async (req,res) =>{
    const products = await Product.aggregate([
   {$group:{
            _id: null,
            totalStock: {$sum: "$stock"},
            totalProducts: {$sum:1},
            avgPrice: {$avg:"$price"}    
        }}
])
res.json(products);
}



