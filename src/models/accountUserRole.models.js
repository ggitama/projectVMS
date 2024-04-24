const { Model, DataTypes } = require('sequelize');
const accountRole = require('./accountRole.models.js');
const accountUser = require('./accountUser.models.js');
const sequelize = require('./db.js');

class accountUserRole extends Model {}
accountUserRole.init({
		user_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			foreignKey: true
		},
		role_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			foreignKey: true
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'account_user_role',
		tableName: 'account_user_role',
		schema: 'vms'
	}
);
accountUser.hasMany(accountUser, { foreignKey: 'id' });
accountUserRole.belongsTo(accountUser, { foreignKey: 'user_id' });

accountRole.hasMany(accountRole, { foreignKey: 'id' });
accountUserRole.belongsTo(accountRole, { foreignKey: 'role_id' });

module.exports = accountUserRole;
