const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');
const ReceivingAdvice = require('./receivingAdvice.models.js');
const PO = require('./po.models.js');
const ra = require('./receivingAdvice.models.js');

class TII1 extends Model {}

TII1.init(
	{
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
		tax_invoice_pdf_file_name: {
			type: DataTypes.STRING
		},
		xml_content: {
			type: DataTypes.BLOB
		},
		invoice: {
			type: DataTypes.INTEGER
		},
		mversion: {
			type: DataTypes.INTEGER
		},
		seq: {
			type: DataTypes.INTEGER
		},
		is_latest: {
			type: DataTypes.CHAR
		},
		file_dir: {
			type: DataTypes.STRING
		},
		type: {
			type: DataTypes.INTEGER
		},
		document_status: {
			type: DataTypes.STRING
		},
		checked_by: {
			type: DataTypes.STRING
		},
		checked_date: {
			type: DataTypes.DATE
		},
		reason: {
			type: DataTypes.STRING
		},
		revision_date: {
			type: DataTypes.INTEGER
		}
	},
	{
		sequelize,
	tableName: 'VMS_TII_1',
	schema: 'vms',
	timestamps: false
	}
);

module.exports = TII1;
