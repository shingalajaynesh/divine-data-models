import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class CounselingLead extends Model {
    static associate(models) {
      CounselingLead.belongsTo(models.User, { foreignKey: 'assignedTo', as: 'counselor' });
      CounselingLead.belongsTo(models.User, { foreignKey: 'convertedUserId', as: 'convertedUser' });
      CounselingLead.hasMany(models.CounselingCall, { foreignKey: 'leadId', as: 'calls' });
    }
  }

  CounselingLead.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      phone: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'new' // new, contacted, scheduled, converted, lost
      },
      source: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: 'web'
      },
      assignedTo: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'assigned_to'
      },
      convertedUserId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'converted_user_id'
      },
      nextFollowUp: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'next_follow_up'
      },
      convertedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'converted_at'
      }
    },
    {
      sequelize,
      modelName: 'CounselingLead',
      tableName: 'counseling_leads',
      underscored: true,
      timestamps: true
    }
  );

  return CounselingLead;
};
