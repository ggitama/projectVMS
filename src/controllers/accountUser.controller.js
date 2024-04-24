const accountUser = require('../models/accountUser.models');
const accountRole = require('../models/accountRole.models');
const accountUserRole = require('../models/accountUserRole.models');

async function getUserAll(req, res, next) {
	accountUserRole.findAll({
		include: [{model: accountUser, attributes:['username', 'image']},
		{model: accountRole, attributes:['description']}],
		attributes:['user_id']
	})
		.then((data) => {
			res.json({
				code: 0,
				message: "ok",
				type: "succes",
				result: data,
		 	});
		})
		.catch((error) => {
			res.status(400).json({
				error
			});
		});
}

module.exports = {
	getUserAll
};
