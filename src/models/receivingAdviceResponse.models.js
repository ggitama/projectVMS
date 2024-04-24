
const { DataTypes, Model } = require('sequelize');
const sequelize = require('./db.js');
const PO = require('./po.models.js');
const poi = require('./poItem.models.js');
// const rri = require('./rri.models.js');
const store = require('./store.models.js');
const supplier = require('./supplier.models.js');

class rar extends Model {}
rar.init({
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
		litigation_file_processed: {
			type: DataTypes.CHAR
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
			type: DataTypes.INTEGER
		},
		purchase_order: {
			type: DataTypes.STRING,
			foreignKey: true
		},
		date_sent: {
			type: DataTypes.DATE
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
		modelName: 'receiving_advice_response',
		tableName: 'receiving_advice_response',
		schema: 'vms'
	},
	
);

PO.hasMany(PO, { foreignKey: 'id' });
rar.belongsTo(PO, { as:'po', foreignKey: 'purchase_order' });

store.hasMany(store, { foreignKey: 'store_id' });
rar.belongsTo(store, { foreignKey: 'store_code' });

supplier.hasMany(supplier, { foreignKey: 'code' });
rar.belongsTo(supplier, { foreignKey: 'supplier_code' });

poi.hasMany(poi, {as:'poi', foreignKey: 'purchase_order' });
rar.belongsTo(poi, { as:'rarr', foreignKey: 'purchase_order' });

// rar.hasMany(rri, { as:'rarrri', foreignKey: 'receiving_advice_response' });
// rri.belongsTo(rri, { as:'rri', foreignKey: 'receiving_advice_response' });

module.exports = rar;
