
const { Op, Sequelize } = require('sequelize');
const calculatePa = require('../models/calculatePa.models');
const { toDate } = require('validator');

async function getCalculatePaList(req, res, next) {
	try {
		const { pp_number } = req.query;
		const { period_start } = req.query;
		const { period_end } = req.query;
		// const startedDatee = new Date(period_start);
		// const endDatee = new Date(period_end);

    const filter = {};
		if (pp_number) {
			filter.agreement_code = { [Op.iLike]: `%${pp_number}%` };
		}
		if (period_start) {
			filter.agreement_start_date = Sequelize.literal(`date_trunc('day', agreement_start_date) = to_date('${period_start}', 'DD-MM-YYYY')`);
		}
		if (period_end) {
			filter.agreement_end_date = Sequelize.literal(`date_trunc('day', agreement_end_date) = to_date('${period_end}', 'DD-MM-YYYY')`);
		}
		const cp = await calculatePa.findAll({
			where : filter
		});

		res.status(200).json({
			code: 0,
			result: {
				items: cp
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
	getCalculatePaList
};
