import mongoose, { Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const productSchema = new mongoose.Schema ({
    name: {
        type: String,
        index:true,
    },
    description: String,
    price: Number,
    stock: Number,
    category: {
        type: Types.ObjectId,
        ref: "Category"
    },
});

//----Busqueda personalizada-------
productSchema.index ({price:1, stock:-1})
//-------------------------------


//----------PAGINACION-----------
productSchema.plugin(mongoosePaginate)

//---Plugin agregacion mas paginacion----
productSchema.plugin(mongooseAggregatePaginate)

const Product = mongoose.model 
("Product", productSchema)

export default Product

