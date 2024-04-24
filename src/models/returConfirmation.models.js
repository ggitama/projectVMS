const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');
const department = require('./department.models.js');
const rci = require('./returConfirmationItem.models.js');
const store = require('./store.models.js');
const supplier = require('./supplier.models');

class rc extends Model {}
rc.init({
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
		c4business_unit: {
			type: DataTypes.STRING
		},
		dc_vendor_code: {
			type: DataTypes.DATE
		},
		dept_code: {
			type: DataTypes.STRING
		},
		ext_ref_no: {
			type: DataTypes.STRING
		},
		request_total_amount: {
			type: DataTypes.STRING
		},
		return_request_number: {
			type: DataTypes.STRING
		},
		rtn_confirmation_number: {
			type: DataTypes.STRING,
			foreignKey: true
		},
		return_confirmation_date: {
			type: DataTypes.DATE
		},
		movement_type_code: {
			type: DataTypes.STRING
		},
		reference_returning_number: {
			type: DataTypes.STRING
		},
		store_code: {
			type: DataTypes.INTEGER,
			foreignKey: true
		},
		supplier_code: {
			type: DataTypes.STRING
		},
		supplier_id: {
			type: DataTypes.STRING,
			foreignKey: true
		},
		status: {
			type: DataTypes.STRING
		},
		rtn_confirmation_date: {
			type: DataTypes.DATE
		},
		organization_unit: {
			type: DataTypes.STRING
		},
		isviewed: {
			type: DataTypes.STRING
		},
		picked_up_date: {
			type: DataTypes.DATE
		},
		is_auto_closed: {
			type: DataTypes.STRING
		},
		pick_up_location: {
			type: DataTypes.STRING
		},
		url: {
			type: DataTypes.STRING
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'returns_confirmation',
		tableName: 'returns_confirmation',
		schema: 'vms'
	}
);

supplier.hasMany(supplier, { foreignKey: 'id' });
rc.belongsTo(supplier, { foreignKey: 'supplier_id' });

store.hasMany(store, { foreignKey: 'store_id' });
rc.belongsTo(store, { foreignKey: 'store_code' });

department.hasMany(department, { foreignKey: 'code_id' });
rc.belongsTo(department, { foreignKey: 'dept_code' });

module.exports = rc;
