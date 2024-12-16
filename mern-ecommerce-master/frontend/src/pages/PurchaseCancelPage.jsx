import { XCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PurchaseCancelPage = () => {
	return (
		<div className='min-h-screen flex items-center justify-center px-4'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='max-w-md w-full bg-slate-50 rounded-lg shadow-xl overflow-hidden relative z-10 border border-black'
			>
				<div className='p-6 sm:p-8'>
					<div className='flex justify-center'>
						<XCircle className='text-orange-500 w-16 h-16 mb-4' />
					</div>
					<h1 className='text-2xl sm:text-3xl font-bold text-center text-cyan-600 mb-2'>Purchase Cancelled</h1>
					<p className='text-black text-center mb-6'>
						Your order has been cancelled. No charges have been made.
					</p>
					
					<div className='space-y-4'>
						<Link
							to={"/"}
							className='w-full bg-cyan-600 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center'
						>
							<ArrowLeft className='mr-2' size={18} />
							Return to Shop
						</Link>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default PurchaseCancelPage;
