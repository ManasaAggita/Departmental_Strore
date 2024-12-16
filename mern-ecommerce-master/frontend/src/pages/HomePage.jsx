import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import React, { useState } from 'react'; // Add useState here
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

const categories = [
	{
		href: "/furniture",
		name: "Furniture",
		imageUrl: "/furniture.jpeg",
		subcategories: [
			{ href: "/furniture/couches", name: "Couches", imageUrl:"/couches.jpg" },
			{ href: "/furniture/tables", name: "Tables", imageUrl:"/table.jpg" },
			{ href: "/furniture/chairs", name: "Chairs", imageUrl:"/chairs.jpg"}
		]
	},
	{
		href: "/electronic_devices",
		name: "Electronic Devices",
		imageUrl: "/electronic-devices.jpg",
		subcategories: [
			{ href: "/electronic_devices/smart-phones", name: "Smart Phones", imageUrl:"/phone.jpg" },
			{ href: "/electronic_devices/laptops", name: "Laptops", imageUrl:"/laptop.jpg" },
			{ href: "/electronic_devices/tablets", name: "Tablets",  imageUrl:"/tablet.png"}
		]
	},
	{
		href: "/home_appliances",
		name: "Home Appliances",
		imageUrl: "/home-appliances.jpg",
		subcategories: [
			{ href: "/home_appliances/microwave", name: "Microwave", imageUrl:"/microwave.jpg" },
			{ href: "/home_appliances/toaster", name: "Toaster", imageUrl:"/toaster.jpg" },
			{ href: "/home_appliances/blender", name: "Blender", imageUrl:"/blender.jpg" }
		]
	},
	{
		href: "/home_decor",
		name: "Home Decor",
		imageUrl: "/home-decor.jpg",
		subcategories: [
			{ href: "/home_decor/vases", name: "Vases", imageUrl:"/vases.jpg" },
			{ href: "/home_decor/picture-frames", name: "Picture Frames" ,imageUrl:"/frame.jpg"},
			{ href: "/home_decor/clocks", name: "Clocks",imageUrl:"/clocks.jpg" }
		]
	}
	
];

const HomePage = () => {
	const [selectedCategory, setSelectedCategory] = useState(null);

	const handleCategoryClick = (category) => {
		setSelectedCategory(category);
	};

	return (
		<div className='relative min-h-screen text-white overflow-hidden'>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<h1 className='text-center text-5xl sm:text-6xl font-bold text-orange-400 mb-4'>
				Shop Our Categories
				</h1>

				{selectedCategory ? (
					<div>
						<h2 className="text-4xl text-center mb-6">{selectedCategory.name} Subcategories</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{selectedCategory.subcategories.map((subCategory) => (
								<Link to={subCategory.href} key={subCategory.name} className="subcategory-link">
									{subCategory.name}
								</Link>
							))}
						</div>
						<button onClick={() => setSelectedCategory(null)} className="mt-6 text-center underline">
							Back to Categories
						</button>
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{categories.map((category) => (
							<div key={category.name} onClick={() => handleCategoryClick(category)}>
								<CategoryItem category={category} />
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};
export default HomePage;
