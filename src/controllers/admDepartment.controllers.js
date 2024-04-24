const { query } = require('express');
const { Op } = require('sequelize');
const departmentList = require('../models/adm.departemen.models');

//list data filter 
async function getDepartmentList(req, res, next) {
	try {
		const { kode_departemen } = req.query;
		const { nama_departemen } = req.query;
		const { departemen_nama_lokal } = req.query;
		const { perubahan_terakhir } = req.query;
		const { search } = req.query;

		const filter = {};
		if (kode_departemen) {
			filter.kode_departemen = { [Op.iLike]: `%${kode_departemen}%` };
		}
		if (nama_departemen) {
			filter.nama_departemen = { [Op.iLike]: `%${nama_departemen}%` };
		}
		if (departemen_nama_lokal) {
			filter.departemen_nama_lokal = { [Op.iLike]: `%${departemen_nama_lokal}%` };
		}
		if (perubahan_terakhir) {
			filter.perubahan_terakhir = { [Op.iLike]: `%${perubahan_terakhir}%` };
		}
		if (search) {
			filter.search = { [Op.iLike]: `%${search}%` };
		}
		
		const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 1000; // Number of records per page
		const {field} = req.query;
		const {order} = req.query;
		
			const department = await departmentList.findAll({
				where: filter,
				// order:  [[field,order]],
				limit
			});
			res.status(200).json({
				code: 0,
				result: {
					items: department
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
	getDepartmentList
};