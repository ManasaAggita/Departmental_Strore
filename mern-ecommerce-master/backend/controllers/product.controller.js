import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";
import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find({}); // find all products
		res.json({ products });
	} catch (error) {
		console.log("Error in getAllProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getFeaturedProducts = async (req, res) => {
	try {
		let featuredProducts = await redis.get("featured_products");
		if (featuredProducts) {
			return res.json(JSON.parse(featuredProducts));
		}

		// if not in redis, fetch from mongodb
		// .lean() is gonna return a plain javascript object instead of a mongodb document
		// which is good for performance
		featuredProducts = await Product.find({ isFeatured: true }).lean();

		if (!featuredProducts) {
			return res.status(404).json({ message: "No featured products found" });
		}

		// store in redis for future quick access

		await redis.set("featured_products", JSON.stringify(featuredProducts));

		res.json(featuredProducts);
	} catch (error) {
		console.log("Error in getFeaturedProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const createProduct = async (req, res) => {
	try {
		const { name, description, price, image, category, subCategory, rating,comments } = req.body;

		let cloudinaryResponse = null;

		if (image) {
			cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
		}

		const product = await Product.create({
			name,
			description,
			price,
			image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
			category,
			subCategory,
			rating, // Set to null if no rating is provided
			comments, // Set to null if no comments are provided
		});

		res.status(201).json(product);
	} catch (error) {
		console.log("Error in createProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		if (product.image) {
			const publicId = product.image.split("/").pop().split(".")[0];
			try {
				await cloudinary.uploader.destroy(`products/${publicId}`);
				console.log("deleted image from cloduinary");
			} catch (error) {
				console.log("error deleting image from cloduinary", error);
			}
		}

		await Product.findByIdAndDelete(req.params.id);

		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		console.log("Error in deleteProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getRecommendedProducts = async (req, res) => {
	try {
		const products = await Product.aggregate([
			{
				$sample: { size: 4 },
			},
			{
				$project: {
					_id: 1,
					name: 1,
					description: 1,
					image: 1,
					price: 1,
				},
			},
		]);

		res.json(products);
	} catch (error) {
		console.log("Error in getRecommendedProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getProductsByCategory = async (req, res) => {
	const { category,subCategory } = req.params;
		try {
		  // Find products based on category and subcategory
		  const products = await Product.find({category, subCategory});
		  console.log()
		  res.json({ products})
		} catch (error) {
			console.log("Error in getProductsByCategory controller", error.message);
			res.status(500).json({ message: "Server error", error: error.message });
		}
	  
	};
	export const addRating = async (req, res) => {
		const { rating } = req.body;
		const productId = req.params.id; // Access product ID from URL parameter
	  
		// Convert rating to a number and ensure it's a valid number
		const numericRating = Number(rating);
	  
		if (isNaN(numericRating) || numericRating < 0 || numericRating > 5) {
		  return res.status(400).json({
			message: "Invalid rating value. It must be a number between 0 and 5.",
		  });
		}
	  
		try {
		  const product = await Product.findById(productId);
	  
		  if (!product) {
			return res.status(404).json({ message: "Product not found" });
		  }
	  
		  // Add the new rating to the ratings array
		  product.ratings.push(numericRating);
	  
		  // Recalculate the average rating
		  const averageRating =
			product.ratings.reduce((acc, curr) => acc + curr, 0) / product.ratings.length;
	  
		  // Save the new average rating to the product document
		  product.averageRating = averageRating;
	  
		  // Save the product document with the updated ratings and average rating
		  await product.save();
	  
		  res.status(200).json({
			message: "Rating updated successfully",
			product: {
			  ...product.toObject(),
			  averageRating, // Return the updated average rating
			},
		  });
		} catch (error) {
		  console.error("Error updating rating:", error);
		  res.status(500).json({ message: "Error updating rating", error: error.message });
		}
	  };
	  
	  export const addComment = async (req, res) => {
		const { text} = req.body; // Extract user and comment text from the request body
		const productId = req.params.id; // Extract product ID from the route parameters
		try {
		  const product = await Product.findById(productId); // Fetch the product by its ID
		  if (!product) {
			return res.status(404).json({ message: "Product not found" });
		  }
	  
		  // Create the comment object
		  const comment = { text};
	  
		  // Push the comment to the product's comments array
		  product.comments.push(comment);
	  
		  // Save the updated product with the new comment
		  await product.save();
	  
		  res.status(200).json({ message: "Comment added successfully", product });
		} catch (error) {
		  res.status(500).json({ message: "Error adding comment", error });
		}
	  };
	  

	
/*
export const getProductsBySubCategory = async (req, res) => {
	const { subCategory } = req.params;
	try {
		const products = await Product.find({ subCategory });
		res.json({ products });
	} catch (error) {
		console.log("Error in getProductsBySubCategory controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
*/
export const toggleFeaturedProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (product) {
			product.isFeatured = !product.isFeatured;
			const updatedProduct = await product.save();
			await updateFeaturedProductsCache();
			res.json(updatedProduct);
		} else {
			res.status(404).json({ message: "Product not found" });
		}
	} catch (error) {
		console.log("Error in toggleFeaturedProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

async function updateFeaturedProductsCache() {
	try {
		// The lean() method  is used to return plain JavaScript objects instead of full Mongoose documents. This can significantly improve performance

		const featuredProducts = await Product.find({ isFeatured: true }).lean();
		await redis.set("featured_products", JSON.stringify(featuredProducts));
	} catch (error) {
		console.log("error in update cache function");
	}
}
