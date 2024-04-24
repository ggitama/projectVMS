const { query } = require('express');
const { Op } = require('sequelize');
const rReqNotifList = require('../models/returnReqNotifList.models');
const rReqNotifInfo = require('../models/returnReqNotifInfo.models');

//list data filter 
async function getReturnReqNotifList(req, res, next) {
	try {
		const { notification } = req.query;
		const { status } = req.query;
		const { supplier } = req.query;
		const { start_date } = req.query;
		const { end_date } = req.query;
		const { toko } = req.query;
		const { return_request_number } = req.query;
		const { supplier_code } = req.query;
		const startedDate = new Date(start_date);
		const endDate = new Date(end_date);

		const filter = {};
		if (notification) {
			filter.notification = { [Op.iLike]: `%${notification}%` };
		}
		if (status) {
			filter.status = { [Op.iLike]: `%${status}%` };
		}
		if (supplier) {
			filter.supplier = { [Op.iLike]: `%${supplier}%` };
		}
		if (start_date && end_date) {
			filter.request_created_date = { [Op.between]: [ startedDate, endDate ] };
		}
		if (toko) {
			filter.store = { [Op.iLike]: `%${toko}%` };
		}
		if (return_request_number) {
			filter.return_request_number = { [Op.iLike]: `%${return_request_number}%` };
		}
		if (supplier_code) {
			filter.supplier_code = { [Op.iLike]: `%${supplier_code}%` };
		}

		if(Object.keys(filter).length === 0){	
			res.status(200).json({
				code: 0,
				result: {
					items: []
				},
				message: 'ok',
				type: 'success'
			});
		}else{
		const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 1000; // Number of records per page
		const {field} = req.query;
		const {order} = req.query;
		
			const RRN = await rReqNotifList.findAll({
				where: filter,
				// order:  [[field,order]],
				limit
			});
			res.status(200).json({
				code: 0,
				result: {
					items: RRN
				},
				message: 'ok',
				type: 'success'
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}

//view detail
async function viewbycdtinfo(req, res, next) {
	try {
		const { id } = req.body;
		const filter = {};
		if (id) {
			filter.id = { [Op.eq]: `${id}` };
		}

		const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 1000; // Number of records per page
		const {field} = req.query;
		const {order} = req.query;
		const RRN = await rReqNotifInfo.findAll({
			where: filter,
			limit
		});
		res.status(200).json({
			code: 0,
			result: {
				items: RRN
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
	getReturnReqNotifList,
	viewbycdtinfo
};