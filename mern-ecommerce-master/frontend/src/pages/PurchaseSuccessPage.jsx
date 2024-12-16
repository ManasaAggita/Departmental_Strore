import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";
import Confetti from "react-confetti";

const PurchaseSuccessPage = () => {
	const [isProcessing, setIsProcessing] = useState(true);
	const { clearCart } = useCartStore();
	const [error, setError] = useState(null);

	useEffect(() => {
		const handleCheckoutSuccess = async (sessionId) => {
			try {
				await axios.post("/payments/checkout-success", {
					sessionId,
				});
				clearCart();
			} catch (error) {
				console.log(error);
			} finally {
				setIsProcessing(false);
			}
		};

		const sessionId = new URLSearchParams(window.location.search).get("session_id");
		if (sessionId) {
			handleCheckoutSuccess(sessionId);
		} else {
			setIsProcessing(false);
			setError("No session ID found in the URL");
		}
	}, [clearCart]);

	if (isProcessing) return "Processing...";

	if (error) return `Error: ${error}`;

	return (
		<div className='h-screen flex items-center justify-center px-4'>
			

			<div className='max-w-md w-full bg-slate-50 rounded-lg shadow-xl overflow-hidden relative z-10 border border-black'>
				<div className='p-6 sm:p-8'>
					<div className='flex justify-center'>
						<CheckCircle className='text-orange-400 w-16 h-16 mb-4' />
					</div>
					<h1 className='text-2xl sm:text-3xl font-bold text-center text-cyan-600 mb-2'>
						Purchase Successful!
					</h1>

					<p className='text-black-300 text-center mb-2'>
						Thank you for your order. {"We're"} processing it now.
					</p>
					<p className='text-black-400 text-center text-sm mb-6'>
						Check your email for order details and updates.
					</p>
					<div className='bg-cyan-700 rounded-lg p-4 mb-6'>
						<div className='flex items-center justify-between mb-2'>
							<span className='text-sm text-white'>Order number</span>
							<span className='text-sm font-semibold text-white'>#12345</span>
						</div>
						<div className='flex items-center justify-between'>
							<span className='text-sm text-white'>Estimated delivery</span>
							<span className='text-sm font-semibold text-white'>3-5 business days</span>
						</div>
					</div>

					<div className='space-y-4'>
						
						<Link
							to={"/"}
							className='w-full bg-cyan-700 hover:bg-cyan-600 text-white font-bold py-2 px-4 
            rounded-lg transition duration-300 flex items-center justify-center'
						>
							Continue Shopping
							<ArrowRight className='ml-2' size={18} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
export default PurchaseSuccessPage;