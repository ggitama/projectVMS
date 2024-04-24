const { query } = require('express');
const { Op } = require('sequelize');
const bpfrList = require('../models/buktiPotongFeeRebateList.models');
const documentList = require('../models/document.models');
const documentRetur = require('../models/documentRetur.models');
const documentCons = require('../models/documentCons.models');
const pfir = require('../models/proformaInvoiceResponse.models');
const pfirDoc = require('../models/pfirDoc.models');
const pfiDoc = require('../models/pfiDoc.models');
const raDoc = require('../models/raDoc.models');
const rarDoc = require('../models/rarDoc.models');
const poDoc = require('../models/poDoc.models');
const invDoc = require('../models/invDoc.models');


//list data filter 
async function getDocumentListNew(req, res, next) {
	try {
		const { po_id2 } = req.query;
		
		const filter2 = {};
		
		if (po_id2) {
			filter2.po_id = { [Op.eq]: po_id2 };
		}
		
		const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 1000; // Number of records per page
		const {field} = req.query;
		const {order} = req.query;

		const PO =  await poDoc.findAll({
			where: filter2
		});
		
		const RA =  await raDoc.findAll({
			where: filter2
		});

		const RAR =  await rarDoc.findAll({
			where: filter2
		});

		const PFI =  await pfiDoc.findAll({
			where: filter2
		});

		const PFIR =  await pfirDoc.findAll({
			where: filter2
		});

		const INV =  await invDoc.findAll({
			where: filter2
		});

		res.status(200).json({
			code: 0,
			result: {
				PO, RA, RAR, PFI, PFIR, INV
			},
			message: 'ok',
			type: 'success'
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}

async function getDocumentList(req, res, next) {
	try {
		const { id } = req.query;
		const {ra_id} =  req.query;
		const { rar_id } = req.query;
		const { pfi_id } = req.query;
		const { pfir_id } = req.query;
		const { i_id } = req.query;

		
		const filter = {};
		if (id) {
			filter.id = { [Op.eq]: id };
		}

		const filter2 = {};
		if (id) {
			filter.id = { [Op.eq]: id };
		}
		if (ra_id) {
			filter.ra_id = { [Op.eq]: ra_id };
		}
		if (rar_id) {
			filter.rar_id = { [Op.eq]: rar_id };
		}
		if (pfi_id) {
			filter.pfi_id = { [Op.eq]: pfi_id };
		}
		if (pfir_id) {
			filter.pfir_id = { [Op.eq]: pfir_id };
		}
		if (i_id) {
			filter.i_id = { [Op.eq]: i_id };
		}
		
		const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 1000; // Number of records per page
		const {field} = req.query;
		const {order} = req.query;
		
		const document = await documentList.findAll({
			where: filter,
			limit
		});
		res.status(200).json({
			code: 0,
			result: {
				items: document
			},
			message: 'ok',
			type: 'success'
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}

async function getDocumentRetur(req, res, next) {
	try {
		const { id } = req.query;
		const {rc_id} =  req.query;

		const filter = {};
		if (id) {
			filter.id = { [Op.eq]: id };
		}

		const filter2 = {};
		if (id) {
			filter.id = { [Op.eq]: id };
		}
		if (rc_id) {
			filter.ra_id = { [Op.eq]: ra_id };
		}
		
		const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 1000; // Number of records per page
		const {field} = req.query;
		const {order} = req.query;
		
		const document = await documentRetur.findAll({
			where: filter,
			limit
		});
		res.status(200).json({
			code: 0,
			result: {
				items: document
			},
			message: 'ok',
			type: 'success'
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}
async function getDocumentCons(req, res, next) {
	try {
		const { cdt } = req.query;

		const filter = {};
		if (cdt) {
			filter.cdt = { [Op.eq]: cdt };
		}
		
		const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 1000; // Number of records per page
		const {field} = req.query;
		const {order} = req.query;
		
		const document = await documentCons.findAll({
			where: filter,
			limit
		});
		res.status(200).json({
			code: 0,
			result: {
				items: document
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
	getDocumentListNew,
	getDocumentList,	
	getDocumentRetur,
	getDocumentCons
};