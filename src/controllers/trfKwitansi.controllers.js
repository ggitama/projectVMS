const { query } = require('express');
const { Op } = require('sequelize');
const trfKwitansiList = require('../models/trfKwitansiList.models');
const trfKwitansiDetailPdf = require('../models/trfKwitansiDetailPdf.models');

//list data filter 
async function getTrfKwitansiist(req, res, next) {
	try {
		const { nomor_kwitansi } = req.query;
		const { supplier_code } = req.query;
		const { start_date } = req.query;
		const { end_date } = req.query;
		const startedDate = new Date(start_date);
		const endDate = new Date(end_date);

		const filter = {};
		if (nomor_kwitansi) {
			filter.nomor_kwitansi = { [Op.iLike]: `%${nomor_kwitansi}%` };
		}
		if (supplier_code) {
			filter.supplier_code = { [Op.iLike]: `%${supplier_code}%` };
		}
		if (start_date && end_date) {
			filter.created_date = { [Op.between]: [ startedDate, endDate ] };
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
		
			const TK = await trfKwitansiList.findAll({
				where: filter,
				// order:  [[field,order]],
				limit
			});
			res.status(200).json({
				code: 0,
				result: {
					items: TK
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

async function getDetailPdf(req, res, next) {
	try {
		const { id } = req.query;
		const filter = {};
		if (id) {
			filter.tk_id = { [Op.eq]: `${id}` };
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
		
			const TK = await trfKwitansiDetailPdf.findAll({
				where: filter,
				// order:  [[field,order]],
				limit
			});
			res.status(200).json({
				code: 0,
				result: {
					items: TK
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

module.exports = {
	getTrfKwitansiist,
	getDetailPdf
};