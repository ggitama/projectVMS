const { query } = require('express');
const { Op } = require('sequelize');
const prdList = require('../models/prdList.models');
const prdInfo = require('../models/prdInfo.models');
const prdDetail = require('../models/prdDetail.models');


//list data filter 
async function getPrdList(req, res, next) {
	try {
		const { status } = req.query;
		const { supplier } = req.query;
		const { start_date } = req.query;
		const { end_date } = req.query;
		const { payment_refrensi } = req.query;
		const { supplier_code } = req.query;
		const startedDate = new Date(start_date);
		const endDate = new Date(end_date);

		const filter = {};
		if (status) {
			filter.status = { [Op.iLike]: `%${status}%` };
		}
		if (supplier) {
			filter.merchant = { [Op.iLike]: `%${supplier}%` };
		}
		if (start_date && end_date) {
			filter.tanggal_pembayaran = { [Op.between]: [ startedDate, endDate ] };
		}
		if (payment_refrensi) {
			filter.payment_refrensi = { [Op.iLike]: `%${payment_refrensi}%` };
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
		
			const PRD = await prdList.findAll({
				where: filter,
				// order:  [[field,order]],
				limit
			});
			res.status(200).json({
				code: 0,
				result: {
					items: PRD
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

//view INFO
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

		const PRD = await prdInfo.findAll({
			where: filter,
			limit
		});
		res.status(200).json({
			code: 0,
			result: {
				items: PRD
			},
			message: 'ok',
			type: 'success'
			});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}

//view INFO
async function viewbycdtdetail(req, res, next) {
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

		const PRD = await prdDetail.findAll({
			where: filter,
			limit
		});
		res.status(200).json({
			code: 0,
			result: {
				items: PRD
			},
			message: 'ok',
			type: 'success'
			});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}

async function procedureTest(req, res, next) {
	try {

		const PRD = await sequelize.query(`CALL DTD.CSM_MIGRATE(:19659,:171,?,?,:1,:0);`);
		res.status(200).json({
			code: 0,
			result: {
				items: PRD
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
	getPrdList,
	viewbycdtinfo,
	viewbycdtdetail
};