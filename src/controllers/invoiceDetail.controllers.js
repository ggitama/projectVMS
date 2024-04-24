const { query } = require('express');
const { Op, where } = require('sequelize');
const invdetails = require('../models/invoiceDetail.models');
const invdetailsitem = require('../models/invoiceDetailItem.models');
const fs = require('fs'); 
const path = require('path'); 
   
function getDatePath(date) {
	return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + "/";
  }
  
async function invoicedetails(req, res, next) {
	try {
		if (!fs.existsSync('upload/tax/' + getDatePath(new Date())+ req.query.supplier_code + '/') 
			|| !fs.existsSync('upload/invoice/' + getDatePath(new Date())+ req.query.supplier_code + '/')
			|| !fs.existsSync('upload/suratJalan/' + getDatePath(new Date())+ req.query.supplier_code + '/')
			|| !fs.existsSync('upload/kwitansi/' + getDatePath(new Date())+ req.query.supplier_code + '/')) {
				fs.promises.mkdir('upload/tax/' + getDatePath(new Date())+ req.query.supplier_code + '/', { recursive: true });
				fs.promises.mkdir('upload/invoice/' + getDatePath(new Date())+ req.query.supplier_code + '/', { recursive: true });
				fs.promises.mkdir('upload/suratJalan/' + getDatePath(new Date())+ req.query.supplier_code + '/', { recursive: true });
				fs.promises.mkdir('upload/kwitansi/' + getDatePath(new Date())+ req.query.supplier_code + '/', { recursive: true });
			const { id } = req.body;
			const filter = {};
			if (id) {
				filter.url = { [Op.eq]: `${id}` };
			}
			const invd = await invdetails.findAll({
				where: filter
			});

			res.status(200).json({
				code: 0,
				result: {
					items: invd
				},
				message: 'ok',
				type: 'success'
				});
  		}else{
			const { id } = req.body;
			const filter = {};
			if (id) {
				filter.url = { [Op.eq]: `${id}` };
			}
			const invd = await invdetails.findAll({
				where: filter
			});
		
			res.status(200).json({
				code: 0,
				result: {
					items: invd
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

async function invoicedetailsitem(req, res, next) {
	try {
		const { id } = req.body;
		const filter = {};
		if (id) {
			filter.url = { [Op.eq]: `${id}` };
		}		console.log(id);

		const invditem = await invdetailsitem.findAll({
			where: filter
		});

		res.status(200).json({
			code: 0,
			result: {
				items: invditem
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
	invoicedetails,
    invoicedetailsitem
};