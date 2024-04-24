const { query } = require('express');
const { Op } = require('sequelize');
const warehouseList = require('../models/adm.warehouse.models');
const store = require('../models/store.models');
const warehouse = require('../models/warehouse2.models');
 
//list data filter 
async function getWarehouseList(req, res, next) {
	try {
		const { warehouse_code } = req.query;
		const { warehouse_name } = req.query;
		const { toko } = req.query;
		const { int_code } = req.query;
		const { for_interface } = req.query;
		const { search } = req.query;

		const filter = {};
		if (warehouse_code) {
			filter.warehouse_code = { [Op.iLike]: `%${warehouse_code}%` };
		}
		if (warehouse_name) {
			filter.warehouse_name = { [Op.iLike]: `%${warehouse_name}%` };
		}
		if (toko) {
			filter.toko = { [Op.iLike]: `%${toko}%` };
		}
		if (int_code) {
			filter.int_code = { [Op.iLike]: `%${int_code}%` };
		}
		if (for_interface) {
			filter.for_interface = { [Op.iLike]: `%${for_interface}%` };
		}
		if (search) {
			filter.search = { [Op.iLike]: `%${search}%` };
		}
		
		const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 1000; // Number of records per page
		const {field} = req.query;
		const {order} = req.query;
		
			const warehouse = await warehouseList.findAll({
				where: filter,
				// order:  [[field,order]],
				limit
			});
			res.status(200).json({
				code: 0,
				result: {
					items: warehouse
				},
				message: 'ok',
				type: 'success'
			});
		
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}

async function actionCreate (req, res) {
	try{
	const { id } = req.body;
	const { mversion } = req.body;
	let { for_interface } = req.body;
	const { int_code } = req.body;
	const { store_code } = req.body;
	const { warehouse_code } = req.body;
	const { warehouse_name } = req.body;
	const { address } = req.body;

	if (for_interface){
		for_interface = 'Y';
	}else{
		for_interface ='N';
	}

	const filter = {};
		if (store_code) {
			filter.store_idx = { [Op.eq]: `${store_code}` };
		}

	const A = await store.findOne({
		where: filter,
		attributes: ['address'],
	});
	console.log('ini adalah '+A.address);
	const updateRri = await warehouse.create({
		warehouse_code: warehouse_code, 
		warehouse_name: warehouse_name, 
		int_code: int_code, 
		store_code: store_code, 
		for_interface: for_interface,
		mversion: 0,
		address: A.address == null? '' : A.address
	});
	
		res.status(200).json({
			code: 0,
			result: updateRri,
			message: 'ok',
			type: 'success'
		});
	} catch (error) {
		console.log(error);
	}
}

async function getWarehouseById(req, res, next) {
	try {
		const { id } = req.body;
		const { warehouse_code } = req.body;
	
		const filter = {};
		if (id) {
			filter.id = { [Op.eq]: id };
		}
		const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 1000; // Number of records per page
		const {field} = req.query;
		const {order} = req.query;
		
			const getWarehouse = await warehouse.findAll({
				where: filter,
				limit
			});

			res.status(200).json({
				code: 0,
				result: {
					items: getWarehouse
				},
				message: 'ok',
				type: 'success'
			});
		
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}

async function warehouseUpdate(req, res, next) {
	try {
		const { id } = req.body;
		let { for_interface } = req.body;
		const { int_code } = req.body;
		const { store_code } = req.body;
		const { warehouse_code } = req.body;
		const { warehouse_name } = req.body;
		
		if (for_interface){
			for_interface = 'Y';
		}else{
			for_interface ='N';
		}
	
		const filter2 = {};
			if (store_code) {
				filter2.store_idx = { [Op.eq]: `${store_code}` };
		}
	
		const A = await store.findOne({
			where: filter2,
			attributes: ['address'],
		});
		console.log('ini adalah '+A.address);
	
			const updateWarehouse = await warehouse.update({
				warehouse_code: warehouse_code, 
				warehouse_name: warehouse_name, 
				int_code: int_code, 
				store_code: store_code, 
				for_interface: for_interface,
				mversion: 1,
				address: A.address
			},{
				where: {id: id}}
				).then((updateWarehouse ) => {
					console.log(`${updateWarehouse} record(s) updated successfully.`);
				  })
				  .catch((error) => {
					console.error('Error updating records:', error);
				});

			const getWarehouse = await warehouse.findAll({
				where: {id: id}
			});

			res.status(200).json({
				code: 0,
				result: {
					items: getWarehouse
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
	getWarehouseList,
	actionCreate,
	getWarehouseById,
	warehouseUpdate
};