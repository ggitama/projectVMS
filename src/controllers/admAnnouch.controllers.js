const { query } = require('express');
const { Op } = require('sequelize');
const annoucment = require('../models/annoucment.models');

 
//list data  
async function getDashoard(req, res, next) {
	try {
			const A = await annoucment.findAll({
				where: {type: 'DASHBOARD'}
			});
			res.status(200).json({
				code: 0,
				result: {
					items: A
				},
				message: 'ok',
				type: 'success'
			});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}

//list data  
async function getLogin(req, res, next) {
	try {
			const A = await annoucment.findAll({
				where: {type: 'LOGIN'}
			});
			res.status(200).json({
				code: 0,
				result: {
					items: A
				},
				message: 'ok',
				type: 'success'
			});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}

async function updateDashoard(req, res, next) {
	try {
		const {subject} = req.body;
		const {message} = req.body;
		const {important} = req.body;
		const {post} = req.body;
			const Alist = await annoucment.findOne({
				where:{id: 3306140}
			});
				const n=Alist.mversion;
				const TEST= (n*1)+1;
				console.log(Alist);
			const A = await annoucment.update({
				subject : subject,
				message: message,
				priority: important,
				mversion: TEST,
				post: post
				},{where: {type: 'DASHBOARD'}
			});

			res.status(200).json({
				code: 0,
				result: {
					items: A
				},
				message: 'ok',
				type: 'success'
			});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}

async function updateLogin(req, res, next) {
	try {
		const {subject} = req.body;
		const {message} = req.body;
		const {important} = req.body;
		const {post} = req.body;
			const Alist = await annoucment.findOne({
				where:{type: 'LOGIN'}
			});

			if(Alist){
				n=Alist.mversion;
				const TEST= (n*1)+1;
				console.log(TEST);

			const A = await annoucment.update({
				subject : subject,
				message: message,
				priority: important,
				mversion: TEST,
				post: post
				},{where: {type: 'LOGIN'}
			});

				res.status(200).json({
					code: 0,
					result: {
						items: Alist
					},
					message: 'ok',
					type: 'success'
				});
			}else{
				  console.log('ID not found: ', Alist)
			}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Invalid' });
	}
}

module.exports = {
	getDashoard,
	getLogin,
	updateDashoard,
	updateLogin
};