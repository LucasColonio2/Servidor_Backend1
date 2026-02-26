import Product from "../models/product.model.js"

//Mostrar productos con paginacion
export const viewProducts = async (req, res) => {
    const { page = 1, limit = 5, sort } = req.query

    const options = {
        page: Number(page),
        limit: Number(limit),
        populate: "category",
        lean: true
    };




    // Si querés agregar ordenamiento
    if (sort) {
        options.sort = { price: sort === "asc" ? 1 : -1 };
    }

    const products = await Product.paginate({}, options);

    res.render("products", {
        products: products.docs,
        totalPages: products.totalPages,
        currentPage: products.page,
        hasNextPage: products.hasNextPage,
        hasPrevPage: products.hasPrevPage,
        nextPage: products.nextPage,
        prevPage: products.prevPage,
        limit
    });
}



/*      .find().populate("category").lean()
 res.render("products", { products })
} */


export const getProductDetail = async (req, res) => {
    const { pid } = req.params
    const product = await Product.findById(pid).populate("category").lean()
    res.render("productDetail", { product })
}