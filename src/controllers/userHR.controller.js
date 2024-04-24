const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const pool = require('../configs/db.sql.config');

const login = async (req, res) => {
	// const { username, password } = req.body;
	pool.connect(function(err, connection) {
		if (err) throw err;
		let userID = req.body.userID;
		let password = req.body.password;

		connection.query(
			`
            select ME_EMPLOYEE_ID employeeID, ME_NAME fullname, dept, cc_group_name location, 
            ME_EMAIL email, funct_manager('FUNCTIONAL',ME_EMPLOYEE_ID,'NIK') manager,
            me_location mu_profile_code, me_company 
            from mst_user, mst_employee
            left join vorganization on ME_ORGANIZATION=org_code
            where mu_user=ME_EMPLOYEE_ID and mu_user='${userID}' and mu_password=md5('${password}')  
            and (ME_END_DATE is null or ME_END_DATE='0000-00-00' or 
            date_format(sysdate(),'%Y-%m-%d')<=me_end_date 
            or exists (select mue_employee_id from mst_user_exception where mue_employee_id=me_employee_id))
            `,
			function(error, results) {
				const accessToken = jwt.sign({ id: user.id }, '^token*secret', {
					expiresIn: '1800s'
				});
				const refreshToken = jwt.sign({ id: user.id }, '^token*secret', {
					expiresIn: '1800s'
				});
				if (error) throw error;
				//console.log(results.rows);
				res.status(200).json({
					userID: userID,
					accessToken,
					refreshToken
				});
			}
		);
		connection.release();
	});
};

module.exports = {
	login
};
