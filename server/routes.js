const pgp = require('pg-promise')({});
const db = pgp('postgres://matthewpengelly:postgres@localhost:5432/calendar');
const _ = require('lodash');
const uuid = require('uuid');

const routes = (app) => {
	app.get('/timesheets', async (req, res) => {
		let result;
		try {
			result = await db.any(`SELECT * FROM timesheets`);
		} catch (err) {
			throw new Error(err);
		}
		res.json(result);
	});

	app.get('/timesheets/:id', async (req, res) => {
		const id = req.params.id;
		let result;
		try {
			result = await db.one(`SELECT * FROM timesheets WHERE id = '${id}'`);
		} catch (err) {
			throw new Error(err);
		}
		res.json(result);
	});

	app.post('/timesheets', async (req, res) => {
		const data = req.body;
		data.id = uuid();
		const keys = Object.keys(data);
		const fields = keys.map(_snakeKeys).join(',');
		const values = keys.map(_prepValueAccessors).join(',');

		try {
			await db.none(`INSERT INTO timesheets (${fields}) VALUES (${values})`, data);
		} catch (err) {
			throw new Error(err);
		}

		res.send(`added timesheet ${data.id}`);
	});

	app.put('/timesheets/:id', async (req, res) => {
		const id = req.params.id;
		const data = req.body;
		const keys = Object.keys(data);
		const fields = keys.map(_snakeKeys).join(',');
		const values = keys.map(_prepValueAccessors).join(',');

		try {
			await db.none(
				`UPDATE timesheets SET (${fields}) = (${values}) WHERE id = '${id}'`,
				data
			);
		} catch (err) {
			throw new Error(err);
		}
		res.send(`updated ${id}`);
	});

	app.delete('/timesheets/:id', async (req, res) => {
		const id = req.params.id;
		try {
			await db.none(`DELETE FROM timesheets WHERE id = '${id}'`);
		} catch (err) {
			throw new Error(err);
		}

		res.send(`deleted: ${id}`);
	});
};

const _snakeKeys = (key) => {
	return _.snakeCase(key);
};

const _prepValueAccessors = (val) => {
	return '${' + val + '}';
};

module.exports = routes;
