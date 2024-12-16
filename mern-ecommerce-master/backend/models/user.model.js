import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
	{/*
		name: {
			type: String,
			required: [true, "Name is required"],
		},
		*/
		firstname: {
			type: String,
			required: [true, "First Name is required"],
		},
		middlename: {
			type: String,
			required: false,
		},
		lastname: {
			type: String,
			required: [true, "Last Name Name is required"],
		},

		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			lowercase: true,
			trim: true,
		},
		username: {
			type: String,
			required: [true, "Unique User Name is required"],
			
			
		},

		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: [6, "Password must be at least 6 characters long"],
		},
		street1: { type: String, 
			required:  [true, "Street Address Line is required"], },
		street2: { type: String, 
				required: false, },

		city: { type: String, 
			required:  [true, "City is required"],},

		state: { type: String, 
			required:  [true, "State is required"], },
			country: { type: String, 
				required:  [true, "Country is required"], },
		postalCode: { type: String,
			 required:  [true, "Postal Code is required"], },

		cardNumber: { type: String, 
			required: [true, "Card Number is required"],
			//match: /^(?:\d{4}[ -]?){3}\d{4}$/, // Matches formats like 1234 5678 9012 3456 or 1234567890123456
		 },
    cardHolderName: { type: String,
		 required:  [true, "Card Holder Name is required"], },


    expirationDate: { type: String, 
		required:  [true, "Expiration Date is required"],
		//match: /^(0[1-9]|1[0-2])\/\d{2}$/, // MM/YY format
	 },

    cvv: { type: String, 
		required: [true, "CVV is required"],
		//match: /^[0-9]{3,4}$/, // Ensures the CVV is 3 or 4 digits long
	},
		cartItems: [
			{
				quantity: {
					type: Number,
					default: 1,
				},
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
				},
			},
		],
		role: {
			type: String,
			enum: ["customer", "admin"],
			default: "customer",
		},
	},
	{
		timestamps: true,
	}
);

// Pre-save hook to hash password before saving to database
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (error) {
		next(error);
	}
});

userSchema.methods.comparePassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
