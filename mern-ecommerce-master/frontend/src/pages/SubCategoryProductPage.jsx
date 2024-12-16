import { useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

const SubCategoryProductPage = () => {
	const { fetchProductsByCategory, products } = useProductStore();
	const { category, subCategory } = useParams();

	// State for filters
	const [maxPrice, setMaxPrice] = useState(1000); // Default maximum price
	const [selectedRating, setSelectedRating] = useState(0); // Default: no rating filter

	// Filtered products state
	const [filteredProducts, setFilteredProducts] = useState([]);

	// Update filtered products when filters or products change
	useEffect(() => {
		setFilteredProducts(
			products.filter((product) => {
				const inPriceRange = product.price <= maxPrice;
				const matchesRating =
					selectedRating === 0 || product.averageRating >= selectedRating;
				return inPriceRange && matchesRating;
			})
		);
	}, [products, maxPrice, selectedRating]);

	// Fetch products when the component mounts or URL params change
	useEffect(() => {
		fetchProductsByCategory(category, subCategory);
	}, [fetchProductsByCategory, category, subCategory]);

	return (
		<div className="min-h-screen flex">
			{/* Sidebar for Filters */}
			<div className="w-1/6 p-4 bg-gray-100">
				<h3 className="text-lg font-semibold mb-4">Filters</h3>

				{/* Price Range Filter with Single Slider */}
				<div className="mb-6">
					<h4 className="text-sm font-medium mb-2">Price Range</h4>
					<div className="mb-4">
						<p>
							<span>$0</span> - <span>${maxPrice}</span>
						</p>
					</div>
					<div>
						<input
							type="range"
							min="0"
							max="1000"
							value={maxPrice}
							onChange={(e) => setMaxPrice(+e.target.value)}
							className="w-full  "
						/>
					</div>
				</div>

				{/* Rating Filter */}
				<div>
					<h4 className="text-sm font-medium mb-2">Minimum Rating</h4>
					<select
						className="w-full p-2 border rounded"
						value={selectedRating}
						onChange={(e) => setSelectedRating(Number(e.target.value))}
					>
						<option value={0}>All Ratings</option>
						<option value={1}>1 Star & Above</option>
						<option value={2}>2 Stars & Above</option>
						<option value={3}>3 Stars & Above</option>
						<option value={4}>4 Stars & Above</option>
						<option value={5}>5 Stars</option>
					</select>
				</div>
			</div>

			{/* Product Grid */}
			<div className="w-3/4 relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<motion.h1
					className="text-center text-4xl sm:text-5xl font-bold text-orange-400 mb-8"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
			{subCategory.replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}



				</motion.h1>

				<motion.div
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					{/* No Products Found */}
					{filteredProducts.length === 0 && (
						<h2 className="text-3xl font-semibold text-gray-300 text-center col-span-full">
							No products found
						</h2>
					)}

					{/* Display Filtered Products */}
					{filteredProducts.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</motion.div>
			</div>
		</div>
	);
};

export default SubCategoryProductPage;
