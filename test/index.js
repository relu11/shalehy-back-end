import { expect, server, BASE_URL, accessTokenSecret } from "./setup";
import * as jwt from 'jsonwebtoken'
import { assert } from "chai";

describe("Index page test", () => {
	it("gets base url", (done) => {
		server
			.get(`${BASE_URL}/`)
			.expect(200)
			.end((err, res) => {
				expect(res.status).to.equal(200);
				expect(res.body.message).to.equal(
					"Environment variable is coming across."
				);
				done();
			});
	});
});

describe('Auth test', () => {
	const data = {
		name: 'Display Name',
		email: 'user1231dasdasdasdasdasdasfg231231287123123@shalehy.com',
		password: '123123',
	}
	it('creates a new user', async () => {
		const res = await server
			.post(`${BASE_URL}/auth/signup`)
			.send(data);
		const payload = jwt.verify(res.body.accessToken, accessTokenSecret);
		assert.equal(payload.name, data.name);
		assert.equal(payload.email, data.email)
		assert.isNotNull(payload.id)
	});

	it('creates a duplicate user user', async () => {
		const res = await server
			.post(`${BASE_URL}/auth/signup`)
			.send(data);
		assert.equal(res.status, 403);
		assert.equal(res.body.code, 'user_exists')
	})

	it('creates a new user with missing data', async () => {
		let less_data = { ...data };
		delete less_data.password;

		const res = await server.post(`${BASE_URL}/auth/signup`).send(less_data)
		assert.equal(res.status, 422)
		assert.equal(res.body.code, 'missing_data')
	})

	it('creates a user with invalid email', async () => {
		let invalid_data = { ...data };
		invalid_data.email = 'sdjknaskdnqwndalksdnaskd';
		console.log(invalid_data)

		const res = await server.post(`${BASE_URL}/auth/signup`).send(invalid_data)
		assert.equal(res.status, 400);
		assert.equal(res.body.code, 'data_not_valid');
	})

	it('valid signin', async () => {
		const res = await server.post(`${BASE_URL}/auth/signin`).send({ email: data.email, password: data.password });
		assert.equal(res.status, 200);
		assert.isNotNull(res.body.accessToken);
	})

	it('signin with wrong password', async () => {
		const invalid_data = { email: data.email, password: '123123912837128937' }

		const res = await server.post(`${BASE_URL}/auth/signin`).send(invalid_data);
		assert.equal(res.status, 401);
		assert.equal(res.body.code, 'wrong_password');
	})

	it('signin with wrong email', async () => {
		const invalid_data = { email: 'sdasjkdnb@shalehy.com', password: data.password }

		const res = await server.post(`${BASE_URL}/auth/signin`).send(invalid_data);
		assert.equal(res.status, 401);
		assert.equal(res.body.code, 'invalid_user');
	})

	it('signin with missing credentials', async () => {
		let res = await server.post(`${BASE_URL}/auth/signin`).send({ email: data.email });
		assert.equal(res.status, 422);
		assert.equal(res.body.code, 'missing_creds');

		res = await server.post(`${BASE_URL}/auth/signin`).send({ password: data.password });
		assert.equal(res.status, 422);
		assert.equal(res.body.code, 'missing_creds');
	})
});

