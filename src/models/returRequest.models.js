const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');
const department = require('./department.models.js');
//const rar = require('./receivingAdviceResponse.models.js');
const rri = require('./returRequestItem.models.js');
const store = require('./store.models.js');
const supplier = require('./supplier.models');

class rr extends Model {}
rr.init({
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		created_by: {
			type: DataTypes.STRING
		},
		created_on: {
			type: DataTypes.STRING
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
			type: DataTypes.STRING,
			foreignKey: true
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
		store_code: {
			type: DataTypes.STRING,
			foreignKey: true
		},
		supplier_code: {
			type: DataTypes.STRING
		},
		supplier_id: {
			type: DataTypes.STRING,
			foreignKey: true
		},
		rtn_request_date: {
			type: DataTypes.STRING
		},
		status: {
			type: DataTypes.STRING
		},
		rtnconfirm: {
			type: DataTypes.STRING
		},
		rqr: {
			type: DataTypes.STRING
		},
		remarks: {
			type: DataTypes.STRING
		},
		organization_unit: {
			type: DataTypes.STRING
		},
		isviewed: {
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
		modelName: 'returns_request',
		tableName: 'returns_request',
		schema: 'vms'
	}
);


supplier.hasMany(supplier, { foreignKey: 'id' });
rr.belongsTo(supplier, { foreignKey: 'supplier_id' });

store.hasMany(store, { foreignKey: 'store_id' });
rr.belongsTo(store, { foreignKey: 'store_code' });

department.hasMany(department, { foreignKey: 'code_id' });
rr.belongsTo(department, { foreignKey: 'dept_code' });

rri.belongsTo(rri, { foreignKey: 'ret' });
rr.hasMany(rri, { foreignKey: 'id' });

module.exports = rr, supplier, store, department, rri;
