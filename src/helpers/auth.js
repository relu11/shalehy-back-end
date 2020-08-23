import Model from '../models/model';
import * as jwt from 'jsonwebtoken';
import { accessTokenSecret } from '../settings';
import validator from 'validator';

const userModel = new Model('userr');

export const getUserByEmail = async email => {
	try {
		const data = await userModel.select('id, name, email, password', `WHERE email='${email}'`);
		if (data.rowCount) {
			return data.rows[0];
		}
		return false;
	}
	catch (err) {
		console.log(`ERROR: ${err.message}`);
		console.log(err.stack);
		return false;
	};
}

export const getUserById = async id => {
	try {
		const data = await userModel.select('id, name, email, password', `WHERE id = ${id}`);
		if (data.rowCount) {
			return data.rows[0];
		}
		return false;
	}
	catch (err) {
		console.log(`ERROR: ${err.message}`);
		return false
	}
}

export const saveUserToDB = async user => {
	const { name, email, password } = user;
	const result = await userModel.insertWithReturn('name, email, password', `'${name}', '${email}', '${password}'`);
	const userData = result.rows[0];
	delete userData.password;
	return userData;
}

export const generateToken = user => {
	return jwt.sign(user, accessTokenSecret);
}


export const validateUserData = data => {
	if (!validator.isEmail(data.email)) return false;
	if (data.name && validator.isEmpty(data.name)) return false;
	if (!validator.isLength(data.password, {min: 6})) return false;
	return true;
}
