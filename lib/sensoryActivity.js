import { DataTypes, Model } from 'sequelize';

export class SensoryActivity extends Model {}

export default function init(sequelize) {
  SensoryActivity.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
    dayNumber: { type: DataTypes.INTEGER, allowNull: false, unique: true, field: 'day_number', validate: { min: 1, max: 280 } },
    senseType: { type: DataTypes.STRING, allowNull: false, field: 'sense_type', validate: { isIn: [['SIGHT', 'HEARING', 'SMELL', 'TASTE', 'TOUCH']] } },
    titleEn: { type: DataTypes.TEXT, allowNull: false, field: 'title_en' },
    titleHi: { type: DataTypes.TEXT, allowNull: false, field: 'title_hi' },
    descriptionEn: { type: DataTypes.TEXT, allowNull: false, field: 'description_en' },
    descriptionHi: { type: DataTypes.TEXT, allowNull: false, field: 'description_hi' }
  }, {
    sequelize,
    modelName: 'SensoryActivity',
    tableName: 'sensory_activities',
    underscored: true,
    timestamps: true
  });

  return SensoryActivity;
}
