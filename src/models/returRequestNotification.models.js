const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');
const supplier = require('./supplier.models.js');

class rrn extends Model {}
rrn.init({
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		created_by: {
			type: DataTypes.STRING
		},
		created_on: {
			type: DataTypes.DATE
		},
		last_updated_by: {
			type: DataTypes.STRING
		},
		last_updated_on: {
			type: DataTypes.DATE
		},
		dept_code: {
			type: DataTypes.STRING
		},
		read_by: {
			type: DataTypes.STRING
		},
		read_date: {
			type: DataTypes.DATE
		},
		type: {
			type: DataTypes.STRING
		},
		rtn_request_date: {
			type: DataTypes.DATE
		},
		return_request_number: {
			type: DataTypes.STRING
		},
		status: {
			type: DataTypes.STRING
		},
		store_code: {
			type: DataTypes.STRING
		},
		supplier_code: {
			type: DataTypes.STRING
		},
		supplier_id: {
			type: DataTypes.INTEGER,
			foreignKey: true
		},
		rq_id: {
			type: DataTypes.INTEGER
		},
		c4business_unit: {
			type: DataTypes.INTEGER
		},
		request_created_date: {
			type: DataTypes.DATE
		},
		action_by: {
			type: DataTypes.STRING
		},
		action_date: {
			type: DataTypes.DATE
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'return_request_notification',
		tableName: 'return_request_notification',
		schema: 'vms'
	}
);


supplier.hasMany(supplier, { foreignKey: 'id' });
rrn.belongsTo(supplier, { foreignKey: 'supplier_id' });

module.exports = rrn;
