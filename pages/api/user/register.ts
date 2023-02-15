import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

import { User } from "../../../models";
import { jwt, validations } from "../../../utils";
import { db } from "../../../database";

type Data =
	| {
			message: string;
	  }
	| {
			token: string;
			user: {
				email: string;
				name: string;
				role: string;
			};
	  };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case "POST":
			return registerUser(req, res);

		default:
			return res.status(400).json({ message: "Bad Request" });
	}
}

async function registerUser(req: NextApiRequest, res: NextApiResponse<Data>) {
	const {
		email = "",
		password = "",
		name = ""
	} = req.body as { email: string; password: string; name: string; role: string };

	if (password.length < 6) {
		return res.status(400).json({ message: "Weak password" });
	}

	if (name.length < 6) {
		res.status(400).json({ message: "Name must has 2 characters at least" });
	}

	if (!validations.isValidEmail(email)) {
		return res.status(400).json({ message: "The email is not valid" });
	}

	await db.connect();

	const user = await User.findOne({ email }).lean();

	if (user) {
		return res.status(400).json({ message: `The user with email: ${email} already exist` });
	}

	const newUser = new User({
		email: email.toLocaleLowerCase(),
		password: bcrypt.hashSync(password),
		role: "client",
		name
	});

	try {
		await newUser.save({ validateBeforeSave: true });
	} catch (error) {
		return res.status(500).json({ message: "Error to create a new user" });
	}

	await db.connect();

	const { _id, role } = newUser;

	const token = jwt.signToken(newUser._id, email);

	return res.status(200).json({
		token,
		user: { email, role, name }
	});
}
