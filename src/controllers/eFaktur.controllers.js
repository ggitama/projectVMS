const { query } = require('express');
const { Op } = require('sequelize');
const eFakturList = require('../models/eFakturList.models');
const eFakturDownload = require('../models/eFakturDownload.models');
const efList = require('../models/efList.models');

//list data filter 
async function getEFakturList(req, res, next) {
	try {
		const { status } = req.query;
		// const { supplier } = req.query;
		const { start_date } = req.query;
		const { end_date } = req.query;
		const { nomor_seri_pajak } = req.query;
		const { business_unit } = req.query;
		const { supplier_code } = req.query;
		const startedDate = new Date(start_date);
		const endDate = new Date(end_date);

		const filter = {};
		if (status) {
			filter.status = { [Op.iLike]: `%${status}%` };
		}
		// if (supplier) {
		// 	filter.supplier = { [Op.iLike]: `%${supplier}%` };
		// }
		if (start_date && end_date) {
			filter.upload_date = { [Op.between]: [ startedDate, endDate ] };
		}
		if (nomor_seri_pajak) {
			filter.nomor_seri_pajak = { [Op.iLike]: `%${nomor_seri_pajak}%` };
		}
		if (business_unit) {
			filter.business_unit_code = { [Op.iLike]: `%${business_unit}%` };
		}
		if (supplier_code) {
			filter.supp_code = { [Op.iLike]: `%${supplier_code}%` };
		}
		if(req.query.status=="ALL" || req.query.business_unit=="ALL"|| Object.keys(filter).length===0){
			if (Object.keys(filter).length===0){
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
				const rar = await efList.findAll({
					where: {supp_code: supplier_code},
					limit: 100
				});
				res.status(200).json({
					code: 0,
					result: {
						items: rar
					},
					message: 'ok',
					type: 'success'
				});
			}
		}else{
		const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 1000; // Number of records per page
		const {field} = req.query;
		const {order} = req.query;
		
			const EF = await efList.findAll({
				where: filter,
				limit
			});
			res.status(200).json({
				code: 0,
				result: {
					items: EF
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

async function downloadFile(req, res, next) {
	try {
	  const { taxnumber, file_name, supp_code } = req.body;
  
	  const EF = await eFakturDownload.update(
		{
		  status: "DOWNLOADED",
		  download_date: new Date(),
		},
		{
		  where: {
			taxnumber,
			file_name,
			supp_code,
		  },
		}
	  );
  
	  res.status(200).json({
		code: 0,
		message: "ok",
		type: "success",
	  });
	} catch (error) {
	  console.log(error);
	  res.status(500).json({ error: "Invalid" });
	}
  }
  
  
module.exports = {
	getEFakturList,
	downloadFile
};