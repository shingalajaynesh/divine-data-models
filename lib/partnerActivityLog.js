import { DataTypes, Model } from 'sequelize';

export class PartnerActivityLog extends Model {}

export default function init(sequelize) {
  PartnerActivityLog.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false, field: 'user_id' },
    partnerActivityId: { type: DataTypes.UUID, allowNull: false, field: 'partner_activity_id', references: { model: 'partner_activities', key: 'id' } },
    dayNumber: { type: DataTypes.INTEGER, allowNull: false, field: 'day_number', validate: { min: 1, max: 280 } },
    partnerAcknowledged: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, field: 'partner_acknowledged' },
    assignedTaskTitle: { type: DataTypes.STRING, allowNull: true, field: 'assigned_task_title' },
    assignedTaskDesc: { type: DataTypes.TEXT, allowNull: true, field: 'assigned_task_desc' },
    partnerResponse: { type: DataTypes.TEXT, allowNull: true, field: 'partner_response' },
    familyNotes: { type: DataTypes.TEXT, allowNull: true, field: 'family_notes' },
    completedAt: { type: DataTypes.DATE, allowNull: true, field: 'completed_at' }
  }, {
    sequelize,
    modelName: 'PartnerActivityLog',
    tableName: 'partner_activity_logs',
    underscored: true,
    timestamps: true,
    indexes: [
      { unique: true, fields: ['user_id', 'day_number'] },
      { fields: ['partner_activity_id'] }
    ]
  });

  return PartnerActivityLog;
}
