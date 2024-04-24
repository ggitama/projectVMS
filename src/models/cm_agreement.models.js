const { Model, DataTypes, ForeignKeyConstraintError } = require('sequelize');
const sequelize = require('./db.js');

class cm_agreement extends Model {}
cm_agreement.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		agreement_code: {
			type: DataTypes.STRING
		},
		agreement_end_date: {
			type: DataTypes.DATE
		},
		agreement_item_code: {
			type: DataTypes.STRING
		},
		agreement_start_date: {
			type: DataTypes.DATE
		},
		agreement_type: {
			type: DataTypes.STRING
		},
		business_unit_code: {
			type: DataTypes.STRING
		},
		contract_code: {
			type: DataTypes.STRING
		},
		created_date: {
			type: DataTypes.DATE
		},
		departement: {
			type: DataTypes.STRING
		},
		division: {
			type: DataTypes.STRING
		},
		fee_amount: {
			type: DataTypes.FLOAT
		},
		holding_supplier_code: {
			type: DataTypes.STRING
		},
		note: {
			type: DataTypes.TEXT
		},
		obot_type: {
			type: DataTypes.STRING
		},
		pic: {
			type: DataTypes.STRING
		},
		position: {
			type: DataTypes.STRING
		},
		status: {
			type: DataTypes.STRING
		},
		supplier_email1: {
			type: DataTypes.STRING
		},
		supplier_email2: {
			type: DataTypes.STRING
		},
		supplier_email3: {
			type: DataTypes.STRING
		},
		supplier_phone_numeric: {
			type: DataTypes.STRING
		},
		supplier_pic: {
			type: DataTypes.STRING
		},
		supplier_position: {
			type: DataTypes.STRING
		},
		supplier_tax_id: {
			type: DataTypes.STRING
		},
		supplier_tax_name: {
			type: DataTypes.STRING
		},
		updated_date: {
			type: DataTypes.DATE
		},
		category: {
			type: DataTypes.STRING
		},
		referential_agreement_code: {
			type: DataTypes.STRING
		},
		tg_tinggi: {
			type: DataTypes.INTEGER
		},
		floor_display_tinggi: {
			type: DataTypes.INTEGER
		},
		standing_display_tinggi: {
			type: DataTypes.INTEGER
		},
		clip_strip_tinggi: {
			type: DataTypes.INTEGER
		},
		chiller_cabinet_tinggi: {
			type: DataTypes.INTEGER
		},
		last_generated: {
			type: DataTypes.INTEGER
		},
		final_value: {
			type: DataTypes.INTEGER
		},
		fax_number: {
			type: DataTypes.STRING
		},
		phone_number: {
			type: DataTypes.STRING
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'cm_agreement',
		tableName: 'cm_agreement',
		schema: 'vms'
	}
);

module.exports = cm_agreement;
