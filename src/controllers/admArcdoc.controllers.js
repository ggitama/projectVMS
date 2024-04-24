const { query } = require('express');
const { Op } = require('sequelize');
const arcdocList = require('../models/adm.arcdoc.models');

//list data filter 
async function getArcdocList(req, res, next) {
	try {
		const { id } = req.query;
		const { start_date } = req.query;
		const { end_date } = req.query;
		const { supplier_code } = req.query;
		const { store_code } = req.query;
		const { status } = req.query;
		const { search } = req.query;
		const startedDate = new Date(start_date);
		const endDate = new Date(end_date);

		const filter = {};
		if (id) {
			filter.id = { [Op.iLike]: `%${id}%` };
		}
		if (start_date && end_date) {
			filter.created_on = { [Op.between]: [ startedDate, endDate ] };
		}
		if (supplier_code) {
			filter.supplier_code = { [Op.iLike]: `%${supplier_code}%` };
		}
		if (store_code) {
			filter.store_code = { [Op.iLike]: `%${store_code}%` };
		}
		if (status) {
			filter.status = { [Op.iLike]: `%${status}%` };
		}
		if (search) {
			filter.search = { [Op.iLike]: `%${search}%` };
		}
		
		const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 1000; // Number of records per page
		const {field} = req.query;
		const {order} = req.query;
		
			const arcdoc = await arcdocList.findAll({
				where: filter,
				// order:  [[field,order]],
				limit
			});
			res.status(200).json({
				code: 0,
				result: {
					items: arcdoc
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
	getArcdocList
};