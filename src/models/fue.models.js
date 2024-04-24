const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db.js');

class fue extends Model {}

fue.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		file_name: {
			type: DataTypes.STRING
		},
		taxnumber: {
			type: DataTypes.STRING
		},
		upload_date: {
			type: DataTypes.DATE
		},
		download_date: {
			type: DataTypes.DATE
		},
		status: {
			type: DataTypes.STRING
		},
		supp_code: {
			type: DataTypes.STRING
		}
	},
	{
		timestamps: false,
		sequelize,
		modelName: 'file_upload_efaktur',
		tableName: 'file_upload_efaktur',
		schema: 'vms'
	}
);

module.exports = fue;
