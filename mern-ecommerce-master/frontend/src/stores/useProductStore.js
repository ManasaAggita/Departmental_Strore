import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set) => ({
	products: [],
	loading: false,

	setProducts: (products) => set({ products }),
	createProduct: async (productData) => {
		set({ loading: true });
		try {
			const res = await axios.post("/products", productData);
			set((prevState) => ({
				products: [...prevState.products, res.data],
				loading: false,
			}));
		} catch (error) {
			toast.error(error.response.data.error);
			set({ loading: false });
		}
	},
	fetchAllProducts: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/products");
			set({ products: response.data.products, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			toast.error(error.response.data.error || "Failed to fetch products");
		}
	},
	/*
	fetchProductsByCategory: async (category, subCategory) => {
		set({ loading: true });
		
		try {
			// Construct the URL based on whether a subcategory exists
			const url = subCategory
				? `/products/category/${category}/${subCategory}` // When both category and subcategory are provided
				: `/products/category/${category}`; // When only category is provided
			
			const response = await axios.get(url); // Make the API call with the correct URL
			
			set({ products: response.data.products, loading: false }); // Update the store with the fetched products
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			toast.error(error.response?.data?.error || "Failed to fetch products");
		}
			
	},
	*/
	fetchProductsByCategory: async (category,subCategory) => {
		try {
			set({ loading: true });
		  const response = await axios.get(`/products/category/${category}/${subCategory}`);
		  set({ products: response.data.products, loading: false });
		  
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			toast.error(error.response.data.error || "Failed to fetch products");
		}
	  },
	  //handle rating.
	  handleRatingSubmit: async (productId, rating) => {
		// Convert rating to a number for validation
		const numericRating = Number(rating); 
	
		// Validate the rating value
		if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
			toast.error("Please provide a valid rating between 1 and 5.");
			return;
		}
	
		try {
			const response = await fetch(`/api/products/${productId}/rating`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ rating: numericRating }),  // Send the numeric value
			});
	
			console.log("Rating submitted for:", productId, "Rating:", numericRating);
	
			if (response.ok) {
				toast.success("Rating submitted successfully!!");
				setModalOpen(false); // Close the modal here
			} else {
				const errorData = await response.json();
				toast.error(errorData.message || "Failed to submit rating");
			}
		} catch (error) {
			//toast.error("An error occurred while submitting the rating");
		}
	},
	  handleCommentSubmit :async (productId, comments) => {
		
		
		if (!comments.trim()) {
		  toast.error("Please enter a comment before submitting.");
		  return;
		}
	  
		
		try {
		  const response = await fetch(`/api/products/${productId}/comments`, {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			
			},
			body: JSON.stringify({
				//user: user._id, // Assuming `user` is an object with an `_id` field
				text: comments,
			  }),
		  });
	  
		  if (response.ok) {
			toast.success("Comment submitted successfully!");
			//setComment(""); // Clear the comment input field
		  } else {
			toast.error("Failed to submit comment");
		  }
		} catch (error) {
			console.error("Error submitting comment:", error);
		  toast.error("An error occurred");
		}
	  },
	  
	  
	  
	
	
	
	deleteProduct: async (productId) => {
		set({ loading: true });
		try {
			await axios.delete(`/products/${productId}`);
			set((prevProducts) => ({
				products: prevProducts.products.filter((product) => product._id !== productId),
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to delete product");
		}
	},
	toggleFeaturedProduct: async (productId) => {
		set({ loading: true });
		try {
			const response = await axios.patch(`/products/${productId}`);
			// this will update the isFeatured prop of the product
			set((prevProducts) => ({
				products: prevProducts.products.map((product) =>
					product._id === productId ? { ...product, isFeatured: response.data.isFeatured } : product
				),
				loading: false,
			}));
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.error || "Failed to update product");
		}
	},
	fetchFeaturedProducts: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/products/featured");
			set({ products: response.data, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			console.log("Error fetching featured products:", error);
		}
	},
}));
