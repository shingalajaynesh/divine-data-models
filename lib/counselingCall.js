import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class CounselingCall extends Model {
    static associate(models) {
      CounselingCall.belongsTo(models.CounselingLead, { foreignKey: 'leadId', as: 'lead' });
      CounselingCall.belongsTo(models.User, { foreignKey: 'counselorId', as: 'counselor' });
    }
  }

  CounselingCall.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      leadId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'lead_id'
      },
      scheduledAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'scheduled_at'
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'scheduled' // scheduled, completed, no_show, cancelled
      },
      durationMinutes: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'duration_minutes'
      },
      outcome: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      counselorId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'counselor_id'
      }
    },
    {
      sequelize,
      modelName: 'CounselingCall',
      tableName: 'counseling_calls',
      underscored: true,
      timestamps: true
    }
  );

  return CounselingCall;
};
