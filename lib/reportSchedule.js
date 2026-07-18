import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ReportSchedule extends Model {
    static associate(models) {
      ReportSchedule.belongsTo(models.ReportTemplate, {
        foreignKey: 'templateId',
        as: 'template',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      ReportSchedule.belongsTo(models.User, {
        foreignKey: 'createdBy',
        as: 'creator',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      });
    }
  }

  ReportSchedule.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      templateId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'template_id',
        references: {
          model: 'report_templates',
          key: 'id'
        }
      },
      frequency: {
        type: DataTypes.ENUM('daily', 'weekly', 'monthly'),
        allowNull: false,
      },
      recipientEmails: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        field: 'recipient_emails',
      },
      nextRunAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'next_run_at',
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'is_active',
      },
      createdBy: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'created_by',
        references: {
          model: 'users',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'ReportSchedule',
      tableName: 'report_schedules',
      underscored: true,
      timestamps: true,
      indexes: [
        { fields: ['template_id'] },
        { fields: ['is_active', 'next_run_at'] }
      ]
    }
  );

  return ReportSchedule;
};
