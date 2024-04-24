const { query } = require('express');
const { Op } = require('sequelize');

const internaluser = require('../models/adm.intuser.models');
const ResourceView = require('../models/adm.intuser.models');
const department = require('../models/department.models');
const store = require('../models/store.models');
const warehouse = require('../models/warehouse.models');

async function getallintuser(req, res, next) {
	const page = req.query.page || 1; // Current page number
	const limit = req.query.limit || 10;
	ResourceView.findAll({
	limit,
    attributes:['first_name', 'username', 'last_name', 'role', 'email', 'departemen', 'store']})
		.then((data) => {
				res.json({
					code: 0,
					message: "ok",
					type: "success",
					result: data, page, limit,
				 });
                 //console.log(data);
				
		})
		.catch((error) => {
			res.status(400).json({
				error
			});
		});
}

async function getDepartment(req, res, next) {
	try {
		const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 10; // Number of records per page
		const { code_id } = req.query;
		const { name } = req.query;
		const { local_name } = req.query;
		const { last_update } = req.query;
		const { search } = req.query;
		const filter = {};
		if (code_id) {
			filter.code_id = { [Op.iLike]: `%${code_id}%` };
		}
		if (name) {
			filter.name = { [Op.iLike]: `%${name}%` };
		}
		if (local_name) {
			filter.local_name = { [Op.iLike]: `%${local_name}%` };
		}
		if (last_update) {
			filter.last_update = { [Op.iLike]: `%${last_update}%` };
		}
		if (search) {
			filter.search = { [Op.or]: [ code_id, name, local_name] };
		}
		const {count, rows} = await department.findAndCountAll({
			attributes:['code_id', 'name', 'local_name', 'last_update'],
			where: filter,
			limit,
			order: ['code_id'],
		});
		res.status(200).json({
			code: 0,
			result: {
				items: rows
			},
			total: count,
			message: 'ok',
			type: 'success'
		});
		
		
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error' });
	}
}

async function getStore(req, res, next) {
	try {
		const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 10; // Number of records per page
		const {count, rows} = await store.findAndCountAll({
			attributes:['store_id', 'name', 'storegln'],
			limit,
			order: ['store_id'],
		});
		res.status(200).json({
			code: 0,
			result: {
				items: rows
			},
			total: count,
			message: 'ok',
			type: 'success'
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error' });
	}
}


async function getwarehouse(req, res, next) {
	const page = req.query.page || 1; // Current page number
	const limit = req.query.limit || 10;
	warehouse.findAll({
	limit,
    attributes:['warehouse_code', 'warehouse_name', 'toko', 'int_code', 'for_interface']})
		.then((data) => {
				res.json({
					code: 0,
					message: "ok",
					type: "success",
					result: data, page, limit,
				 });
                 console.log(data);
				
		})
		.catch((error) => {
			res.status(400).json({
				error
			});
		});
}


module.exports = {
	getallintuser,
    getDepartment,
    getStore,
	getwarehouse
};