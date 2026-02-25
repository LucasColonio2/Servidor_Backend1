import mongoose, {Types} from "mongoosee"

const cartSchema = new mongoose.Schema({
    user: {
        type: Types.ObjetcId,
        ref: "User",
        required: true
    },
    products:[
        {
            product: {
                type: Types.ObjetcId,
                ref: "Products",
                required:true
            },
            quantify: Number
        }
    ]

});

const Cart = mongoose.model ("Cart", cartSchema)