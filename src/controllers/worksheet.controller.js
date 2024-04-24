const { Op, where, NUMBER } = require('sequelize');
const sequelize = require('../models/db');
const worksheet = require('../models/worksheet.models');
const w = require('../models/w.models');
const pwi = require('../models/pwi.models');
const worksheetDetail = require('../models/worksheetDetail.models');
const getBarcode = require('../models/getBarcode.models');
const pwis = require('../models/pwis.models');


async function getworksheetAll(req, res, next) {
	try {
		const { worksheet_no } = req.query;
		const { supplier_code } = req.query;
		const { start_date } = req.query;
		const { end_date } = req.query;
		const { start_date1 } = req.query;
		const { end_date1 } = req.query;
		const { status } = req.query;
		const { department } = req.query;

		const startedDate = new Date(start_date);
		const endDate = new Date(end_date);
		const startedDate1 = new Date(start_date1);
		const endDate1 = new Date(end_date1);
		const filter = {};
		if (worksheet_no) {
			filter.worksheet_no = { [Op.iLike]: `%${worksheet_no}%` };
		}
		
		if (supplier_code) {
			filter.supplier_code = { [Op.iLike]: `%${supplier_code}%` };
		}
		if (start_date && end_date) {
			filter.sent_date = { [Op.between]: [ startedDate, endDate ] };
		}
		if (status) {
			filter.status = { [Op.iLike]: `%${status}%` };
		}
		if (department) {
			filter.department = { [Op.iLike]: `%${department}%` };
		}
		if (start_date1 && end_date1) {
			filter.purchase_effective_date = { [Op.between]: [ startedDate1, endDate1 ] };
		}
		if(req.query.status=="ALL" || Object.keys(filter).length===0){
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
				const W = await worksheet.findAll({
					where: {supplier_code: supplier_code},
					limit: 100
				});

				res.status(200).json({
					code: 0,
					result: {
						items: W
					},
					message: 'ok',
					type: 'success'
			});
			}
		} else {
			const page = req.query.page || 1; // Current page number
			const limit = req.query.limit || 1000; // Number of records per page
			const W = await  worksheet.findAll({
				where: filter,
			});
		res.status(200).json({
			code: 0,
			result: {
				items: W
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

//view detail
async function viewbycdtinfo(req, res, next) {
	try {
		const { wn } = req.body;
		const filter = {};
		if (wn) {
			filter.worksheet_number = { [Op.iLike]: `${wn}` };
		}

		const W = await w.findAll({
			where: filter
		});

		res.status(200).json({
			code: 0,
			result: {
				items: W
			},
			message: 'ok',
			type: 'success'
			});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}

//view detail
async function viewbycdtDetail(req, res, next) {
	try {
		const { wn } = req.body;
		const filter = {};
		if (wn) {
			filter.worksheet_number = { [Op.iLike]: `${wn}` };
		}

		const W = await worksheetDetail.findAll({
			where: filter	
		});

		
			res.status(200).json({
				code: 0,
				result: {
					items: W
				},
				message: 'ok',
				type: 'success'
				});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}

//view detail
async function getStoreWorksheet(req, res, next) {
	try {
		const { wn} = req.body;
		const filter = {};
		if (wn) {
			filter.worksheet_number = { [Op.iLike]: `${wn}` };
		}

		const W = await pwis.findAll({
			where: filter	});

		res.status(200).json({
			code: 0,
			result: {
				items: W
			},
			message: 'ok',
			type: 'success'
			});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}

//view detail
async function getBarcodeItem(req, res, next) {
	try {
		const { supplier_code } = req.body;
		const { store_code } = req.body;
		const { dept_code } = req.body;
		const { cari } = req.body;
		const filter = {};
		if (supplier_code) {
			filter.supplier_code = { [Op.iLike]: `%${supplier_code}%` };
		}
		if (store_code) {
			filter.store_code = { [Op.iLike]: `%${store_code}%` };
		}
		if (dept_code) {
			filter.dept_code = { [Op.iLike]: `%${dept_code}%` };
		}
		if (cari) {
			filter.cari = { [Op.iLike]: `%${cari}%` };
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
			const W = await getBarcode.findAll({
				where: filter
			});

		res.status(200).json({
			code: 0,
			result: {
				items: W
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

async function createPPWorksheet(req, res) {
		try {
			const values = req.body;
			console.log(values);
			const statements = [];

			for (let i = 0; i < values.length; i++) {
  				statements.push(
   					sequelize.query(
      				`UPDATE vms.pp_worksheet_item SET new_purchase_price=${values[i].new_price} WHERE id=${values[i].id}`
    				)	
			 	);
				// const idx =values.id;
				// console.log(idx);
				// values.forEach(async (values) => {
				// 	await pwis.destroy({
				// 		where: {
				// 			id: values.id,
				// 		 }
				// 	});
				// });
				
			    // if (values && values.length > 0) {
				// 	await pwis.bulkCreate(
				// 		values.map((values) => {
				// 			return {
				// 		id: values.id,
				// 		store_name: values.storeName,
				// 		store_code: values.storeCode,
				// 			};
				// 		})
			  	// 	);
				// }

				values.forEach(async (values) => {
					sequelize.query(
						`UPDATE vms.worksheet SET effective_date='${values.effectiveDate}' WHERE worksheet_number='${values.worksheet}'`
					)
				});
			}			
			const result = await Promise.all(statements);
			const xx = values[0].worksheet;
			console.log(xx);
			return res.status(200).json({
				code: 0,
				result: { items: xx},
				message: "ok",
				type: "success",
			  });
		} catch (error) {
		  console.log(error);
		  return res.status(500).send({
			error: "Invalid",
		  });
		}
}
'use strict';

module.exports = {
	getworksheetAll,
	viewbycdtinfo,
	viewbycdtDetail,
	createPPWorksheet,
	getBarcodeItem,
	getStoreWorksheet
};
