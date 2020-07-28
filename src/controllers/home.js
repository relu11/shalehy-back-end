import { testEnvironmentVariable } from "../settings";
import Model from "../models/model";

const userModel = new Model('userr')

export const indexPage = (req, res) =>
	res.status(200).json({ message: testEnvironmentVariable });

export const usersPage = async (req, res) => {
	try {
		const data = await userModel.select('name, email');
		res.send({ users: data.rows });
	} catch(err) {
		res.send({ users: err.stack });
	}
}
