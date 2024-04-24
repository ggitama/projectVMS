const { query } = require('express');
const { Op } = require('sequelize');
const businessUnitList = require('../models/adm.businessunit.models');
const bUnit = require('../models/c4BusinessUnit.models');

//list data filter 
async function getBusinessUnitList(req, res, next) {
	try {
		const { kode } = req.query;
		const { nama } = req.query;
		const { alamat } = req.query;
		const { registrasi } = req.query;
		const { setid } = req.query;
		const { search } = req.query;

		const filter = {};
		if (kode) {
			filter.kode = { [Op.iLike]: `%${kode}%` };
		}
		if (nama) {
			filter.nama = { [Op.iLike]: `%${nama}%` };
		}
		if (alamat) {
			filter.alamat = { [Op.iLike]: `%${alamat}%` };
		}
		if (registrasi) {
			filter.registrasi = { [Op.iLike]: `%${registrasi}%` };
		}
		if (setid) {
			filter.setid = { [Op.iLike]: `%${setid}%` };
		}
		if (search) {
			filter.search = { [Op.iLike]: `%${search}%` };
		}
		
		const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 1000; // Number of records per page
		const {field} = req.query;
		const {order} = req.query;
		
			const businessUnit = await businessUnitList.findAll({
				where: filter,
				// order:  [[field,order]],
				limit
			});
			res.status(200).json({
				code: 0,
				result: {
					items: businessUnit
				},
				message: 'ok',
				type: 'success'
			});
		
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}

async function actionCreateBU (req, res) {
	try{
	const { id } = req.body;
	const { mversion } = req.body;
	const { setid } = req.body;
	const { business_unitgln } = req.body;
	const { business_unit_code } = req.body;
	const { business_unit_name } = req.body;
	const { business_unit_address } = req.body;
	const { business_unit_registration } = req.body;
	const { hm_od_directory } = req.body;
	const { ima_store_prefix } = req.body;
	
	const updateRri = await bUnit.create({
		business_unit_code: business_unit_code, 
		business_unit_name: business_unit_name, 
		business_unitgln: business_unitgln, 
		business_unit_address: business_unit_address, 
		business_unit_registration: business_unit_registration, 
		setid: setid,
		mversion: 0,
		hm_od_directory: hm_od_directory,
		ima_store_prefix: ima_store_prefix,

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

async function getBusinessUnitById(req, res, next) {
	try {
		const { id } = req.body;
	
		const filter = {};
		if (id) {
			filter.id = { [Op.eq]: id };
		}
		const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 1000; // Number of records per page
		const {field} = req.query;
		const {order} = req.query;
		
			const getBusinessUnit = await bUnit.findAll({
				where: filter,
				limit
			});

			res.status(200).json({
				code: 0,
				result: {
					items: getBusinessUnit
				},
				message: 'ok',
				type: 'success'
			});
		
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}

async function businessUnitUpdate(req, res, next) {
	try {
		const { id } = req.body;
		const { mversion } = req.body;
		const { setid } = req.body;
		const { business_unitgln } = req.body;
		const { business_unit_code } = req.body;
		const { business_unit_name } = req.body;
		const { business_unit_address } = req.body;
		const { business_unit_registration } = req.body;
		const { hm_od_directory } = req.body;
		const { ima_store_prefix } = req.body;

		const filter = {};
		if (id) {
			filter.id = { [Op.eq]: id };
		}
	

		const page = req.query.page || 1; // Current page number
		const limit = req.query.limit || 1000; // Number of records per page
		const {field} = req.query;
		const {order} = req.query;

		const getBusinessUnit = await bUnit.findAll({
			where: filter,
			limit
		});

			const updateBusinessUnit = await bUnit.update({
				business_unit_code: business_unit_code, 
				business_unit_name: business_unit_name, 
				business_unitgln: business_unitgln, 
				business_unit_address: business_unit_address, 
				business_unit_registration: business_unit_registration, 
				setid: setid,
				mversion: 1,
				hm_od_directory: hm_od_directory,
				ima_store_prefix: ima_store_prefix,
			},{
				where: {id: id}}
				).then((updateBusinessUnit ) => {
					console.log(`${updateBusinessUnit} record(s) updated successfully.`);
				  })
				  .catch((error) => {
					console.error('Error updating records:', error);
				});

			res.status(200).json({
				code: 0,
				result: {
					items: updateBusinessUnit
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
	getBusinessUnitList,
	actionCreateBU,
	getBusinessUnitById,
	businessUnitUpdate
};