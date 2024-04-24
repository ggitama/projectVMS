const { https } = require('https');
const { Op } = require('sequelize');
const consNotaReturList = require('../models/consNotaReturList.models');

//list data filter 
async function getConsNotaReturList(req, res, next) {
	try {
		const { status } = req.query;
		const { supplier } = req.query;
		const { start_date } = req.query;
		const { end_date } = req.query;
		const { business_unit } = req.query;
		const { nomor_pfi } = req.query;
		const startedDate = new Date(start_date);
		const endDate = new Date(end_date);

		const filter = {};
		if (status) {
			filter.status = { [Op.iLike]: `%${status}%` };
		}
		if (supplier) {
			filter.supplier_code = { [Op.iLike]: `%${supplier}%` };
		}
		if (start_date && end_date) {
			filter.pfi_date = { [Op.between]: [ startedDate, endDate ] };
		}
		if (business_unit) {
			filter.business_unit = { [Op.iLike]: `%${business_unit}%` };
		}
		if (nomor_pfi) {
			filter.nomor_pfi = { [Op.iLike]: `%${nomor_pfi}%` };
		}
		
		const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 1000; // Number of records per page
		const {field} = req.query;
		const {order} = req.query;
		
			const NR = await consNotaReturList.findAll({
				where: filter,
				// order:  [[field,order]],
				limit
			});
			res.status(200).json({
				code: 0,
				result: {
					items: NR
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
	getConsNotaReturList
};