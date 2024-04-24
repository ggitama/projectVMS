const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');
const ar = require('./accountRole.models.js');

class User extends Model {}
User.init(
	{
		user_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		mversion: {
			type: DataTypes.STRING
		},
		email: {
			type: DataTypes.STRING
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
			type: DataTypes.DATE
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
		nama_role: {
			type: DataTypes.STRING
		},
		e_id: {
			type: DataTypes.INTEGER
		}
	},
	{
		sequelize,
	tableName: 'VMS_LOGIN',
	schema: 'vms',
	timestamps: false
	}
);
module.exports = User;
