const dashpoaa = require('../models/dash_po_aa.models');
const dashponew = require('../models/dash_po_new.models');
const { Op } = require('sequelize');

async function dash_po_new(req, res, next) {
	try {
		const { supplier_code } = req.query;
	    const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 1000; // Number of records per page
		const {field} = req.query;
		const {order} = req.query;

        const filter = {};
        if (supplier_code) {
			filter.supplier_code = { [Op.iLike]: `%${supplier_code}%` };
		}

		const ponew = await dashponew.findAll({
			where : filter,
			limit
		});
		res.status(200).json({
			code: 0,
			result: {
				items: ponew
			},
			message: 'ok',
			type: 'success'
			});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}

async function dash_po_aa(req, res, next) {
	try {
		const { supplier_code } = req.query;
	    const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 1000; // Number of records per page
		const {field} = req.query;
		const {order} = req.query;

        const filter = {};
        if (supplier_code) {
			filter.supplier_code = { [Op.iLike]: `%${supplier_code}%` };
		}

		const ponew = await dashpoaa.findAll({
			where : filter,
			limit
		});
		res.status(200).json({
			code: 0,
			result: {
				items: ponew
			},
			message: 'ok',
			type: 'success'
			});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}
module.exports = {
	dash_po_new,
	dash_po_aa
};
