import { useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

const categories = {
	furniture: [
		{ href: "/furniture/couches", name: "Couches", imageUrl: "/couches.jpg" },
		{ href: "/furniture/tables", name: "Tables", imageUrl: "/table.jpg" },
		{ href: "/furniture/chairs", name: "Chairs", imageUrl: "/chairs.jpg" }
	],

	electronic_devices:[
		{ href: "/electronic_devices/smart-phones", name: "Smart Phones", imageUrl:"/phone.jpg" },
			{ href: "/electronic_devices/laptops", name: "Laptops", imageUrl:"/laptop.jpg" },
			{ href: "/electronic_devices/tablets", name: "Tablets",  imageUrl:"/tablet.png"}
	],
	home_appliances:[
		{ href: "/home_appliances/microwave", name: "Microwave", imageUrl:"/microwave.jpg" },
			{ href: "/home_appliances/toaster", name: "Toaster", imageUrl:"/toaster.jpg" },
			{ href: "/home_appliances/blender", name: "Blender", imageUrl:"/blender.jpg" }
	],
	home_decor:[
		{ href: "/home_decor/vases", name: "Vases", imageUrl:"/vases.jpg" },
			{ href: "/home_decor/picture-frames", name: "Picture Frames" ,imageUrl:"/frame.jpg"},
			{ href: "/home_decor/clocks", name: "Clocks",imageUrl:"/clocks.jpg" }
	]

};
const CategoryPage = () => {
	const { category } = useParams();
  
	// Get the subcategories for the current category
	const subCategories = categories[category] || [];
  
	return (
	  <div className="min-h-screen">
		<div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
		  <motion.h1
			className="text-center text-4xl sm:text-5xl font-bold text-orange-400 mb-8"
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		  >
			{category.charAt(0).toUpperCase() + category.slice(1)}
		  </motion.h1>
  
		  {/* Display Subcategories */}
		  <div className="flex justify-center mb-8">
			{subCategories.length > 0 ? (
			  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
				{subCategories.map((subCategory) => (
				  <div key={subCategory.name} className="relative overflow-hidden h-96 w-full rounded-lg group">
					<Link to={"/category" +subCategory.href}>
					  <div className="w-full h-full cursor-pointer">
						<div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-50 z-10" />
						<img
						  src={subCategory.imageUrl}
						  alt={subCategory.name}
						  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
						  loading="lazy"
						/>
						<div className="absolute bottom-0 left-0 right-0 p-4 z-20">
						  <h3 className="text-white text-2xl font-bold mb-2">{subCategory.name}</h3>
						  <p className="text-gray-200 text-sm">Explore {subCategory.name}</p>
						</div>
					  </div>
					</Link>
				  </div>
				))}
			  </div>
			) : (
			  <p className="text-center text-xl text-gray-400">No subcategories available</p>
			)}
		  </div>
		</div>
	  </div>
	);
  };
  
  export default CategoryPage;