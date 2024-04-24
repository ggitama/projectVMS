//NEW
const dashranew = require('../models/dash_ra_new.models');
const dashrarnew = require('../models/dash_rar_new.models');
const dashpfinew = require('../models/dash_pfi_new.models');

//AWAITING ACTION
const dashraraa = require('../models/dash_rar_aa.models');
const dashpfiaa = require('../models/dash_pfi_aa.models');
const dashinvdraft = require('../models/dash_inv_draft.models');
const dashraraa2 = require('../models/dash_rar_aa2.models');
const dashpfirdraft = require('../models/dash_pfir_draft.models');

const { Op } = require('sequelize');

async function dash_ra_new(req, res, next) {
	try {
		const { supplier_code } = req.query;
	    const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 1000; // Number of records per page
		const {field} = req.query;
		const {order} = req.query;

        const filter = {};
        if (supplier_code) {
			filter.supplier_code = { [Op.iLike]: `%${supplier_code}%` };
		}

		const ponew = await dashranew.findAll({
			where : filter,
			limit
		});
		res.status(200).json({
			code: 0,
			result: {
				items: ponew
			},
			message: 'ok',
			type: 'success'
			});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}

async function dash_rar_new(req, res, next) {
	try {
		const { supplier_code } = req.query;
	    const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 1000; // Number of records per page
		const {field} = req.query;
		const {order} = req.query;

        const filter = {};
        if (supplier_code) {
			filter.supplier_code = { [Op.iLike]: `%${supplier_code}%` };
		}

		const rar = await dashrarnew.findAll({
			where : filter
		});
		res.status(200).json({
			code: 0,
			result: {
				items: rar
			},
			message: 'ok',
			type: 'success'
			});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}

async function dash_pfi_new(req, res, next) {
	try {
		const { supplier_code } = req.query;
	    const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 1000; // Number of records per page
		const {field} = req.query;
		const {order} = req.query;

        const filter = {};
        if (supplier_code) {
			filter.supplier_code = { [Op.iLike]: `%${supplier_code}%` };
		}

		const PFI = await dashpfinew.findAll({
			where : filter
		});
		res.status(200).json({
			code: 0,
			result: {
				items: PFI
			},
			message: 'ok',
			type: 'success'
			});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}

//AWAITING ACTION
async function dash_ra_aa(req, res, next) {
	try {
		const { supplier_code } = req.query;
	    const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 1000; // Number of records per page
		const {field} = req.query;
		const {order} = req.query;

        const filter = {};
        if (supplier_code) {
			filter.supplier_code = { [Op.iLike]: `%${supplier_code}%` };
		}

		const rar = await dashraraa.findAll({
			where : filter
		});
		res.status(200).json({
			code: 0,
			result: {
				items: rar
			},
			message: 'ok',
			type: 'success'
			});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}

async function dash_pfi_aa(req, res, next) {
	try {
		const { supplier_code } = req.query;
	    const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 1000; // Number of records per page
		const {field} = req.query;
		const {order} = req.query;

        const filter = {};
        if (supplier_code) {
			filter.supplier_code = { [Op.iLike]: `%${supplier_code}%` };
		}

		const PFI = await dashpfiaa.findAll({
			where : filter
		});
		res.status(200).json({
			code: 0,
			result: {
				items: PFI
			},
			message: 'ok',
			type: 'success'
			});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}

async function dash_inv_draft(req, res, next) {
	try {
		const { supplier_code } = req.query;
	    const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 1000; // Number of records per page
		const {field} = req.query;
		const {order} = req.query;

        const filter = {};
        if (supplier_code) {
			filter.supplier_code = { [Op.iLike]: `%${supplier_code}%` };
		}

		const INV = await dashinvdraft.findAll({
			where : filter
		});
		res.status(200).json({
			code: 0,
			result: {
				items: INV
			},
			message: 'ok',
			type: 'success'
			});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}
//UNTUK ROLE RECEIVING HEAD
async function dash_rar_aa2(req, res, next) {
	try {
	    const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 1000; // Number of records per page
		const {field} = req.query;
		const {order} = req.query;

		const rar = await dashraraa2.findAll();
		res.status(200).json({
			code: 0,
			result: {
				items: rar
			},
			message: 'ok',
			type: 'success'
			});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}

//UNTUK ROLE SENIOR BUYER DAN MECHANDISER
async function dash_pfir_draft(req, res, next) {
	try {
	    const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 1000; // Number of records per page
		const {field} = req.query;
		const {order} = req.query;

		const pfir = await dashpfirdraft.findAll();
		res.status(200).json({
			code: 0,
			result: {
				items: pfir
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
	//NEW
	dash_ra_new,
	dash_rar_new,
	dash_pfi_new,

	//AWAITING ACTION
	dash_ra_aa,
	dash_pfi_aa,
	dash_inv_draft,
	dash_rar_aa2,
	dash_pfir_draft

};
