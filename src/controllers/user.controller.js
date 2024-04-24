const User = require('../models/user.models');
const encryptType = require('sha256');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const accountRole = require('../models/accountRole.models');
const esd = require('../models/employee_s_d.models');
const accountUser = require('../models/accountUser.models');
const User2 = require('../models/user2.models');

async function comparePasswords(password, hashedPassword) {
	// first, hash the password using sha256
	const hashedInputPassword = encryptType(password);

	// then, compare the hashed password with the hashed input password using bcrypt
	return await bcrypt.compare(hashedInputPassword, hashedPassword);
}
const login = async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ 
			where: { username }
		});

		// console.log(password);

		if (!user) {
				const userr = await User2.findOne({ 
					where: { username }
				});
				const passwordHash = crypto.createHash('sha256').update(password).digest().toString('hex');

				if (passwordHash !== userr.new_password) {
					return res.status(401).send('Invalid username or password.');
				}
				
				const token = jwt.sign({ id: userr.id }, '^token*secret', {
					expiresIn: '1800s'
				});

				const refreshToken = jwt.sign({ id: userr.id }, '^token*secret', {
					expiresIn: '1800s'
				});

				res.status(200).json({
					code : 0,
					message: 'ok',
					result : {
						token,
						userr
					} ,
					type : 'succes'
				});
					
		}else{
		const passwordHash = crypto.createHash('sha256').update(password).digest().toString('hex');
	
		if (passwordHash !== user.new_password) {
			return res.status(401).send('Invalid username or password.');
		}
		
		const token = jwt.sign({ id: user.id }, '^token*secret', {
			expiresIn: '1800s'
		});
		// const refreshToken = jwt.sign({ id: user.id }, '^token*secret', {
		// 	expiresIn: '1800s'
		// });

		const ESD = await esd.findAll({ 
			where: { employee: user.e_id }
		});

			res.status(200).json({
				code : 0,
				message: 'ok',
				result : {
					token,
					user,
					ESD
				} ,
				type : 'succes'
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Error logging in.' });
	}
};

const hashService = async (req, res) => {
	try {
		const userService = await User.findAll({
			include: [{model: accountRole, as:'ar', attributes:['name']}],
			attributes: [ 'new_password_string' ],
			where: {
				enabled: 'Y',
				email: { [Op.not]: '' },
				last_login: { [Op.not]: null }
			}
			// limit: 3
		});
		// console.log(userService);

		// console.log(userService);
		const hashedPasswords = [];

		// const filterUser = userService.filter((item) => item.enabled === 'y');

		// console.log(filterUser);

		const mappedArray = userService.map((items) => {
			// console.log(items);
			// crypto.createHash('sha256').update(items.new_password_string).digest().toString('hex');

			return items.new_password_string;
		});
		// =====
		// function hashPassword(password) {
		// 	const salt = crypto.randomBytes(16).toString('hex');
		// 	const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');
		// 	return { salt, hash };
		// }
		// for (const password of mappedArray) {
		// 	const hashedPassword = hashPassword(password);
		// 	hashedPasswords.push(hashedPassword);
		// }
		// console.log(passwordHash);
		// let stringData = JSON.stringify(userService);
		// console.log(stringData);

		// console.log(hashedPassword);
		// console.log(mappedArray);

		function hashPassword(password) {
			// const salt = crypto.randomBytes(16).toString('hex');
			const hash = crypto.createHash('sha256').update(password).digest().toString('hex');

			// const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');
			return { hash };
		}

		for (const password of mappedArray) {
			const hashedPassword = hashPassword(password);
			hashedPasswords.push(hashedPassword);
			hashedPasswords.push(password);
			// console.log(password);
		}

		res.status(200).json({ hashedPasswords });
		// res.status(200).json({ userService });

		// console.log(userService);
	} catch (error) {
		res.status(500).json({ error: 'Error logging in.' });
	}
};

module.exports = {
	login,
	hashService
};