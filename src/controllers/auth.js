import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { accessTokenSecret } from '../settings';
import validator from 'validator';
import { getUserByEmail, saveUserToDB, generateToken, validateUserData } from '../helpers/auth';

export const authenticationController = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	if (!authHeader) return res.send(401);
	const token = authHeader.split(' ')[1];
	jwt.verify(token, accessTokenSecret, (err, user) => {
		if (err) return res.status(403).send({ error: err.message });
		req.user = user;
		next();
	});
}

export const signinController = async (req, res) => {
	let { email, password } = req.body;

	if (!email || !password) return res.status(422).send({ code: 'missing_creds' });

	email = validator.escape(email);

	try {
		let user = await getUserByEmail(email);
		if (!user) return res.status(401).send({ code: 'invalid_user' });

		const passwordCompare = await bcrypt.compare(password, user.password);
		if (!passwordCompare) return res.status(401).send({ code: 'wrong_password' });

		delete user.password;

		const accessToken = generateToken(user);
		res.send({ accessToken });
	}
	catch (err) {
		console.log(err.stack);
		res.status(500).send();
	}
}

export const signupController = async (req, res) => {
	try {
		let { name, email, password } = req.body;

		if (!name || !email || !password) return res.status(422).send({ code: 'missing_data' })

		name = validator.escape(name);
		email = validator.escape(email);

		const user_exists = await getUserByEmail(email);
		if (user_exists) return res.status(403).send({ code: 'user_exists' })

		if (!validateUserData({ name, email, password })) return res.status(400).send({ code: 'data_not_valid' })

		const hashedPassword = await bcrypt.hash(password, 10);
		let user = { name, email, password: hashedPassword }

		user = await saveUserToDB(user);
		console.log(user)
		const accessToken = generateToken(user);

		res.send({ accessToken });
	} catch (err) {
		console.log(err.stack);
		res.status(500).send();
	}
}
