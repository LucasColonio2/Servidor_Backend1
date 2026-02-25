import mongoose, {Types} from "mongoose"

const cartSchema = new mongoose.Schema({
    user: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    products:[
        {
            product: {
                type: Types.ObjectId,
                ref: "Products",
                required:true
            },
            quantify:
            {
                type: Number,
                default:1
            } 
        }
    ]

});

export default mongoose.model ("Cart", cartSchema)