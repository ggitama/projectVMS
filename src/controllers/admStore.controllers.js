const { query } = require('express');
const { Op } = require('sequelize');
const storeList = require('../models/adm.store.models');
const store = require('../models/store.models');
const businessUnitList = require('../models/adm.businessunit.models');
const bUnit = require('../models/c4BusinessUnit.models');


async function getStoreList(req, res, next) {
	try {
		const { kode_toko } = req.query;
		const { nama_toko } = req.query;
		const { gln } = req.query;
		const { search } = req.query;

		const filter = {};
		if (kode_toko) {
			filter.kode_toko = { [Op.iLike]: `%${kode_toko}%` };
		}
		if (nama_toko) {
			filter.nama_toko = { [Op.iLike]: `%${nama_toko}%` };
		}
		if (gln) {
			filter.gln = { [Op.iLike]: `%${gln}%` };
		}
		if (search) {
			filter.search = { [Op.iLike]: `%${search}%` };
		}
		
		const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 1000; // Number of records per page
		const {field} = req.query;
		const {order} = req.query;
		
			const store = await storeList.findAll({
				where: filter,
				// order:  [[field,order]],
				limit
			});
			res.status(200).json({
				code: 0,
				result: {
					items: store
				},
				message: 'ok',
				type: 'success'
			});
		
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}

async function actionSave (req, res) {
	try{
	const { store_id } = req.body;
	const { name } = req.body;
	const { gln } = req.body;
	const { business_unit } = req.body;
	let { is_logistic } = req.body;
	const { created_by } = req.body;

	if (is_logistic){
		is_logistic = 'y';
	}else{
		is_logistic ='n';
	}

	const filter = {};
		if (business_unit) {
			filter.id = { [Op.eq]: `${business_unit}` };
		}

	const A = await bUnit.findOne({
		where: filter,
		attributes: ['business_unit_address'],
	});
	console.log('ini adalah '+A.business_unit_address);
	const updateRri =await store.create({
		store_idx: store_id, 
		name: name, 
		storegln: gln, 
		c4business_unit: business_unit, 
		logistic_flag: is_logistic,
		created_by: created_by,
		created_on: new Date,
		// last_updated_by: 'system',
		// last_updated_on: new Date,
		mversion: 0,
		address: A.business_unit_address
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

async function postStoreList(req, res, next) {
	try {
		const { id } = req.body;
		const { store_id } = req.body;
		const { name } = req.body;
		const { gln } = req.body;
		const { business_unit } = req.body;
		let { is_logistic } = req.body;
		const { last_updated_by } = req.body;
		// const {mversion} = 1;

		const filter = {};
		if (store_id) {
			filter.store_id = { [Op.iLike]: `%${store_id}%` };
		}
		// if (is_logistic){
		// 	is_logistic = 'y';
		// }else{
		// 	is_logistic ='n';
		// }
	
		// const filter2 = {};
		// 	if (business_unit) {
		// 		filter2.id = { [Op.eq]: `${business_unit}` };
		// 	}
	
		// const A = await bUnit.findOne({
		// 	where: filter2,
		// 	attributes: ['business_unit_address'],
		// });
		// console.log('ini adalah '+A.business_unit_address);
		
		const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 1000; // Number of records per page
		const {field} = req.query;
		const {order} = req.query;
		
			const toko = await store.findAll({
				where: filter,
				limit
			});

			res.status(200).json({
				code: 0,
				result: {
					items: toko
				},
				message: 'ok',
				type: 'success'
			});
		
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}
async function postStoreUpdate(req, res, next) {
	try {
		const { id } = req.body;
		const { store_id } = req.body;
		const { name } = req.body;
		const { gln } = req.body;
		const { business_unit } = req.body;
		let { is_logistic } = req.body;
		const { last_updated_by } = req.body;
		// const {mversion} = 1;

		const filter = {};
		if (store_id) {
			filter.store_id = { [Op.iLike]: `%${id}%` };
		}
		if (is_logistic){
			is_logistic = 'y';
		}else{
			is_logistic ='n';
		}
	
		const filter2 = {};
			if (business_unit) {
				filter2.id = { [Op.eq]: `${business_unit}` };
			}
	
		const A = await bUnit.findOne({
			where: filter2,
			attributes: ['business_unit_address'],
		});
		console.log('ini adalah '+A.business_unit_address);
		
		const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 1000; // Number of records per page
		const {field} = req.query;
		const {order} = req.query;
		
		const toko = await store.findAll({
			where: filter,
			limit
		});

		const filter3 = {};
			if (store_id) {
				filter3.store_id = { [Op.eq]: `${id}` };
			}
	
		const x = await store.findOne({
			where: filter3,
			attributes: ['mversion'],
		});
		// const y = (parseInt(x.mversion) + 1);
		// console.log('ini adalah '+x.mversion);

			const updateStore = await store.update({
				store_id:store_id,
				name: name,
				storegln: gln,
				c4business_unit: business_unit,
				logistic_flag: is_logistic,
				last_updated_by: last_updated_by,
				last_updated_on: new Date,
				mversion: 1,
				address: A.business_unit_address
			},{
				where: {store_idx: id}}
				).then((updateStore ) => {
					console.log(`${updateStore} record(s) updated successfully.`);
				  })
				  .catch((error) => {
					console.error('Error updating records:', error);
				});

			res.status(200).json({
				code: 0,
				result: {
					items: toko
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
	getStoreList,
	actionSave,
	postStoreList,
	postStoreUpdate
};