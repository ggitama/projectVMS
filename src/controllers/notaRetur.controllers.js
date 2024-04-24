const { query } = require('express');
const { Op } = require('sequelize');
const nr = require('../models/notaRetur.models');
const nrDownload = require('../models/notaReturDownload.models');

async function getNrAll(req, res, next) {
	try {
		const { status } = req.query;
		const { supplier_code } = req.query;
		const { business_unit } = req.query;
		const { start_date } = req.query;
		const { end_date } = req.query;
		const startedDate = new Date(start_date);
		const endDate = new Date(end_date);
		
		const filter = {};
		if (status) {
			filter.status = { [Op.iLike]: `%${status}%` };
		}
		if (supplier_code) {
			filter.supplier_code = { [Op.iLike]: `%${supplier_code}%` };
		}
		if (business_unit) {
			filter.business_unit_code = { [Op.iLike]: `%${business_unit}%` };
		}
		if (start_date && end_date) {
			filter.rc_date = { [Op.between]: [ startedDate, endDate ] };
		}

		if(req.query.status=="ALL" || req.query.business_unit=="ALL"|| Object.keys(filter).length === 0 ){	
			if(Object.keys(filter).length === 0){	
				res.status(200).json({
					code: 0,
					result: {
						items: []
					},
					message: 'ok',
					type: 'success'
				});
			} else {
				console.log("masuk");
				if(req.query.supplier_code != null){
					const NR = await nr.findAll({
						where: {supplier_code: supplier_code},
						limit: 100
					});
				res.status(200).json({
					code: 0,
					result: {
						items: NR
					},
					message: 'ok',
					type: 'success'
				});
				}else{
					const NR = await nr.findAll({
						limit: 100
					});
				res.status(200).json({
					code: 0,
					result: {
						items: NR
					},
					message: 'ok',
					type: 'success'
				});
				}
				
			}
		}else{
		const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 1000; // Number of records per page
		const {field} = req.query;
		const {order} = req.query;

			const NR = await nr.findAll({
				where: filter,
				//order:  [[field,order]],
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
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error' });
	}
}
async function getNrDownload(req, res, next) {
	try {
		const { id } = req.query;
	
		const filter = {};
		if (id) {
			filter.id = { [Op.eq]: id };
		}

		const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 10; // Number of records per page
		const {field} = req.query;
		const {order} = req.query;

			const NRD = await nrDownload.findAll({
				where: filter,
				//order:  [[field,order]],
				limit
			});
			const updateNotaRetur = await nrDownload.update({
				status: 'DOWNLOADED', 
				download_date: new Date 
			},{
				where: {id: id}}
				).then((updateNotaRetur ) => {
					console.log(`${updateNotaRetur} record(s) updated successfully.`);
				  })
				  .catch((error) => {
					console.error('Error updating records:', error);
				});
			res.status(200).json({
				code: 0,
				result: {
					items: NRD
				},
				message: 'ok',
				type: 'success'
			});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error' });
	}
}

module.exports = {
	getNrAll,
	getNrDownload
};

