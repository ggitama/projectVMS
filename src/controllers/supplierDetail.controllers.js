const supplierDetail = require('../models/supplierDetail.models');
const supplierListCreate = require('../models/supplierListCreate.models');
const { Op } = require('sequelize');

//supplier master detail
async function listDataSupplier(req, res, next) {
	supplierDetail.findAll(
		{attributes:['supplier_code','local_name', 'tax_id', 'stop_payment_end_date'],
			// limit:100
		}
	)
		.then((data) => {
			res.json({
				code: 0,
				message: "ok",
				type: "succes",
				result: data,
		 	});
		})
		.catch((error) => {
			res.status(400).json({
				error
			});
		});
}

//registered suppliers
 async function listDataRegisterd(req, res, next) {
	try {
		const { search } = req.query;
		
		const filter = {};
		if (search) {
			filter.search = { [Op.iLike]: `%${search}%` };
		}
			const S = await supplierListCreate.findAll({
				where: filter
			});
			res.status(200).json({
				code: 0,
				result: S,
				message: 'ok',
				type: 'success'
			});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error' });
	}
}


module.exports = {
	listDataSupplier,
	listDataRegisterd
};
