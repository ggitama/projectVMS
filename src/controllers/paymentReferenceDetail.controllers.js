const { query } = require('express');
const { Op } = require('sequelize');
const prh = require('../models/paymentReferenceHeader.models');

const getPagination = (page, size) => {
	const limit = size ? +size : 1;
	const offset = page ? page * limit : 0;
	return { limit, offset };
  };

const getPagingData = (data, page, limit) => {
	const { count: totalItems, rows: rar } = data;
	const currentPage = page ? +page : 0;
	const totalPages = Math.ceil(totalItems / limit);
	return { totalItems, rar, totalPages, currentPage };
  };

// list data all
async function listALL(req, res, next) {
	try {
		const { page, size } = req.body;
		const { limit, offset } = getPagination(page, size);
		const PRD = await prh.findAll({
			attributes:['date_received' ,'settlement_number', 'total_paid_amount', 'remit_vendor', 'payee_name', 'status']
		});
		res.status(200).json({
							code: 200,
							message: "ok",
							type: "succes",
							result: PRD,
					 	});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}

//list data filter 
async function advancesearch(req, res, next) {
	try {
		const { cdt } = req.body;
		const { payment_reference } = req.body;
		const { supplier } = req.body;
		const { status } = req.body;		
		const { date_from } = req.body;
		const { date_to } = req.body;
		const { page, size } = req.body;
		const { limit, offset } = getPagination(page, size);
		const Ireceipt = await ireceipt.findAll({
			where: 
			{
				[Op.or]: [{ status: status }, { store_code: toko}, {'$supplier_name$': merchant}, {'$business_unit_name$': business_unit}],  
				invoice_receipt_date: {[Op.between]: [date_from,date_to]}
			},
			include: [{model: i, as:'i', attributes:['purchase_order', 'store_code'], 
			include: [{model: PO, as:'poI', attributes:['supplier_name'], required:false}]}],
			attributes:['invoice_receipt_date' ,'status'],
			limit,
			offset,
		});
		res.status(200).json({
			code: 200,
			message: "ok",
			type: "succes",
			result: Ireceipt,
		 });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}

// //view detail
// async function viewbycdt(req, res, next) {
// 	try {
// 		const { cdt } = req.body;
// 		const { page, size } = req.body;
// 		const { limit, offset } = getPagination(page, size);
// 		const Ireceipt = await ireceipt.findAll({
// 			where: [{'$i.purchase_order$': cdt}],
// 			include: [{model: i, as:'i', attributes:['supplier_code', 'company_name', 'company_address1', 'postal_code', 'city', 'purchase_order', 'total_net_amount', 'status'], 
// 			include: [{model: PO, as:'poI', attributes:['po_no', 'order_date', 'dept_code'], required:false}]}],
// 			attributes:['invoice_receipt_date'],
// 		});
// 		res.status(200).json({
// 							code: 200,
// 							message: "ok",
// 							type: "succes",
// 							result: Ireceipt,
// 					 	});
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).json({ error: 'Invalid' });
// 	}
// }

module.exports = {
	listALL
};

