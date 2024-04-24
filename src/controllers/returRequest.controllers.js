const { query } = require('express');
const { Op } = require('sequelize');
const rReqList = require('../models/returnReqList.models');
const rReqDetail = require('../models/returnReqDetail.models');
const rReqInfo = require('../models/returnReqInfo.models');
const rri = require('../models/returRequestItem.models');
const rr = require('../models/returRequest.models');
const rrr = require('../models/rrr.models');
const rrir = require('../models/rrir.models');

//list data filter 
async function getReturnReqList(req, res, next) {
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
			filter.rtn_request_date = { [Op.between]: [ startedDate, endDate ] };
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
		if(req.query.status=="ALL" || req.query.business_unit=="ALL"|| Object.keys(filter).length===0){
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
				const RR = await rReqList.findAll({
					where: {supplier_code: supplier_code},
					limit: 100
				});
			res.status(200).json({
				code: 0,
				result: {
					items: RR
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
		
			const RR = await rReqList.findAll({
				where: filter,
				// order:  [[field,order]],
				limit
			});
			res.status(200).json({
				code: 0,
				result: {
					items: RR
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

		const RRI = await rReqInfo.findAll({
			where: filter,
			limit
		});
		res.status(200).json({
			code: 0,
			result: {
				items: RRI
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

		const RRI = await rReqDetail.findAll({
			where: filter,
			limit
		});
		res.status(200).json({
			code: 0,
			result: {
				items: RRI
			},
			message: 'ok',
			type: 'success'
			});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}

async function updateReturReq(req, res, next) {
	try {
		const { id } = req.body;
		const { REMARKS } = req.body;
		const { ACCEPTED } = req.body;
	
		const filter = {};
		if (id) {
			filter.id = { [Op.eq]: id };
		}

		const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 10; // Number of records per page
		const {field} = req.query;
		const {order} = req.query;

			const updateRR = await rri.update({
				remark: REMARKS, accepted: ACCEPTED },
				{where: {id: id}
			}).then((updateRR ) => {
					console.log(`${updateRR} record(s) updated successfully.`);
				  })
				  .catch((error) => {
					console.error('Error updating records:', error);
				});
			res.status(200).json({
				code: 0,
				result: {
					rr_id : updateRR
				},
				message: 'ok',
				type: 'success'
			});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error' });
	}
}

async function actionSent(req, res, next) {
	const { ID } = req.body;
	console.log(req.body);

	try {
	
		const filter = {};
		if (ID) {
			filter.id = { [Op.eq]: ID };
		}
		const filter2 = {};
		if (ID) {
			filter2.ret = { [Op.eq]: ID };
		}

		const RR = await rr.findOne({
			where: filter
		});

		const RRR = await rrr.create({
			created_by: "system",
          	created_on: new Date(),
          	last_updated_by: "system",
          	last_updated_on: new Date(),
			c4business_unit: RR.c4business_unit,
			//dc_vendor_code: cPfiItem.lgt_amount,
			dept_code: RR.dept_code,
			ext_ref_no: RR.ext_ref_no,
			request_total_amount: RR.request_total_amount,
			return_request_number: RR.return_request_number,
			store_code: RR.store_code,
			supplier_code: RR.supplier_code,
			supplier_id: RR.supplier_id,
			return_request: RR.id,
			rtn_request_date: new Date(),
			status: 'NEW',
			// remarks: 10,
			organization_unit: RR.organization_unit,
			pick_up_location: RR.pick_up_location,
		});

		const RRItem = await rri.findAll({
			where: filter2,
			raw: true, // <--- HERE
		  });

		  console.log(RRItem);
	  
		  const RRRItem = await rrir.bulkCreate(
			RRItem.map((RRItem) => {
			  return {
				created_by: "system",
				created_on: new Date(),
				last_updated_by: "system",
				last_updated_on: new Date(),
				accepted: 'N',
				item_barcode: RRItem.item_barcode,
				item_code: RRItem.item_code,
				item_name: RRItem.item_name,
				line_no: RRItem.line_no,
				// remark: cPfiItem.total_base_con_payable,
				return_reason_code: RRItem.return_reason_code,
				return_reason_desc: RRItem.return_reason_desc,
				return_request_amount: RRItem.return_request_amount,
				return_request_quantity: RRItem.return_request_quantity,
				return_request_unit_price: RRItem.return_request_unit_price,
				vat_rate: RRItem.vat_rate,
				rq_item_id: RRItem.id,
				rqr_id: RRR.id
			  };
			})
		  );

		const updateRR =await rr.update({
			status: 'RQR_PROCESSED' },{
			where: {id: ID}}
		).then((updateRR ) => {
				console.log(`${updateRR} record(s) updated successfully.`);
			}).catch((error) => {
			console.error('Error updating records:', error);
		});
		
		res.status(200).json({
				code: 0,
				result: {
					items : RRR
				},
				message: 'ok',
				type: 'success'
			});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error' });
	}
}

async function updateUrl(req, res, next) {
  try {
    const {id}= req.body;
    const {url}= req.body;

    const RR = await rr.update({
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
	getReturnReqList,
	viewbycdtinfo,
	viewbycdtdetail,
	updateReturReq,
	actionSent,
	updateUrl
};