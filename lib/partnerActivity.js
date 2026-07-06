import { DataTypes, Model } from 'sequelize';

export class PartnerActivity extends Model {}

export default function init(sequelize) {
  PartnerActivity.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
    dayNumber: { type: DataTypes.INTEGER, allowNull: false, unique: true, field: 'day_number', validate: { min: 1, max: 280 } },
    titleEn: { type: DataTypes.TEXT, allowNull: false, field: 'title_en' },
    titleHi: { type: DataTypes.TEXT, allowNull: false, field: 'title_hi' },
    descriptionEn: { type: DataTypes.TEXT, allowNull: false, field: 'description_en' },
    descriptionHi: { type: DataTypes.TEXT, allowNull: false, field: 'description_hi' }
  }, {
    sequelize,
    modelName: 'PartnerActivity',
    tableName: 'partner_activities',
    underscored: true,
    timestamps: true
  });

  return PartnerActivity;
}
