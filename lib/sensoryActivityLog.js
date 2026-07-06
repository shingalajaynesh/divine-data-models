import { DataTypes, Model } from 'sequelize';

export class SensoryActivityLog extends Model {}

export default function init(sequelize) {
  SensoryActivityLog.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false, field: 'user_id' },
    dayNumber: { type: DataTypes.INTEGER, allowNull: false, field: 'day_number', validate: { min: 1, max: 280 } },
    completed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    completedAt: { type: DataTypes.DATE, allowNull: true, field: 'completed_at' }
  }, {
    sequelize,
    modelName: 'SensoryActivityLog',
    tableName: 'sensory_activity_logs',
    underscored: true,
    timestamps: true
  });

  return SensoryActivityLog;
}
