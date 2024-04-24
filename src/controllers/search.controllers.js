const { Op } = require('sequelize');
const s = require('../models/store.models');
const supplier = require('../models/supplier.models');
const department = require('../models/department.models');
const bUnit = require('../models/c4BusinessUnit.models');
const role = require('../models/accountRole.models');


async function getStore(req, res, next) {
	try {
		const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 10; // Number of records per page
		const {count, rows} = await s.findAndCountAll({
			attributes:['store_idx', 'name'],
			limit,
			order: ['store_idx'],
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

async function getSupplier(req, res, next) {
	try {
		const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 10; // Number of records per page

		const {count, rows} = await supplier.findAndCountAll({
			attributes:['code', 'name'],
			limit,
			order: ['code'],
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

async function getDepartment(req, res, next) {
	try {
		const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 10; // Number of records per page

		const {count, rows} = await department.findAndCountAll({
			attributes:['code_id', 'name'],
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

async function getDepartment(req, res, next) {
	try {
		const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 10; // Number of records per page

		const {count, rows} = await department.findAndCountAll({
			attributes:['code_id', 'name'],
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

async function getBusiness(req, res, next) {
	try {
		const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 10; // Number of records per page

		const {count, rows} = await bUnit.findAndCountAll({
			attributes:['business_unit_code', 'business_unit_name'],
			limit,
			order: ['business_unit_code'],
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
async function getBusiness2(req, res, next) {
	try {
		const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 10; // Number of records per page

		const {count, rows} = await bUnit.findAndCountAll({
			attributes:['id','business_unit_code', 'business_unit_name','business_unit_address'],
			limit,
			order: ['business_unit_code'],
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

async function getRole(req, res, next) {
	try {
		const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 10; // Number of records per page

		const {count, rows} = await role.findAndCountAll({
			attributes:['id', 'name'],
			limit,
			order: ['id'],
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

module.exports = {
	getStore,
	getSupplier,
	getDepartment,
	getBusiness,
	getBusiness2,
	getRole
};
