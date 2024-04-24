const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');

class accountUser extends Model {}
accountUser.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		mversion: {
			type: DataTypes.STRING
		},
		email: {
			type: DataTypes.STRING,
			// unique: true,
			// isEmail: true, //checks for email format
      //       allowNull: false
		},
		enabled: {
			type: DataTypes.STRING
		},
		password: {
			type: DataTypes.STRING
		},
		username: {
			type: DataTypes.STRING
		},
		last_login: {
			type: DataTypes.DATE
		},
		mobile_number: {
			type: DataTypes.STRING
		},
		last_pwd_change: {
			type: DataTypes.DATE,
		},
		additional_email: {
			type: DataTypes.STRING
		},
		image: {
			type: DataTypes.STRING
		},
		content_type: {
			type: DataTypes.STRING
		},
		jid: {
			type: DataTypes.STRING
		},
		new_password: {
			type: DataTypes.STRING
		},
		new_password_string: {
			type: DataTypes.STRING
		},
		role_id: {
			type: DataTypes.INTEGER
		},
		address: {
			type: DataTypes.STRING
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'account_user',
		tableName: 'account_user',
		schema: 'vms'
	}
);

module.exports = accountUser;
