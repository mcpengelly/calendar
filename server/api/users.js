const { _snakeKeys, _prepValueAccessors } = require('./helpers');
const uuid = require('uuid');

const userRoutes = (app, db) => {
	app.get('/users', async (req, res) => {
		let result;
		try {
			result = await db.any(`SELECT * FROM users`);
		} catch (err) {
			throw new Error(err);
		}
		res.json(result);
	});

	app.get('/users/:id', async (req, res) => {
		const id = req.params.id;
		let result;
		try {
			result = await db.one(`SELECT * FROM users WHERE id = '${id}'`);
		} catch (err) {
			throw new Error(err);
		}
		res.json(result);
	});

	app.post('/users', async (req, res) => {
		const data = req.body;
		data.id = uuid();
		const keys = Object.keys(data);
		const fields = keys.map(_snakeKeys).join(',');
		const values = keys.map(_prepValueAccessors).join(',');

		try {
			await db.none(`INSERT INTO users (${fields}) VALUES (${values})`, data);
		} catch (err) {
			throw new Error(err);
		}

		res.send(`added user ${data.id}`);
	});

	app.put('/users/:id', async (req, res) => {
		const id = req.params.id;
		const data = req.body;
		const keys = Object.keys(data);
		const fields = keys.map(_snakeKeys).join(',');
		const values = keys.map(_prepValueAccessors).join(',');

		try {
			await db.none(`UPDATE users SET (${fields}) = (${values}) WHERE id = '${id}'`, data);
		} catch (err) {
			throw new Error(err);
		}
		res.send(`updated ${id}`);
	});

	app.delete('/users/:id', async (req, res) => {
		const id = req.params.id;
		try {
			await db.none(`DELETE FROM users WHERE id = '${id}'`);
		} catch (err) {
			throw new Error(err);
		}

		res.send(`deleted: ${id}`);
	});
};

module.exports = userRoutes;
