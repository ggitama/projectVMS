
const { DataTypes, Model } = require('sequelize');
const sequelize = require('./db.js');
const PO = require('./po.models.js');
const poi = require('./poItem.models.js');
const pfi = require('./proformaInvoice.models.js');

class ra extends Model {}
ra.init({
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
		mversion: {
			type: DataTypes.INTEGER
		},
		date_updated: {
			type: DataTypes.DATE
		},
		dept_code: {
			type: DataTypes.STRING
		},
		normal: {
			type: DataTypes.STRING
		},
		receiver_code: {
			type: DataTypes.STRING
		},
		receiving_advice_date: {
			type: DataTypes.DATE
		},
		receiving_advice_number: {
			type: DataTypes.STRING
		},
		remarks: {
			type: DataTypes.STRING
		},
		revision_number: {
			type: DataTypes.INTEGER
		},
		source_file: {
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
		supplier_grp_id: {
			type: DataTypes.INTEGER
		},
		dispatch_advice: {
			type: DataTypes.INTEGER,
			foreignKey: true
		},
		purchase_order: {
			type: DataTypes.STRING,
			foreignKey: true
		},
		first_approver: {
			type: DataTypes.STRING
		},
		second_approver: {
			type: DataTypes.STRING
		},
		url: {
			type: DataTypes.STRING
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'receiving_advice',
		tableName: 'receiving_advice',
		schema: 'vms'
	},
);
PO.hasMany(ra, { as: 'pora', foreignKey: 'purchase_order' });
ra.belongsTo(PO, { as: 'rapo', foreignKey: 'purchase_order' });

poi.hasMany(poi, {as:'poiraa', foreignKey: 'purchase_order' });
ra.belongsTo(poi, { as:'rapoii', foreignKey: 'purchase_order' });

ra.belongsTo(ra,{ as: 'rapfi', foreignKey: 'receiving_advice' });
pfi.hasMany(ra,{ as: 'pfira', foreignKey: 'receiving_advice' });

module.exports = ra;
