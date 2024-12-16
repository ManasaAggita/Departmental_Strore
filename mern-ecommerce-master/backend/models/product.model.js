import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			min: 0,
			required: true,
		},
		image: {
			type: String,
			required: [true, "Image is required"],
		},
		
		category: {
			type: String,
			required: true,
		},
		subCategory: {
			type: String,
			required: true,
		},
		isFeatured: {
			type: Boolean,
			default: false,
		},
		/*
		rating: {
			type: Number, // Or an array as shown earlier
			min: 0,
			max: 5,
			default: 0,
			required: false,
		  },
		  */
		  ratings: [Number], // This field will store all individual ratings as an array
		  averageRating: { type: Number, default: 0 }, // Store the calculated average rating
		  comments: [
			{
			 // user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Link to the User model
			  text: { type: String, required: false },
			//  createdAt: { type: Date, default: Date.now },
			},
		  ],
		

	},
	{ timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
