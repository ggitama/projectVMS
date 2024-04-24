const { query } = require('express');
const { Op } = require('sequelize');
const rConfirmList = require('../models/returnConfirmList.models');
const rConfirmInfo = require('../models/returnConfirmInfo.models');
const rConfirmDetail = require('../models/returnConfirmDetail.models');
const rc = require('../models/returConfirmation.models');


//list data filter 
async function getReturnConfirmList(req, res, next) {
	try {
		const { merchant } = req.query;
		const { status } = req.query;
		const { department } = req.query;
		const { start_date } = req.query;
		const { end_date } = req.query;
		const { toko } = req.query;
		const { business_unit } = req.query;
		const { rtn_confirmation_number } = req.query;
		const { supplier_code } = req.query;
		const startedDate = new Date(start_date);
		const endDate = new Date(end_date);

		const filter = {};
		if (merchant) {
			filter.supplier = { [Op.iLike]: `%${merchant}%` };
		}
		if (status) {
			filter.status = { [Op.iLike]: `%${status}%` };
		}
		if (department) {
			filter.departemen = { [Op.iLike]: `%${department}%` };
		}
		if (start_date && end_date) {
			filter.rtn_confirmation_date = { [Op.between]: [ startedDate, endDate ] };
		}
		if (toko) {
			filter.store = { [Op.iLike]: `%${toko}%` };
		}
		if (business_unit) {
			filter.business_unit = { [Op.iLike]: `%${business_unit}%` };
		}
		if (rtn_confirmation_number) {
			filter.rtn_confirmation_number = { [Op.iLike]: `%${rtn_confirmation_number}%` };
		}
		if (supplier_code) {
			filter.supplier_code = { [Op.iLike]: `%${supplier_code}%` };
		}

		if(req.query.status=="ALL" || req.query.business_unit=="ALL" || Object.keys(filter).length===0){
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
				const RC = await rConfirmList.findAll({
					where: {supplier_code: supplier_code},
					limit: 100
				});
				res.status(200).json({
					code: 0,
					result: {
						items: RC
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
		
			const RC = await rConfirmList.findAll({
				where: filter,
				// order:  [[field,order]],
				limit
			});
			res.status(200).json({
				code: 0,
				result: {
					items: RC
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

//view detail
async function viewbycdtinfo(req, res, next) {
	try {
		const { id } = req.body;
		const filter = {};
		if (id) {
			filter.url = { [Op.eq]: `${id}` };
		}

		const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 1000; // Number of records per page
		const {field} = req.query;
		const {order} = req.query;
		const RC = await rConfirmInfo.findAll({
			where: filter,
			limit
		});
		res.status(200).json({
			code: 0,
			result: {
				items: RC
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

		const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 1000; // Number of records per page
		const {field} = req.query;
		const {order} = req.query;

		const RC = await rConfirmDetail.findAll({
			where: filter,
			limit
		});
		res.status(200).json({
			code: 0,
			result: {
				items: RC
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
    const {id}= req.body;
    const {url}= req.body;

    const RR = await rc.update({
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
	getReturnConfirmList,
	viewbycdtinfo,
	viewbycdtdetail,
	updateUrl
};