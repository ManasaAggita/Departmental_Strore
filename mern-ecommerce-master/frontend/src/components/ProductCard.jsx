import React, { useState } from "react";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useProductStore } from "../stores/useProductStore";
const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();
  const { handleRatingSubmit } = useProductStore();
  const {handleCommentSubmit}= useProductStore();

  const [isModalOpen, setModalOpen] = useState(false); // Control modal visibility
  const [rating, setRating] = useState(0); // User's selected rating
  const [comments, setComment] = useState(""); // User's comment

  const handleAddToCart = () => {
    addToCart(product);
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
/*
  // Submit a new rating
  const handleRatingSubmit = () => {
    if (!user) {
      toast.error("Please login to rate this product");
      return;
    }
    if (rating < 1 || rating > 5) {
      toast.error("Please provide a valid rating between 1 and 5.");
      return;
    }
    // API call to submit rating (dummy logic here)
    toast.success("Rating submitted successfully!");
    setModalOpen(false); // Close the modal after submission
  };
*/
  // Submit a new comment
  /*
  const handleCommentSubmit = () => {
    if (!user) {
      toast.error("Please login to comment on this product");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please enter a comment before submitting.");
      return;
    }
    // API call to submit comment (dummy logic here)
    toast.success("Comment submitted successfully!");
    setComment(""); // Clear the input field
    setModalOpen(false); // Close the modal after submission
  };
  */

// Helper function to render stars based on the rating
const renderStars = (rating) => {
	const fullStars = Math.floor(rating);
	const halfStar = rating % 1 >= 0.5 ? 1 : 0;
	const emptyStars = 5 - fullStars - halfStar;
  
	return (
	  <>
		{Array(fullStars)
		  .fill()
		  .map((_, index) => (
			<FaStar key={`full-${index}`} className="text-cyan-500" />
		  ))}
		{halfStar === 1 && <FaStarHalfAlt className="text-cyan-500" />}
		{Array(emptyStars)
		  .fill()
		  .map((_, index) => (
			<FaRegStar key={`empty-${index}`} className="text-cyan-500" />
		  ))}
	  </>
	);
  };
  return (
    <div className="flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg">
      {/* Product Image */}
      <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
        <img className="object-cover w-full" src={product.image} alt="product image" />
        <div className="absolute inset-0 bg-black bg-opacity-20" />
      </div>

      {/* Product Info */}
      <div className="mt-4 px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-orange-600">{product.name}</h5>
		{/* Product description */}
    <div className="mt-2">
        <h6 className="text-cyan-600 font-bold">
          Description:<span className="text-black font-medium text-sm"> {product.description}</span>
          </h6>
        </div>
        {/*Product price */}
        <div className="mt-2">
        
        <h6 className="text-cyan-600 font-bold">
        Price: <span className="text-black">${product.price}</span>
      </h6>
        </div>
      {/* Rating Display */}

<div className="mt-2 flex items-center">
<h6 className="text-cyan-600 font-bold">
  Ratings: </h6>
  {product.averageRating ? (
    <>
      {renderStars(product.averageRating)}
      <span className="ml-2 text-gray-500">({product.averageRating.toFixed(1)})</span>
    </>
  ) : (
    <span className="text-gray-500">No ratings yet</span>
  )}
</div>



        {/* Comments Display */}
        <div className="mt-2">
          <h6 className="text-cyan-600 font-bold">Comments:</h6>
          {product.comments?.length > 0 ? (
            <ul className="text-gray-500 text-sm list-disc pl-5">
              {product.comments.map((c, index) => (
                <li key={index}>{c.text}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </div>

        {/* Open Modal */}
        <div className="mt-4">
          <button
            className="text-cyan-600 underline hover:text-cyan-400"
            onClick={toggleModal}
          >
            Add Rating or Comment
          </button>
        </div>

        {/* Add to Cart */}
        <div className="mt-4">
          <button
            className="flex items-center justify-center rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-300"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={22} className="mr-2" />
            Add to cart
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-5 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold text-white mb-3">Add Rating and Comment</h3>

            {/* Rating Input */}
            <div className="mb-4">
              <label className="text-white font-medium">Your Rating:</label>
              <select
                className="mt-1 w-full rounded-lg bg-gray-700 text-white p-2"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))} 
              >
                <option value="0">Select a rating</option>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>

            {/* Comment Input */}
            <div className="mb-4">
              <label className="text-white font-medium">Your Comment:</label>
              <textarea
                className="mt-1 w-full rounded-lg bg-gray-700 text-white p-2"
                rows="3"
                placeholder="Write your comment..."
                value={comments}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                onClick={toggleModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
                onClick={() => handleRatingSubmit(product._id, rating)}
              >
                Submit Rating
              </button>
              <button
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
				onClick={() => handleCommentSubmit(product._id, comments)}
              >
                Submit Comment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
