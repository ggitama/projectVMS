
const { DataTypes, Model } = require('sequelize');
const sequelize = require('./db.js');
const PO = require('./po.models.js');
const poi = require('./poItem.models.js');
const ra = require('./receivingAdvice.models.js');

class pfir extends Model {}
pfir.init({
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
		pro_forma_invoice_date: {
			type: DataTypes.DATE
		},
		receiver_code: {
			type: DataTypes.STRING
		},
		revision: {
			type: DataTypes.INTEGER
		},
		status: {
			type: DataTypes.STRING
		},
		total_amount: {
			type: DataTypes.FLOAT
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
		receiving_advice: {
			type: DataTypes.INTEGER,
			foreignKey : true
		},
		sent_date: {
			type: DataTypes.DATE
		},
		approved_by: {
			type: DataTypes.STRING
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
		modelName: 'pro_forma_invoice_response',
		tableName: 'pro_forma_invoice_response',
		schema: 'vms'
	},
	
);

ra.hasMany(ra, { foreignKey: 'id' });
pfir.belongsTo(ra, { as:'ra', foreignKey: 'receiving_advice' });

PO.hasMany(PO, { foreignKey: 'id' });
ra.belongsTo(PO, { as:'po', foreignKey: 'purchase_order' });

poi.hasMany(poi, {as:'poii', foreignKey: 'purchase_order' });
ra.belongsTo(poi, { as:'poira', foreignKey: 'purchase_order' });

module.exports = pfir;
