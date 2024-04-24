const { Op, where, DATE } = require('sequelize');
const sequelize = require('../models/db');
const srl = require('../models/supplierRegList.models');
const srd1 = require('../models/supplierRegDetail1.models');
const srd2 = require('../models/supplierRegDetail2.models');
const srd3 = require('../models/supplierRegDetail3.models');
const supplierList = require('../models/supplierList.models');
const accountUser = require('../models/accountUser.models');
const userSupplierList = require('../models/userSupplier.models');
const supplier = require('../models/supplier.models');
const supplierDetail = require('../models/supplierDetail.models');
const sgm = require('../models/sgmember.models.js');
const sg = require('../models/sg.models');
const person = require('../models/person.models');
const auList = require('../models/auList.models');

async function getSupplierAll(req, res, next) {
	try {
		const { code } = req.query;
		const { local_name } = req.query;
		
		const filter = {};
		if (code) {
			filter.code = { [Op.iLike]: `%${code}%` };
		}
		if (local_name) {
			filter.local_name = { [Op.iLike]: `%${local_name}%` };
		}

			const S = await supplierList.findAll({
				where: filter
			});
			res.status(200).json({
				code: 0,
				result: S,
				message: 'ok',
				type: 'success'
			});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error' });
	}
}

async function daftarSuppMaster(req, res, next) {
	try {
		const code = req.body;
		

		const sd = await supplierDetail.findAll({
				where: {supplier_code: req.body.code},
				// raw: true
		});


		for (let a = 0; a < sd.length; a++) {
			console.log(sd[a].supplier_code);

			const createSupplier = await supplier.create({
				// created_by, 
				// created_on, 
				// last_updated_by, 
				// last_updated_on, 
				b2b: 'Y', 
				code: sd[a].supplier_code, 
				early_payment_flag: 'N', 
				edi_seq_no: 1, //todo dari profit 
				fws_flag: 'N', 
				name: sd[a].english_name, 
				mversion: 1, 
				// currency_code, 
				fax: sd[a].fax_number, 
				phone: sd[a].phone_number, 
				preferred_language: 'ID', 
				// primary_email, 
				supplier_detail: sd[a].id, 
				// company_registration_number,TODO 
				default_tax_percentage: 11, 
				digital_inv_flag: 'Y'
			});	

			const updateSd = await supplierDetail.update({
				boarded : 'Y'
				},{where: {supplier_code: req.body.code[a]}
			});

			const addAccountUser = await accountUser.create({
				// email: createSupplier[a].primary_email, 
				enabled: 'Y',  
				username: createSupplier.code,
				role_id: 26
			});
			}

			
		// 	const supp = await supplier.findAll({
		// 		where: {code: code}
		// });

		

			res.status(200).json({
				code: 0,
				result: {
					items : req.body.code
				},
				message: 'ok',
				type: 'success'
		});
	} catch (err) {
		console.error(err);
	}
}

async function createSupplier (req, res) {
		const {supplier_type}= req.body;
		const {contact_person}= req.body;
		const {username}= req.body;
		const {password}= req.body;
		//const {confirm_password}= req.body;
		const {email}= req.body;
		const {additional_email}= req.body;
		const {address}= req.body;
		const {invoiceD}= req.body;
		const supp= req.body;

		if(req.body.supplier_type === 'ROLE_SUPPLIER_DISTRIBUTOR'){
			const createAccountUser = await accountUser.create({
				mversion: '0', 
				email: email, 
				enabled: 'Y', 
				password: password, 
				username: username, 
				last_login: new Date, 
				mobile_number: contact_person, 
				last_pwd_change: new Date, 
				additional_email: additional_email, 
				//image: '', 
				//content_type: '', 
				//jid: '', 
				//new_password: '', 
				new_password_string: password, 
				role_id: 27,
				address: address
				});	

				const P = await person.create({
					mversion: 0, 
					first_name: username, 
					last_name: 'Administrator', 
					// middle_name, 
					// title, 
					account_user: createAccountUser.id
				});	

				const SG = await sg.create({
					created_by: 'admin', 
					created_on: new Date(), 
					// last_updated_by, 
					// last_updated_on, 
					mversion: 0, 
					// description, 
					supplier_group_code: username, 
					primary_contact: P.id
				});	
				for (let a = 0; a < req.body.supp.length; a++) {
					const s = await supplier.findAll({
							where: {code: req.body.supp[a]}
					}); 

					for (let b = 0; b <s.length; b++) {
						const SGM = await sgm.create({
							created_by: 'admin', 
							created_on: new Date(), 
							// last_updated_by, 
							// last_updated_on, 
							mversion: 0, 
							supplier_code: req.body.supp[a], 
							supplier: s[b].id, 
							supplier_group: SG.id
						});	
					}
				}

				const list = await auList.findAll({
						where: {id: createAccountUser.id}
				});

				res.status(200).json({
					code: 0,
					result: {
						user : list
					},
					message: 'ok',
					type: 'success'
				});
		}else{
			const createAccountUser = await accountUser.create({
				mversion: '0', 
				email: email, 
				enabled: 'Y', 
				password: password, 
				username: username, 
				last_login: new Date, 
				mobile_number: contact_person, 
				last_pwd_change: new Date, 
				additional_email: additional_email, 
				//image: '', 
				//content_type: '', 
				//jid: '', 
				//new_password: '', 
				new_password_string: password, 
				role_id: 25,
				address: address
				});		
				
				const P = await person.create({
					mversion: 0, 
					first_name: username, 
					last_name: 'Administrator', 
					// middle_name, 
					// title, 
					account_user: createAccountUser.id
				});	

				const SG = await sg.create({
					created_by: 'admin', 
					created_on: new Date(), 
					// last_updated_by, 
					// last_updated_on, 
					mversion: 0, 
					// description, 
					supplier_group_code: username, 
					primary_contact: P.id
				});	
				for (let a = 0; a < req.body.supp.length; a++) {
					const s = await supplier.findAll({
							where: {code: req.body.supp[a]}
					}); 

					const SGM = await sgm.create({
						created_by: 'admin', 
						created_on: new Date(), 
						// last_updated_by, 
						// last_updated_on, 
						mversion: 0, 
						supplier_code: req.body.supp[a], 
						supplier: s.id, 
						supplier_group: sg.id
					});	
				}
			const list = await auList.findAll({
					where: {id: createAccountUser.id}
			});

			res.status(200).json({
				code: 0,
				result: {
					user : list
				},
				message: 'ok',
				type: 'success'
			});
		}
}
			
		

async function userSupplier(req, res, next) {
	try {
		const { username } = req.body;
		
		const filter = {};
		if (username) {
			filter.username = { [Op.iLike]: `%${username}%` };
		}

			const US = await userSupplierList.findAll({
				where: filter
			});
			res.status(200).json({
				code: 0,
				result: US,
				message: 'ok',
				type: 'success'
			});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error' });
	}
}

async function suppRegList(req, res, next) {
	try {
		const { search } = req.query;
		
		const filter = {};
		if (search) {
			filter.search = { [Op.iLike]: `%${search}%` };
		}

			const SRL = await srl.findAll({
				where: filter
			});
			res.status(200).json({
				code: 0,
				result: SRL,
				message: 'ok',
				type: 'success'
			});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error' });
	}
}

async function suppRegDetail1(req, res, next) {
	try {
		const { id } = req.body;
		
		const filter = {};
		if (id) {
			filter.s_id = { [Op.eq]: `${id}` };
		}

			const SRD1 = await srd1.findAll({
				where: filter
			});
			res.status(200).json({
				code: 0,
				result: SRD1,
				message: 'ok',
				type: 'success'
			});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error' });
	}
}

async function suppRegDetail2(req, res, next) {
	try {
		const { id } = req.body;
		
		const filter = {};
		if (id) {
			filter.s_id = { [Op.eq]: `${id}` };
		}

			const SRD2 = await srd2.findAll({
				where: filter
			});
			res.status(200).json({
				code: 0,
				result: SRD2,
				message: 'ok',
				type: 'success'
			});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error' });
	}
}

async function suppRegDetail3(req, res, next) {
	try {
		const { id } = req.body;
		
		const filter = {};
		if (id) {
			filter.s_id = { [Op.eq]: `${id}` };
		}

			const SRD3 = await srd3.findAll({
				where: filter
			});
			res.status(200).json({
				code: 0,
				result: SRD3,
				message: 'ok',
				type: 'success'
			});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error' });
	}
}

async function editUserSupplier(req, res, next){
	const {contact_person}= req.body;
	const {username}= req.body;
	const {email}= req.body;
	const {additional_email}= req.body;
	const {au_id}= req.body;
	const {address}= req.body;
	const {invDigital}= req.body;

	const updateUserSupp =await accountUser.update({
		mobile_number: contact_person,
		username: username,
		email: email,
		additional_email: additional_email,
		address: address
		},{
		where: {id: au_id}}
		);
	
		const updateSupp =await supplier.update({
			digital_inv_flag: invDigital
			},{
			where: {code: username}}
			);
			
		res.status(200).json({
			code: 0,
			result: updateUserSupp,
			message: 'ok',
			type: 'success'
		});
}
async function editAktifSupplier(req, res, next){
	const {enabled}= req.body;
	const {au_id}= req.body;

	const updateUserSupp =await accountUser.update({
		enabled: enabled
		},{
		where: {id: au_id}}
		).then((updateUserSupp ) => {
			console.log(`${updateUserSupp} record(s) updated successfully.`);
		  })
		  .catch((error) => {
			console.error('Error updating records:', error);
		});
	
		res.status(200).json({
			code: 0,
			result: updateUserSupp,
			message: 'ok',
			type: 'success'
		});
}
async function editAktifDigInvSupplier(req, res, next){
	const {enabled}= req.body;
	const {au_id}= req.body;

	const filter2 = {};
			if (au_id) {
				filter2.id = { [Op.eq]: `${au_id}` };
		}
	
		const A = await accountUser.findOne({
			where: filter2,
			attributes: ['username'],
		});

	const updateUserSupp =await supplier.update({
		digital_inv_flag: enabled
		},{
		where: {code: A.username}}
		).then((updateUserSupp ) => {
			console.log(`${updateUserSupp} record(s) updated successfully.`);
		  })
		  .catch((error) => {
			console.error('Error updating records:', error);
		});
	
		res.status(200).json({
			code: 0,
			result: updateUserSupp,
			message: 'ok',
			type: 'success'
		});
}

async function getUserSupplier(req, res, next) {
	try {
		const { id } = req.query;
		
		const filter = {};
		if (id) {
			filter.id = { [Op.eq]: `${id}` };
		}

		const US = await userSupplierList.findAll({
				where: filter
			});
			res.status(200).json({
				code: 0,
				result: US,
				message: 'ok',
				type: 'success'
			});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error' });
	}
}

async function getP2pSupplier(req, res, next) {
	try {
		const { s_id } = req.body;
		const { p2p } = req.body;

		const US = await supplier.update({
				b2b: p2p
			},{where: {id: s_id}});
			
			res.status(200).json({
				code: 0,
				result: US,
				message: 'ok',
				type: 'success'
			});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error' });
	}
}

module.exports = {
	getSupplierAll,
	createSupplier,
	userSupplier,
	suppRegList,
	suppRegDetail1,
	suppRegDetail2,
	suppRegDetail3,
	editUserSupplier,
	getUserSupplier,
	daftarSuppMaster,
	getP2pSupplier,
	editAktifSupplier,
	editAktifDigInvSupplier
};
