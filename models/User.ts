import mongoose, { Model, Schema } from "mongoose";
import { IUser } from "../interfaces";

const userShema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: {
			type: String,
			enum: {
				values: ["admin", "super-user", "SEO", "client"],
				message: "${VALUE} is not a rol valid",
				default: "client",
				required: true
			}
		}
	},
	{
		timestamps: true
	}
);

const User: Model<IUser> = mongoose.models.User || mongoose.model("User", userShema);

export default User;
