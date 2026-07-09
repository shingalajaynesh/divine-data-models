import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ReportTemplate extends Model {
    static associate(models) {
      ReportTemplate.belongsTo(models.User, {
        foreignKey: 'createdBy',
        as: 'creator',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      });
    }
  }

  ReportTemplate.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM('MOTHER', 'PARTNER', 'CENTER', 'FRANCHISE', 'STAFF', 'PLATFORM'),
        allowNull: false,
      },
      filters: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      widgets: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      sharedWithRoles: {
        type: DataTypes.STRING(500),
        allowNull: true,
        defaultValue: null,
        field: 'shared_with_roles',
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
      modelName: 'ReportTemplate',
      tableName: 'report_templates',
      underscored: true,
      timestamps: true
    }
  );

  return ReportTemplate;
};
