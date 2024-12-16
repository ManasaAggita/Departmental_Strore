import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";

const SignUpPage = () => {
	const [formData, setFormData] = useState({
		firstname: "",
		middlename: "",
		lastname: "",
		email: "",
		username:"",
		password: "",
		confirmPassword: "",
		street1: "",
		street2: "",
		city: "",
		state: "",
		country:"",
		postalCode: "",
		cardNumber:"",
		cardHolderName:"", 
		expirationDate:"",
		 cvv:"",

	});

	const { signup, loading, handleGuestLogin } = useUserStore();

	const handleSubmit = (e) => {
		e.preventDefault();
		signup(formData);
	};

	return (
		<div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
			<motion.div
				className='sm:mx-auto sm:w-full sm:max-w-md'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<h2 className='mt-6 text-center text-3xl font-extrabold text-orange-400'>Create your account</h2>
			</motion.div>

			<motion.div
				className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
			>
				<div className='bg-gray-800 py-8 px-4 s1hadow sm:rounded-lg sm:px-6'>
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div>
							<label htmlFor='firstname' className='block text-sm font-medium text-gray-300'>
								First name
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<User className='h-5 w-5 text-gray-300' aria-hidden='true' />
								</div>
								<input
									id='firstname'
									type='text'
									required
									value={formData.firstname}
									onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
									className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-gray-400 focus:border-gray-400 sm:text-sm  text-white'
									placeholder='John Doe'
								/>
							</div>
						</div>
						<div>
							<label htmlFor='middlename' className='block text-sm font-medium text-gray-300'>
								Middle name
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<User className='h-5 w-5 text-gray-400' aria-hidden='true' />
								</div>
								<input
									id='middlename'
									type='text'
									value={formData.middlename}
									onChange={(e) => setFormData({ ...formData, middlename: e.target.value })}
									className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-gray-400 focus:border-gray-400 sm:text-sm text-white'
									placeholder='John Doe'
								/>
							</div>
						</div>
						<div>
							<label htmlFor='lastname' className='block text-sm font-medium text-gray-300'>
								Last name
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<User className='h-5 w-5 text-gray-400' aria-hidden='true' />
								</div>
								<input
									id='lastname'
									type='text'
									required
									value={formData.lastname}
									onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
									className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-gray-400 focus:border-gray-400 sm:text-sm text-white'
									placeholder='John Doe'
								/>
							</div>
						</div>

						<div>
							<label htmlFor='email' className='block text-sm font-medium text-gray-300'>
								Email address
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Mail className='h-5 w-5 text-gray-400' aria-hidden='true' />
								</div>
								<input
									id='email'
									type='email'
									required
									value={formData.email}
									onChange={(e) => setFormData({ ...formData, email: e.target.value })}
									className=' block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 
									rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-gray-400 focus:border-gray-400 sm:text-sm text-white'
									placeholder='you@example.com'
								/>
							</div>
						</div>

						<div>
							<label htmlFor='password' className='block text-sm font-medium text-gray-300'>
								Password
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Lock className='h-5 w-5 text-gray-400' aria-hidden='true' />
								</div>
								<input
									id='password'
									type='password'
									required
									value={formData.password}
									onChange={(e) => setFormData({ ...formData, password: e.target.value })}
									className=' block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-400 focus:border-gray-400 sm:text-sm text-white'
									placeholder='••••••••'
								/>
							</div>
						</div>

						<div>
							<label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-300'>
								Confirm Password
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Lock className='h-5 w-5 text-gray-400' aria-hidden='true' />
								</div>
								<input
									id='confirmPassword'
									type='password'
									required
									value={formData.confirmPassword}
									onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
									className=' block w-full px-3 py-2 pl-10 bg-gray-700 border
									 border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-400 focus:border-gray-400 sm:text-sm text-white'
									placeholder='••••••••'
								/>
							</div>
						</div>
						<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
  
						<div class="sm:col-span-2">
    <label for="username" class="block text-sm font-medium text-gray-300">
     Username
    </label>
    <div class="mt-1">
      <input
        type="text"
		required
			value={formData.username}
		onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        name="username"
        id="username"
        class="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-400 focus:border-gray-400 sm:text-sm text-white"
        placeholder="username"
      />
    </div>
  </div>
						
  <div>
    <label for="street1" class="block text-sm font-medium text-gray-300">
      Street Address
    </label>
    <div class="mt-1">
      <input
        type="text"
		required
		value={formData.street1}
		onChange={(e) => setFormData({ ...formData, street1: e.target.value })}
        name="street1"
        id="street1"
        class="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-400 focus:border-gray-400 sm:text-sm text-white"
        placeholder="123 Main St"
      />
    </div>
  </div>

  <div>
    <label for="street2" class="block text-sm font-medium text-gray-300">
      Street Address Line 2
    </label>
    <div class="mt-1">
      <input
        type="text"
        name="street2"
		value={formData.street2}
		onChange={(e) => setFormData({ ...formData, street2: e.target.value })}
        id="street2"
        class="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-400 focus:border-gray-400 sm:text-sm text-white"
        placeholder="Apartment, suite, unit, etc."
      />
    </div>
  </div>

  <div class="sm:col-span-2">
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label for="city" class="block text-sm font-medium text-gray-300">
          City
        </label>
        <div class="mt-1">
          <input
            type="text"
            name="city"
			required
			value={formData.city}
		onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            id="city"
            class="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-400 focus:border-gray-400 sm:text-sm text-white"
            placeholder="Your City"
          />
        </div>
      </div>

      <div>
        <label for="state" class="block text-sm font-medium text-gray-300">
          State / Province
        </label>
        <div class="mt-1">
          <input
            type="text"
            name="state"
            id="state"
			required
			value={formData.state}
		onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            
            class="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-400 focus:border-gray-400 sm:text-sm text-white"
            placeholder="Your State"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="sm:col-span-2">
    <label for="postalCode" class="block text-sm font-medium text-gray-300">
      	
		Postal / Zip Code
    </label>
    <div class="mt-1">
      <input
        type="text"
		required
		value={formData.postalCode}
		onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
        name="postalCode"
        id="postalCode"
        class="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-400 focus:border-gray-400 sm:text-sm text-white"
        placeholder="12345"
      />
    </div>
  </div>
  <div class="sm:col-span-2">
    <label for="country" class="block text-sm font-medium text-gray-300">
      		Country
    </label>
    <div class="mt-1">
      <input
        type="text"
		required
		value={formData.country}
		onChange={(e) => setFormData({ ...formData, country: e.target.value })}
        name="country"
        id="country"
        class="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-400 focus:border-gray-400 sm:text-sm text-white"
        placeholder="country"
      />
    </div>
  </div>
  <div class="sm:col-span-2">
    <label for="cardNumber" class="block text-sm font-medium text-gray-300">
      
		Card number
    </label>
    <div class="mt-1">
      <input
        type="text"
		required
		value={formData.cardNumber}
		onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
        name="cardNumber"
        id="cardNumber"
        class="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-400 focus:border-gray-400 sm:text-sm text-white"
        placeholder="1111 1111 1111 1111"
      />
    </div>
  </div>
  <div class="sm:col-span-2">
    <label for="cardHolderName" class="block text-sm font-medium text-gray-300">
      
		Card holder name
    </label>
    <div class="mt-1">
      <input
        type="text"
		required
		value={formData.cardHolderName}
		onChange={(e) => setFormData({ ...formData, cardHolderName: e.target.value })}
        name="cardHolderName"
        id="cardHolderName"
        class="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-400 focus:border-gray-400 sm:text-sm text-white"
        placeholder="John Doe"
      />
    </div>
  </div>
  <div class="sm:col-span-2">
    <label for="expirationDate" class="block text-sm font-medium text-gray-300">
      Expiration Date
    </label>
    <div class="mt-1">
      <input
        type="text"
		required
		value={formData.expirationDate}
		onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
        name="expirationDate"
        id="expirationDate"
        class="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-400 focus:border-gray-400 sm:text-sm text-white"
        placeholder="mm/yy"
      />
    </div>
  </div>
  <div class="sm:col-span-2">
    <label for="cvv" class="block text-sm font-medium text-gray-300">
      CVV
    </label>
    <div class="mt-1">
      <input
        type="text"
		required
		value={formData.cvv}
		onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
        name="cvv"
        id="cvv"
        class="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-400 focus:border-gray-400 sm:text-sm text-white"
        placeholder="123"
      />
    </div>
  </div>
</div>


						<button
							type='submit'
							className='w-full flex justify-center py-2 px-4 border border-transparent 
							rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600
							 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:ring-cyan-500 transition duration-150 ease-in-out disabled:opacity-50'
							disabled={loading}
						>
							{loading ? (
								<>
									<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
									Loading...
								</>
							) : (
								<>
									<UserPlus className='mr-2 h-5 w-5' aria-hidden='true' />
									Sign up
								</>
							)}
						</button>
					</form>

					<p className='mt-8 text-center text-sm text-gray-400'>
						Already have an account?{" "}
						<Link to='/login' className='font-medium text-cyan-600 hover:text-cyan-700'>
							Login here <ArrowRight className='inline h-4 w-4' />
						</Link>
					</p>
					
				</div>
			</motion.div>
		</div>
	);
};
export default SignUpPage;
