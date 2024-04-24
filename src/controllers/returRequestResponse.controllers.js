const { query } = require('express');
const { Op } = require('sequelize');
const rReqResponseList = require('../models/returnReqResponseList.models');
const rReqResponseDetail = require('../models/returnReqResponseDetail.models');
const rReqResponseInfo = require('../models/returnReqResponseInfo.models');
const rrir = require('../models/rrir.models');
const rrr = require('../models/rrr.models');

//list data filter 
async function getReturnReqResponseList(req, res, next) {
	try {
		const { merchant } = req.query;
		const { status } = req.query;
		const { department } = req.query;
		const { start_date } = req.query;
		const { end_date } = req.query;
		const { toko } = req.query;
		const { business_unit } = req.query;
		const { return_request_number } = req.query;
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
			filter.return_request_date = { [Op.between]: [ startedDate, endDate ] };
		}
		if (toko) {
			filter.store = { [Op.iLike]: `%${toko}%` };
		}
		if (business_unit) {
			filter.business_unit = { [Op.iLike]: `%${business_unit}%` };
		}
		if (return_request_number) {
			filter.return_request_number = { [Op.iLike]: `%${return_request_number}%` };
		}
		if (supplier_code) {
			filter.supplier_code = { [Op.iLike]: `%${supplier_code}%` };
		}

		if(req.query.status=="ALL" || Object.keys(filter).length===0){
			if(Object.keys(filter).length === 0){	
				res.status(200).json({
					code: 0,
					result: {
						items: []
					},
					message: 'ok',
					type: 'success'
				});
			}else {
				console.log("masuk");
				const rrr = await rReqResponseList.findAll({
					where: {supplier_code: supplier_code},
					limit: 100
				});
				res.status(200).json({
					code: 0,
					result: {
						items: rrr
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
		
			const RRR = await rReqResponseList.findAll({
				where: filter,
				// order:  [[field,order]],
				limit
			});
			res.status(200).json({
				code: 0,
				result: {
					items: RRR
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
		const RRR = await rReqResponseInfo.findAll({
			where: filter,
			limit
		});
		res.status(200).json({
			code: 0,
			result: {
				items: RRR
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

		const RRR = await rReqResponseDetail.findAll({
			where: filter,
			limit
		});
		res.status(200).json({
			code: 0,
			result: {
				items: RRR
			},
			message: 'ok',
			type: 'success'
			});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}

//edit
async function editRRR(req, res, next) {
	const {rrir_id}= req.body;
	const {terima}= req.body;
	try{
  		
		const updaterrir =await rrir.update({
			accepted: terima},{
			where: {id: rrir_id}}
		).then((updaterrir ) => {
			console.log(`${updaterrir} record(s) updated successfully.`);
			 })
			.catch((error) => {
			console.error('Error updating records:', error);
			});

			res.status(200).json({
				code: 0,
				result: updaterrir,
				message: 'ok',
				type: 'success'
			});
		
	} catch (error) {
		console.log(error);
	}
}

//edit
async function kirimRRR(req, res, next) {
	const {id}= req.body;
	try{
  		
		const updaterrr =await rrr.update({
			status: 'APPROVED'},{
			where: {id: id}}
		).then((updaterrir ) => {
			console.log(`${updaterrir} record(s) updated successfully.`);
			 })
			.catch((error) => {
			console.error('Error updating records:', error);
			});

			res.status(200).json({
				code: 0,
				result: updaterrr,
				message: 'ok',
				type: 'success'
			});
		
	} catch (error) {
		console.log(error);
	}
}

async function updateUrl(req, res, next) {
  try {
    const {id}= req.body;
    const {url}= req.body;

    const RRR = await rrr.update({
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
	getReturnReqResponseList,
	viewbycdtinfo,
	viewbycdtdetail,
	editRRR,
	kirimRRR,
	updateUrl
};