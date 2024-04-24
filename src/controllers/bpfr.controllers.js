const { query } = require('express');
const { Op } = require('sequelize');
const bpfrList = require('../models/buktiPotongFeeRebateList.models');
const bpfrDownload = require('../models/bpfrDownload.models');
const unggahBpfrList = require('../models/unggahBpfrList.models');
const multer = require("multer");
const fs = require("fs");


//list data filter 
async function getBpfrList(req, res, next) {
	try {
		const { status } = req.query;
		const { supplier } = req.query;
		const { start_date } = req.query;
		const { end_date } = req.query;
		const { business_unit } = req.query;
		const { nomor_invoice } = req.query;
		const { supplier_code } = req.query;
		const startedDate = new Date(start_date);
		const endDate = new Date(end_date);

		const filter = {};
		if (status) {
			filter.status = { [Op.iLike]: `%${status}%` };
		}
		if (supplier) {
			filter.supplier = { [Op.iLike]: `%${supplier}%` };
		}
		if (start_date && end_date) {
			filter.invoice_date = { [Op.between]: [ startedDate, endDate ] };
		}
		if (business_unit) {
			filter.business_unit = { [Op.iLike]: `%${business_unit}%` };
		}
		if (nomor_invoice) {
			filter.nomor_invoice = { [Op.iLike]: `%${nomor_invoice}%` };
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
		
			const BPFR = await bpfrList.findAll({
				where: filter,
				// order:  [[field,order]],
				limit
			});
			res.status(200).json({
				code: 0,
				result: {
					items: BPFR
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

//list data filter 
async function getUnggahBpfrList(req, res, next) {
	try {
		const { namafile } = req.query;

		const filter = {};
		if (namafile) {
			filter.namafile = { [Op.iLike]: `%${namafile}%` };
		}
		
		const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 1000; // Number of records per page
		const {field} = req.query;
		const {order} = req.query;
		
			const BPFR = await unggahBpfrList.findAll({
				where: filter,
				// order:  [[field,order]],
				limit
			});

			res.status(200).json({
				code: 0,
				result: {
					items: BPFR
				},
				message: 'ok',
				type: 'success'
			});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}

//list data filter 
async function UploadFile(req, res) {
	try {
		if (req.file == undefined) {
		  return res.send(`You must select a file.`);
		}
		console.log(req.file);

		const UF =await unggahBpfrList.create({
				namafile: fs.readFileSync(__dirname + "/resources/"+req.file.originalname),
				tanggal_upload: new Date,
				jumlah_insert: 1,
				jumlah_revisi: 0,
				jumlah_gagal: 0,
				gagal_upload: '' 
			  }).then((UF) => {
				res.send(`File has been uploaded.`);
			});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}
var storage = multer.diskStorage({
	destination: (req, unggahBpfrList) => {
	 cb(null, __basedir + "/resources/");
	},
	filename: (req, file, cb) => {
	  cb(null, `${Date.now()}${file.originalname}`);
	},
  });
  
  var uploadFile = multer({ storage: storage});

  async function getBpfrDownload(req, res, next) {
	try {
		const { id } = req.query;

		const filter = {};
		if (id) {
			filter.id = { [Op.eq]: id };
		}
		
		const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 1000; // Number of records per page
		const {field} = req.query;
		const {order} = req.query;
		
			const BPFRD = await bpfrList.findAll({
				where: filter,
				// order:  [[field,order]],
				limit
			});

			const updateBpfr = await bpfrDownload.update({
				status: 'DOWNLOADED', 
				download_date: new Date 
			},{
				where: {id: id}}
				).then((bpfrDownload ) => {
					console.log(`${bpfrDownload} record(s) updated successfully.`);
				  })
				  .catch((error) => {
					console.error('Error updating records:', error);
				});
			res.status(200).json({
				code: 0,
				result: {
					items: BPFRD
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
	getBpfrList,
	getUnggahBpfrList,
	UploadFile,
	getBpfrDownload
};