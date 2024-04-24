const { query } = require('express');
const { Op } = require('sequelize');
const cnList = require('../models/creditNoteList.models');
const cnInfo = require('../models/creditNoteInfo.models');
const cnDetail = require('../models/creditNoteDetail.models');
const cn = require('../models/creditNote.models');

//list data filter 
async function getCreditNoteList(req, res, next) {
	try {
		const { nomor_seri_pajak } = req.query;
		const { supplier_code } = req.query;
		const { start_date } = req.query;
		const { end_date } = req.query;
		const { status } = req.query;
		const { business_unit } = req.query;
		const startedDate = new Date(start_date);
		const endDate = new Date(end_date);

		const filter = {};
		if (nomor_seri_pajak) {
			filter.no_seri_pajak = { [Op.iLike]: `%${nomor_seri_pajak}%` };
		}
		if (supplier_code) {
			filter.supplier_code = { [Op.iLike]: `%${supplier_code}%` };
		}
		if (start_date && end_date) {
			filter.return_date = { [Op.between]: [ startedDate, endDate ] };
		}
		if (status) {
			filter.status = { [Op.iLike]: `%${status}%` };
		}
		if (business_unit) {
			filter.business_unit = { [Op.iLike]: `%${business_unit}%` };
		}
		
		if(req.query.status=="ALL" || req.query.business_unit=="ALL"|| Object.keys(filter).length === 0 ){	
			if(Object.keys(filter).length === 0){	
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
				const CN = await cnList.findAll({
					where: {supplier_code: supplier_code},
					limit: 100
				});
			res.status(200).json({
				code: 0,
				result: {
					items: CN
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
		
			const CN = await cnList.findAll({
				where: filter,
				// order:  [[field,order]],
				limit
			});
			res.status(200).json({
				code: 0,
				result: {
					items: CN
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

//view info
async function viewbycdtinfo(req, res, next) {
	try {
		const { id } = req.body;
		
		const filter = {};
		if (id) {
			filter.url = { [Op.eq]: `${id}` };
		}

		const CN = await cnInfo.findAll({
			where: filter,
		});

		res.status(200).json({
			code: 0,
			result: {
				items: CN
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
async function viewbycdtdetail(req, res, next) {
	try {
		const { id } = req.body;
		const filter = {};
		if (id) {
			filter.url = { [Op.eq]: `${id}` };
		}

		const CN = await cnDetail.findOne({
			where: filter
		});

		res.status(200).json({
			code: 0,
			result: {
				items: CN
			},
			message: 'ok',
			type: 'success'
			});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}

async function updateUrl(req, res, next) {
  try {
    const { id }= req.body;
    const { url }= req.body;

    const CN = await cn.update({
      url: url
    }, {where: {id: id}});

      res.status(200).json({
        code: 0,
        result: {
          items: id,
        },
        message: "ok",
        type: "success",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invalid" });
  }
}
module.exports = {
	getCreditNoteList,
	viewbycdtinfo,
	viewbycdtdetail,
	updateUrl
};