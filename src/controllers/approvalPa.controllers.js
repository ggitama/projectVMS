
const { Op, Sequelize } = require('sequelize');
const approvalPa = require('../models/approvalPa.models');
const cat = require('../models/cm_agreement_type.models');
const cpt = require('../models/cm_promotion_type.models');

async function getApprovalPaList(req, res, next) {
	try {
		const { agreement_type } = req.query;
		const { pp_number } = req.query;
		const { period_from } = req.query;
		const { period_to } = req.query;
		const { created_from } = req.query;
		const { created_to } = req.query;
		const { status } = req.query;
		const { supplier_code } = req.query;
		const { supplier_name } = req.query;
		// const { item_code } = req.query;
		// const { item_name } = req.query;
		// const { promotion_type } = req.query;
		const { department } = req.query;
		const { sccId } = req.query;
		const { sccName } = req.query;
		const startedDate = new Date(created_from);
		const endDate = new Date(created_to);
		// const startedDatee = new Date(period_from);
		// const endDatee = new Date(period_to);

        const filter = {};
		if (agreement_type) {
			filter.agreement_type = { [Op.iLike]: `%${agreement_type}%` };
		}
		if (pp_number) {
			filter.pp_number = { [Op.iLike]: `%${pp_number}%` };
		}
		if (period_from) {
			filter.periode_from = Sequelize.literal(`date_trunc('day', periode_from) = to_date('${period_from}', 'DD-MM-YYYY')`);
		}
		if (period_to) {
			filter.periode_to = Sequelize.literal(`date_trunc('day', periode_to) = to_date('${period_to}', 'DD-MM-YYYY')`);
		}
		if (created_from && created_to) {
			filter.created_date = { [Op.between]: [ startedDate, endDate ] };
		}
		if (status) {
			filter.status = { [Op.iLike]: `%${status}%` };
		}
        if (supplier_code) {
			filter.supplier_code = { [Op.iLike]: `%${supplier_code}%` };
		}
        if (supplier_name) {
			filter.supplier_name = { [Op.iLike]: `%${supplier_name}%` };
		}
    //     if (item_code) {
		// 	filter.item_code = { [Op.iLike]: `%${item_code}%` };
		// }
    //     if (item_name) {
		// 	filter.item_name = { [Op.iLike]: `%${item_name}%` };
		// }
    //     if (promotion_type) {
		// 	filter.promotion_type = { [Op.iLike]: `%${promotion_type}%` };
		// }
		if (department) {
			filter.departement = { [Op.iLike]: `%${department}%` };
		}
		if (sccId) {
			filter.contract_code = { [Op.iLike]: `%${sccId}%` };
		}
		if (sccName) {
			filter.contract_name = { [Op.iLike]: `%${sccName}%` };
		}
		const AP = await approvalPa.findAll({
			where : filter
		});

		res.status(200).json({
			code: 0,
			result: {
				items: AP
			},
			message: 'ok',
			type: 'success'
			});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}

async function getAgreementType(req, res, next) {
	try {

		const CAT = await cat.findAll({
			order:  [['id', 'ASC']],
			});

		res.status(200).json({
			code: 0,
			result: {
				items: CAT
			},
			message: 'ok',
			type: 'success'
			});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}

async function getPromotionType(req, res, next) {
	try {

		const CPT = await cpt.findAll({
			order:  [['id', 'ASC']],
		});

		res.status(200).json({
			code: 0,
			result: {
				items: CPT
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
	getApprovalPaList,
	getAgreementType,
	getPromotionType
};
